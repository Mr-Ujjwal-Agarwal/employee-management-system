#!/bin/bash

set -e

echo "========================================="
echo " Deploying Employee Management System"
echo "========================================="

docker compose up -d --build --remove-orphans

echo
echo "Deployment completed successfully."
