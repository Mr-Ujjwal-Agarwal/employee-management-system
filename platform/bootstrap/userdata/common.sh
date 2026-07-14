#!/bin/bash
set -euo pipefail

LOG_FILE="/var/log/ems-bootstrap.log"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================="
echo "EMS Bootstrap Started: $(date)"
echo "========================================="

apt-get update -y

apt-get install -y \
git \
curl \
wget \
unzip \
jq \
awscli

echo "Common packages installed."
