#!/bin/bash

set -euo pipefail

echo "========================================="
echo "Checking Application Health..."
echo "========================================="

MAX_RETRIES=12
RETRY_DELAY=5

for i in $(seq 1 $MAX_RETRIES)
do
    echo "Attempt $i/$MAX_RETRIES"

    if curl -fs http://localhost:8000/health/ > /dev/null; then
        echo
        echo "✅ Backend Health Check Passed"
        exit 0
    fi

    echo "Application not ready. Waiting ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
done

echo
echo "❌ Backend Health Check Failed"

docker compose ps
docker compose logs backend --tail=50

exit 1
