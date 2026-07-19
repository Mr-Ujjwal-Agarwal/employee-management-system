#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Health Check"
echo "======================================"

echo "Checking backend..."

docker exec employee-backend \
    curl --fail http://localhost:8000/health/

echo
echo "Checking frontend..."

docker exec employee-frontend \
    curl --fail http://localhost/

echo
echo "✅ All health checks passed."
