#!/usr/bin/env bash
# Creates a self-hosted H.264 MP4 from a CC0-licensed Wikimedia Commons cattle video.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/videos
command -v curl >/dev/null || { echo "Install curl first"; exit 1; }
command -v ffmpeg >/dev/null || { echo "Install ffmpeg first: sudo apt install ffmpeg"; exit 1; }
tmp=$(mktemp --suffix=.webm)
trap 'rm -f "$tmp"' EXIT
url='https://upload.wikimedia.org/wikipedia/commons/f/fa/Video_Cattle_Sep26.webm'
echo "Downloading the CC0 cow footage from Wikimedia Commons..."
curl --fail --location --retry 3 --connect-timeout 20 --output "$tmp" "$url"
[ "$(wc -c < "$tmp")" -gt 100000 ] || { echo "Download incomplete"; exit 1; }
echo "Encoding a web-friendly 12-second muted MP4..."
ffmpeg -hide_banner -loglevel error -y -i "$tmp" -t 12 -vf 'scale=1280:-2,fps=24' -an -c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 30 -movflags +faststart public/videos/dairy-farm.mp4
ls -lh public/videos/dairy-farm.mp4
echo 'Done. Now git add public/videos/dairy-farm.mp4 and push to GitHub.'
