#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/backend-bootstrap.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Backend Bootstrap Started"

apt-get update -y

apt-get install -y \
git \
python3 \
python3-venv \
python3-pip \
awscli

cd /opt

git clone https://github.com/Mr-Ujjwal-Agarwal/employee-management-system.git || true

cd employee-management-system/app/backend

python3 -m venv venv

. venv/bin/activate

pip install --upgrade pip

pip install -r requirements.txt

echo "Backend Bootstrap Completed"

echo "Remember to fetch Parameter Store values and create .env"

echo "Then start systemd service."
