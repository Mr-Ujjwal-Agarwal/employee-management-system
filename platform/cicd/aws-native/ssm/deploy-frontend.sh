#!/bin/bash

set -e

echo "===== Frontend Deployment Started ====="

cd /home/ubuntu/employee-management-system

echo "Updating repository..."

git fetch origin
git reset --hard origin/main

echo "Installing dependencies..."

cd app/frontend

npm install

echo "Building frontend..."

npm run build

echo "Restarting nginx..."

sudo systemctl restart nginx

echo "Deployment completed successfully."

echo "===== Frontend Deployment Finished ====="
