#!/bin/bash
set -e

chmod +x ./entrypoint-script/*
./entrypoint-script/wait-for-it.sh db:3306
