#!/bin/bash

# If data.json doesn't exist, copy db.json to data.json
if [ ! -f data.json ]; then
  cp db.json data.json
  echo "📁 Copied db.json to data.json"
else
  echo "✅ data.json already exists"
fi

# Start json-server with the data.json
json-server --watch data.json --host 0.0.0.0 --port 10000
