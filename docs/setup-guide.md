# Setup Guide

## Employee Management System

Version: v1.0.0-beta

---

# Overview

This guide explains how to set up, deploy, and validate the Employee Management System.

The project consists of:

- React Frontend
- FastAPI Backend
- Amazon RDS MySQL
- AWS Infrastructure
- Auto Scaling
- Load Balancers
- CloudWatch Monitoring

The guide covers both local development and AWS deployment.

---

# Prerequisites

## AWS

Before deployment, ensure the following services are available.

- AWS Account
- IAM User or IAM Role
- AWS CLI
- Amazon VPC
- EC2
- Auto Scaling
- Launch Templates
- Application Load Balancer
- Amazon RDS
- Systems Manager Parameter Store
- Amazon CloudWatch
- Amazon SNS

---

## Local Development

Install the following software.

### Operating System

Recommended

- Ubuntu 24.04 LTS or later
- macOS
- Windows with WSL2

---

### Required Software

| Software | Version |
|----------|---------|
| Git | Latest |
| Python | 3.12+ |
| Node.js | 20+ |
| npm | Latest |
| AWS CLI | v2 |
| MySQL Client | Latest |

---

# Repository Setup

Clone the repository.

```bash
git clone https://github.com/Mr-Ujjwal-Agarwal/employee-management-system.git

cd employee-management-system
```

Verify the repository.

```bash
tree -L 2
```

Expected output

```text
app/
aws/
assets/
diagrams/
docs/
platform/
tests/
README.md
```

---

# AWS CLI Configuration

Configure AWS credentials.

```bash
aws configure
```

Provide:

```
AWS Access Key ID

AWS Secret Access Key

Region

Output Format
```

Verify configuration.

```bash
aws sts get-caller-identity
```

Expected

```json
{
    "UserId": "...",
    "Account": "...",
    "Arn": "..."
}
```

---

# Project Structure

```
app/
platform/
docs/
assets/
diagrams/
tests/
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd app/backend
```

Create a virtual environment.

```bash
python3 -m venv venv
```

Activate it.

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the backend.

```bash
uvicorn app.main:app --reload
```

Default endpoint

```
http://localhost:8000
```

Verify

```
http://localhost:8000/docs
```

FastAPI Swagger UI should load successfully.

---

# Frontend Setup

Navigate to the frontend.

```bash
cd app/frontend
```

Install packages.

```bash
npm install
```

Run the application.

```bash
npm run dev
```

Default URL

```
http://localhost:5173
```

Verify

The login page should be displayed.

---

# Database Setup

The production environment uses Amazon RDS MySQL.

Connection details are retrieved automatically from AWS Systems Manager Parameter Store.

Required Parameters

```
/ems/prod/db/host

/ems/prod/db/name

/ems/prod/db/user

/ems/prod/db/password

/ems/prod/db/port
```

Never hardcode credentials inside the application.

---

# Environment Configuration

The application expects configuration from AWS Systems Manager Parameter Store.

Required IAM Permissions

- ssm:GetParameter
- ssm:GetParameters

Verify access.

```bash
aws ssm describe-parameters --region ap-south-1
```

---

# Build Verification

Backend

```bash
curl http://localhost:8000/docs
```

Frontend

Open

```
http://localhost:5173
```
# AWS Deployment

The production deployment uses:

- Launch Templates
- Auto Scaling Groups
- Application Load Balancers
- Bootstrap Scripts

Deployment Flow

```
Launch Template

↓

EC2 Instance

↓

User Data Script

↓

Install Packages

↓

Retrieve Parameters

↓

Configure Nginx

↓

Start Application

↓

CloudWatch Agent

↓

Health Check

↓

Target Group
```

---

# Validation Checklist

After deployment, verify:

## EC2

- Instances are running
- IAM Role attached
- Bootstrap completed

---

## Auto Scaling

Verify:

- Desired Capacity
- Healthy Instances
- Instance Refresh

---

## Load Balancer

Verify:

- Healthy Targets
- Listener Configuration
- Health Checks

---

## Database

Verify:

- RDS Available
- Backend Connected
- Queries Successful

---

## Parameter Store

Verify:

```bash
aws ssm get-parameter \
--name "/ems/prod/db/host"
```

---

## CloudWatch

Verify:

- Dashboard
- Memory Metrics
- Disk Metrics
- CPU Metrics

---

## SNS

Trigger a test alarm.

Confirm email notification is received.

---

# Troubleshooting

## Target Unhealthy

Possible causes

- Bootstrap failure
- Incorrect Nginx configuration
- Application not started
- Wrong Health Check Path

---

## Backend Cannot Reach Database

Verify

- Security Groups
- Parameter Store
- IAM Role
- RDS Status

---

## CloudWatch Metrics Missing

Verify

```bash
systemctl status amazon-cloudwatch-agent
```

---

## Auto Scaling Failure

Verify

- Launch Template
- User Data
- Activity History

---

# Cleanup

To remove the infrastructure.

Delete:

- Auto Scaling Groups
- Launch Templates
- Load Balancers
- Target Groups
- RDS
- CloudWatch Alarms
- SNS Topics

Finally

Delete:

- VPC
- NAT Gateway
- Internet Gateway
- Security Groups

---

# Known Issues

## CodeDeploy

AWS CodeDeploy Agent is currently incompatible with Ubuntu 26.04 LTS.

Planned Resolution

Migration to Ubuntu 24.04 LTS or Amazon Linux 2023.

---

## HTTPS

Pending:

- Domain Registration
- Route53
- AWS Certificate Manager

---

# Best Practices

- Use IAM Roles instead of Access Keys.
- Store secrets in Parameter Store.
- Enable CloudWatch monitoring.
- Keep bootstrap scripts idempotent.
- Never expose the database publicly.
- Validate infrastructure after every deployment.

---

# Setup Complete

The Employee Management System is now ready for development and production deployment.

For operational procedures, continue with:

- `docs/operations-guide.md`
- `docs/runbook.md`
- `docs/disaster-recovery.md`




Both should respond successfully.

---
