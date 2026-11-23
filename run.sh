#!/usr/bin/env bash
# Opens the site locally. Uses Python's built-in static file server (no extra code, no packages).
cd "$(dirname "$0")"
PORT="${1:-8000}"
echo "Website:  http://localhost:$PORT"
echo "Reviews admin:  http://localhost:$PORT/admin.html   (Ctrl+C to stop)"
python3 -m http.server "$PORT"
