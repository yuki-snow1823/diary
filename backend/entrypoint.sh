#!/bin/bash
set -e

./entrypoint-script/wait-for-it.sh db:3306

exec "$@"