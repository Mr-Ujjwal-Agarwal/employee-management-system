#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Deploying Application"
echo "======================================"

echo "Pulling latest images..."
docker compose pull

echo
echo "Starting containers..."
docker compose up -d --remove-orphans

echo
echo "Deployment completed successfully."
