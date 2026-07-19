#!/bin/bash

set -euo pipefail

echo "Cleaning unused Docker resources..."

docker image prune -f

docker container prune -f

docker builder prune -f

echo "Cleanup complete."
