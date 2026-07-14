#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/backend-bootstrap.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "======================================"
echo "EMS Backend Bootstrap Started"
echo "Time: $(date)"
echo "======================================"

########################################
# Install Packages
########################################

apt-get update -y

apt-get install -y \
git \
python3 \
python3-venv \
python3-pip \
awscli

########################################
# Clone or Update Repository
########################################

cd /opt

if [ ! -d "/opt/employee-management-system" ]; then
    git clone https://github.com/Mr-Ujjwal-Agarwal/employee-management-system.git
else
    cd /opt/employee-management-system
    git pull
fi

########################################
# Backend Setup
########################################

cd /opt/employee-management-system/app/backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

pip install --upgrade pip

pip install -r requirements.txt
########################################
# Read Parameters from SSM
########################################

DB_HOST=$(aws ssm get-parameter \
--name "/ems/prod/db/host" \
--query "Parameter.Value" \
--output text \
--region ap-south-1)

DB_PORT=$(aws ssm get-parameter \
--name "/ems/prod/db/port" \
--query "Parameter.Value" \
--output text \
--region ap-south-1)

DB_NAME=$(aws ssm get-parameter \
--name "/ems/prod/db/name" \
--query "Parameter.Value" \
--output text \
--region ap-south-1)

DB_USER=$(aws ssm get-parameter \
--name "/ems/prod/db/user" \
--query "Parameter.Value" \
--output text \
--region ap-south-1)

DB_PASSWORD=$(aws ssm get-parameter \
--name "/ems/prod/db/password" \
--with-decryption \
--query "Parameter.Value" \
--output text \
--region ap-south-1)

########################################
# Generate .env
########################################

cat > .env <<EOF
APP_NAME=Employee Management System
APP_VERSION=1.0.0

DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD

DATABASE_URL=mysql+pymysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
EOF

########################################
# Create systemd Service
########################################

cat > /etc/systemd/system/ems-backend.service <<EOF
[Unit]
Description=EMS Backend API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/employee-management-system/app/backend
EnvironmentFile=/opt/employee-management-system/app/backend/.env
ExecStart=/opt/employee-management-system/app/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

########################################
# Start Backend
########################################

systemctl daemon-reload

systemctl enable ems-backend

systemctl restart ems-backend

sleep 10

systemctl status ems-backend --no-pager

curl http://localhost:8000/ || true

echo "======================================"
echo "Backend Bootstrap Completed"
echo "======================================"




