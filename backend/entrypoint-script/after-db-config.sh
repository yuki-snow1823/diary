#!/bin/bash

rm -f tmp/pids/server.pid

while true; do
  if rails db:version >/dev/null 2>&1; then
    break
  else
    echo "Creating database..."
    rails db:create
    echo "Start Migration..."
    rails db:migrate
  fi

  if rails db:version >/dev/null 2>&1; then
    break
  else
    echo "Failed to db initializetion, waiting for 15 seconds..."
    sleep 15
  fi
done

if [ "$GITHUB_ACTIONS" == false ] ; then
  echo "rails server start on local"
  rails s -p 3000 -b '0.0.0.0'
fi