#!/bin/bash

set -euo pipefail

echo "======================================"
echo " Amazon ECR Login"
echo "======================================"

AWS_REGION="ap-south-1"

ACCOUNT_ID=$(aws sts get-caller-identity \
    --query Account \
    --output text)

echo "AWS Account : $ACCOUNT_ID"
echo "AWS Region  : $AWS_REGION"

aws ecr get-login-password \
    --region "$AWS_REGION" \
| docker login \
    --username AWS \
    --password-stdin \
    "$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

echo
echo "✅ Successfully logged into Amazon ECR"
