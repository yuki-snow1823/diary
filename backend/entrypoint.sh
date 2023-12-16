#!/bin/bash
set -e

if [ "$ENV" != "production" ]; then
  ./entrypoint-script/wait-for-it.sh db:3306
fi
