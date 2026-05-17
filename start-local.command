#!/bin/zsh

cd "$(dirname "$0")" || exit 1

echo "Starting Apomeds checkout prototype locally..."
echo "Opening http://localhost:5173/#/"
echo
echo "Keep this terminal open while testing."
echo "Press Ctrl+C here to stop the local server."
echo

npm run dev:open
