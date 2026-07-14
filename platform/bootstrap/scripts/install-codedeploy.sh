#!/bin/bash
set -e

apt update -y

apt install ruby wget -y

cd /tmp

wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install

chmod +x install

./install auto

systemctl enable codedeploy-agent

systemctl restart codedeploy-agent
