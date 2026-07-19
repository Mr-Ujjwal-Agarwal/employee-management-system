#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Pushing Images to Amazon ECR"
echo "======================================"

AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID="${ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"

BACKEND_REPO="employee-backend"
FRONTEND_REPO="employee-frontend"

IMAGE_TAG="${BUILD_NUMBER:-latest}"

BACKEND_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO"
FRONTEND_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO"

echo
echo "Pushing Backend..."
docker push "$BACKEND_URI:$IMAGE_TAG"

echo
echo "Pushing Frontend..."
docker push "$FRONTEND_URI:$IMAGE_TAG"

echo
echo "======================================"
echo " Images Successfully Pushed"
echo "======================================"

echo
echo "Backend : $BACKEND_URI:$IMAGE_TAG"
echo "Frontend: $FRONTEND_URI:$IMAGE_TAG"
