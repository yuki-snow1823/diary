#!/bin/bash
set -e

rm -f /sample/tmp/pids/server.pid

exec "$@"