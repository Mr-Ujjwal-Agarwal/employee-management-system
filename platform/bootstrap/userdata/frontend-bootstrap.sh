#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/frontend-bootstrap.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "======================================"
echo "EMS Frontend Bootstrap Started"
echo "Time: $(date)"
echo "======================================"

#######################################
# Install Required Packages
#######################################

apt-get update -y

apt-get install -y \
git \
curl \
nginx

#######################################
# Install Node.js 22
#######################################

if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt-get install -y nodejs
fi

echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"

#######################################
# Clone or Update Repository
#######################################

cd /opt

if [ ! -d "/opt/employee-management-system" ]; then
    git clone https://github.com/Mr-Ujjwal-Agarwal/employee-management-system.git
else
    cd /opt/employee-management-system
    git pull
fi

#######################################
# Build Frontend
#######################################

cd /opt/employee-management-system/app/frontend

npm ci

node node_modules/vite/bin/vite.js build

#######################################
# Deploy Build
#######################################

mkdir -p /var/www/html

rm -rf /var/www/html/*

cp -r dist/* /var/www/html/

#######################################
# Validate Nginx
#######################################

nginx -t

systemctl enable nginx

systemctl restart nginx

#######################################
# Verify Service
#######################################

systemctl status nginx --no-pager

########################################
# Install CloudWatch Agent
########################################

bash /opt/employee-management-system/platform/observability/cloudwatch/install-agent.sh

echo "======================================"
echo "Frontend Bootstrap Completed"
echo "======================================"
