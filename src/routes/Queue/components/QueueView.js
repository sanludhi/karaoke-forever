import React, { PropTypes } from 'react'
import AppLayout from 'layouts/AppLayout'
import PaddedList from 'components/PaddedList'
import QueueItem from './QueueItem'

class QueueView extends React.Component {
  static propTypes = {
    queue: PropTypes.object.isRequired,
    artists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
    errors: PropTypes.object,
    curId: PropTypes.number,
    curPos: PropTypes.number,
    isAtQueueEnd: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    // actions
    requestPlay: PropTypes.func.isRequired,
    requestPlayNext: PropTypes.func.isRequired,
    requestPause: PropTypes.func.isRequired,
  }

  rowRenderer = this.rowRenderer.bind(this)
  rowHeight = this.rowHeight.bind(this)
  setRef = this.setRef.bind(this)

  componentDidUpdate(prevProps) {
    // nuclear option
    this.ref.recomputeRowHeights()
    this.ref.forceUpdate()
  }

  render() {
    return (
      <AppLayout title="Queue">
        {(style) => (
          <PaddedList
            {...style}
            queuedSongIds={this.props.queue.result} // pass-through forces List refresh
            rowCount={this.props.queue.result.length}
            rowHeight={this.rowHeight}
            rowRenderer={this.rowRenderer}
            onRef={this.setRef}
          />
        )}
      </AppLayout>
    )
  }

  rowRenderer({index, key, style}) {
    const item = this.props.queue.entities[this.props.queue.result[index]]
    const song = this.props.songs.entities[item.songId]
    const queueId = item.queueId

    const isActive = (queueId === this.props.curId) && !this.props.isAtQueueEnd
    const isUpcoming = queueId > this.props.curId
    const isOwner = item.userId === this.props.user.userId
    const isAdmin = this.props.user.isAdmin === 1

    return (
      <QueueItem
        artist={this.props.artists.entities[song.artistId].name}
        title={song.title}
        name={item.name}
        wait={item.wait}
        isActive={isActive}
        isUpcoming={isUpcoming}
        canSkip={isActive && isOwner}
        canRemove={isUpcoming && isOwner}
        hasErrors={typeof this.props.errors[queueId] !== 'undefined'}
        pctPlayed={isActive ? this.props.curPos / song.duration * 100 : 0}
        onRemoveClick={this.handleRemoveClick.bind(this, queueId)}
        onSkipClick={this.props.requestPlayNext}
        onErrorInfoClick={this.handleErrorInfoClick.bind(this, queueId)}
        key={key}
        style={style}
      />
    )
  }

  rowHeight({index}) {
    return 64
  }

  handleRemoveClick(queueId) {
    this.props.removeItem(queueId)
  }

  handleErrorInfoClick(queueId) {
    alert(this.props.errors[queueId].join("\n\n"))
  }

  setRef(ref) {
    this.ref = ref
  }
}

export default QueueView
