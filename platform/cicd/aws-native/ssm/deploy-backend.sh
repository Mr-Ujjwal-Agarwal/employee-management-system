#!/bin/bash

set -e

echo "===== Backend Deployment Started ====="

cd /home/ubuntu/employee-management-system

echo "Updating repository..."

git fetch origin
git reset --hard origin/main

cd app/backend

echo "Installing Python packages..."

pip3 install -r requirements.txt

echo "Restarting backend..."

sudo systemctl restart ems-backend

echo "Deployment completed successfully."

echo "===== Backend Deployment Finished ====="
