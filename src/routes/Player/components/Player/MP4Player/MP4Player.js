import PropTypes from 'prop-types'
import React from 'react'
import './MP4Player.css'

class MP4Player extends React.Component {
  static propTypes = {
    isErrored: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    queueItem: PropTypes.object.isRequired,
    volume: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    // actions
    onMediaElement: PropTypes.func.isRequired,
    onMediaRequest: PropTypes.func.isRequired,
    onMediaRequestSuccess: PropTypes.func.isRequired,
    onMediaRequestError: PropTypes.func.isRequired,
    onMediaEnd: PropTypes.func.isRequired,
    onStatus: PropTypes.func.isRequired,
  }

  video = React.createRef()

  componentDidMount () {
    this.props.onMediaElement(this.video.current, { isAlphaSupported: false })
    this.setVolume(this.props.volume)
    this.updateSources()
  }

  componentDidUpdate (prevProps) {
    const { queueItem, isErrored, isPlaying, volume } = this.props

    // item changed or re-trying errored?
    if (prevProps.queueItem.queueId !== queueItem.queueId ||
       (isErrored && !prevProps.isPlaying && isPlaying)) {
      this.updateSources()
    }

    if (prevProps.isPlaying !== isPlaying) {
      this.updateIsPlaying()
    }

    this.setVolume(volume)
  }

  render () {
    const { width, height } = this.props

    return (
      <div styleName='container'>
        <video styleName='video'
          preload='none'
          width={width}
          height={height}
          onCanPlayThrough={this.updateIsPlaying}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.props.onMediaEnd}
          onError={this.handleError}
          ref={this.video}
        />
      </div>
    )
  }

  updateSources = () => {
    const { mediaId } = this.props.queueItem

    // media request(s) started
    this.props.onMediaRequest()

    // start loading video
    this.video.current.src = `/api/media/?type=video&mediaId=${mediaId}`
    this.video.current.load()
  }

  setVolume = (vol) => {
    this.video.current.volume = vol
  }

  updateIsPlaying = () => {
    if (this.props.isPlaying) {
      const promise = this.video.current.play()

      if (typeof promise !== 'undefined') {
        promise.then(() => {
          this.props.onMediaRequestSuccess()
        }).catch(err => {
          this.props.onMediaRequestError(err.message)
        })
      }
    } else {
      this.video.current.pause()
    }
  }

  handleTimeUpdate = () => {
    // emit player status
    this.props.onStatus({
      position: this.video.current.currentTime,
      volume: this.video.current.volume,
    })
  }

  handleError = (err) => {
    const msg = `Could not load video (error ${err.target.error.code})`

    // media request failed
    this.props.onMediaRequestError(msg)
  }
}

export default MP4Player
