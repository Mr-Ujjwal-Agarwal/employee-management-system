#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Deploying Application"
echo "======================================"

AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID="${ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
IMAGE_TAG="${BUILD_NUMBER:-latest}"

export AWS_REGION
export ACCOUNT_ID
export IMAGE_TAG

echo "AWS Account : $ACCOUNT_ID"
echo "AWS Region  : $AWS_REGION"
echo "Image Tag   : $IMAGE_TAG"

echo
echo "Pulling latest images..."
docker compose pull

echo
echo "Starting containers..."
docker compose up -d --remove-orphans

echo
echo "Deployment completed successfully."
