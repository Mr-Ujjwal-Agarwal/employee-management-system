#!/bin/bash

set -euo pipefail

echo "Checking backend..."

curl --fail http://localhost:8000/health/

echo
echo "Checking frontend..."

curl --fail http://localhost/

echo
echo "Health checks passed."
