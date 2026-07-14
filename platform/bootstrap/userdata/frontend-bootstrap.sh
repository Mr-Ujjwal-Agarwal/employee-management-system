#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/frontend-bootstrap.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Frontend Bootstrap Started"

apt-get update -y

apt-get install -y git nginx curl

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

apt-get install -y nodejs

systemctl enable nginx

cd /opt

git clone https://github.com/Mr-Ujjwal-Agarwal/employee-management-system.git || true

cd employee-management-system/app/frontend

npm install

node node_modules/vite/bin/vite.js build

rm -rf /var/www/html/*

cp -r dist/* /var/www/html/

systemctl restart nginx

systemctl enable nginx

echo "Frontend Bootstrap Completed"
