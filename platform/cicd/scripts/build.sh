#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Building Docker Images"
echo "======================================"

AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID="${ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"

BACKEND_REPO="employee-backend"
FRONTEND_REPO="employee-frontend"

IMAGE_TAG="${BUILD_NUMBER:-latest}"

BACKEND_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO"
FRONTEND_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO"

echo "Building Backend..."
docker build \
    -t "$BACKEND_URI:$IMAGE_TAG" \
    ./app/backend

echo "Building Frontend..."
docker build \
    -t "$FRONTEND_URI:$IMAGE_TAG" \
    ./app/frontend

echo
echo "======================================"
echo " Images Built Successfully"
echo "======================================"

docker images | grep employee
