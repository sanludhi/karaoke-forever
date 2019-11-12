# Karaoke Forever

Host awesome karaoke parties where everyone can easily find and queue songs from their phone's web browser. The player is also browser-based with support for [MP3+G](https://en.wikipedia.org/wiki/MP3%2BG) and MP4 video files. The server runs on your local network (see [Karaoke Forever Server](https://www.karaoke-forever.com/docs/#karaoke-forever-server)) with no internet connection required.

Karaoke Forever basically has 3 parts:

- **[Server:](https://www.karaoke-forever.com/docs/#karaoke-forever-server)** Runs on Mac/Windows/Linux/etc. to serve the app and media files on your local network.

- **[Mobile browser app:](https://www.karaoke-forever.com/docs/#karaoke-forever)** Everyone can quickly join and queue songs without having to install anything.

- **[Player:](https://www.karaoke-forever.com/docs/#player-admin-only)** Just another part of the browser app, but designed to run in fullscreen mode on the system handling audio and video for a [room](https://www.karaoke-forever.com/docs/#rooms-admin-only).

[![Karaoke Forever Demo Video](https://www.karaoke-forever.com/static/karaoke-forever-demo1-540p.jpg)](https://www.karaoke-forever.com/static/karaoke-forever-demo1-540p.mp4)

<p align="center">
  <i>App running in Mobile Safari (left) and Firefox/Chrome/Edge (right)</i><br>
  Watch demo video in
  <a href="https://www.karaoke-forever.com/static/karaoke-forever-demo1-540p.mp4">540p</a> |
  <a href="https://www.karaoke-forever.com/static/karaoke-forever-demo1-720p.mp4">720p</a> |
  <a href="https://www.karaoke-forever.com/static/karaoke-forever-demo1-1080p.mp4">1080p</a>
</p>

## Features

- Modern browser-based app and player with dark UI designed for "karaoke conditions"
- [MP3+G](https://en.wikipedia.org/wiki/MP3%2BG) and MP4 video file support
- Milkdrop visualizations via [Butterchurn](https://github.com/jberg/butterchurn) (requires [WebGL 2](https://caniuse.com/#feat=webgl2))
- Prioritizes singers based on the amount of time since each last sang
- Multiple simultaneous rooms/queues/players
- No telemetry; all data stored locally

Karaoke Forever assumes its player will be mixed with any microphones (either in software or an outboard mixer). See the [F.A.Q.](https://www.karaoke-forever.com/faq/#whats-the-recommended-microphone-audio-setup) for more information.

## Download

The <a href="{{ site.github.releases_url }}">Releases page</a><svg class="icon external" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg> has the latest packaged versions of [Karaoke Forever Server](https://www.karaoke-forever.com/docs/#karaoke-forever-server) for macOS and Windows.

## Documentation

Please see [Quick Start](https://www.karaoke-forever.com/docs#quick-start) to get started, or jump to the documentation for [Karaoke Forever](https://www.karaoke-forever.com/docs/#karaoke-forever) (the "web" app) or [Karaoke Forever Server](https://www.karaoke-forever.com/docs/#karaoke-forever-server).

## Discord / Support

Join the [Karaoke Forever Discord Server](https://discord.gg/PgqVtFq) for general support and development chat, or just to say hi!

## Contributing & Development

Contributions are most welcome! To get started developing
make sure you have [Node.js 12](https://nodejs.org/en/) or later, then:

1. Clone the project
2. `npm install`
3. `npm run dev` and look for "Web server running at" for the **server URL**
