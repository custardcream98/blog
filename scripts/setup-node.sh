#!/usr/bin/env bash

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use
else
  echo "⚠️  nvm not found at $NVM_DIR. Skipping 'nvm use'." >&2
fi