# ⚙️ Setup Guide

## 1. Overview

This document provides a step-by-step guide for setting up the **Employee Management System (EMS)** from scratch.

It covers:

- Local development environment
- AWS infrastructure prerequisites
- Backend deployment
- Frontend deployment
- Database configuration
- Continuous Integration setup
- Monitoring configuration
- Verification procedures

This guide assumes the project is being deployed on **Amazon Web Services (AWS)** following the Phase 2 architecture.

---

# 2. Prerequisites

Before starting, ensure the following tools and services are available.

## Development Tools

| Tool | Version |
|--------|---------|
| Git | Latest |
| Python | 3.12+ |
| Node.js | 20+ |
| npm | 10+ |
| AWS CLI | Version 2 |
| VS Code | Recommended |

---

## AWS Services

The following AWS services are required.

- Amazon VPC
- Amazon EC2
- Amazon RDS
- Application Load Balancer
- Auto Scaling Groups
- Launch Templates
- Systems Manager Parameter Store
- CodePipeline
- CodeBuild
- CloudWatch
- SNS
- IAM

---

# 3. Clone Repository

Clone the repository.

```bash
git clone https://github.com/<your-username>/employee-management-system.git

cd employee-management-system
```

---

# 4. Backend Setup

Move into the backend directory.

```bash
cd app/backend
```

Create a Python virtual environment.

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
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Backend URL

```
http://localhost:8000
```

Swagger UI

```
http://localhost:8000/docs
```

---

# 5. Frontend Setup

Move into the frontend directory.

```bash
cd app/frontend
```

Install dependencies.

```bash
npm install
```

Start the application.

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 6. AWS Infrastructure Deployment

The project infrastructure is built using native AWS services.

## Networking

Create:

- Custom VPC
- Public Subnets
- Private Subnets
- Internet Gateway
- NAT Gateway
- Route Tables

---

## Compute

Provision:

- Frontend Launch Template
- Backend Launch Template

Create:

- Frontend Auto Scaling Group
- Backend Auto Scaling Group

Attach:

- Public ALB
- Internal ALB

---

## Database

Provision an Amazon RDS instance.

Configure:

- Database Name
- Username
- Password

Restrict database access using Security Groups.

---

# 7. Systems Manager Parameter Store

Store application configuration securely.

Recommended parameters include:

- Database Host
- Database Port
- Database Username
- Database Password
- Database Name

The backend application retrieves these parameters during runtime.

---

# 8. Continuous Integration Setup

The project uses AWS-native Continuous Integration.

## Step 1

Create a GitHub connection.

---

## Step 2

Create two CodeBuild projects.

- Frontend Build
- Backend Build

Each project uses its corresponding buildspec file.

```
platform/cicd/aws-native/buildspec/
```

---

## Step 3

Create an AWS CodePipeline.

Pipeline stages:

Source

↓

Frontend Build

+

Backend Build

---

# 9. Monitoring Setup

Configure monitoring using Amazon CloudWatch.

Create:

- CloudWatch Dashboard
- CloudWatch Alarms

Monitor:

- Pipeline
- CodeBuild
- EC2
- Amazon RDS

---

# 10. SNS Notifications

Create an SNS Topic.

Subscribe your email.

Attach the topic to CloudWatch Alarms.

This enables automatic notifications whenever alarms are triggered.

---

# 11. Validation Checklist

Verify the following after deployment.

Infrastructure

- VPC created
- Subnets configured
- Route Tables configured
- Security Groups configured
- ALBs healthy
- Auto Scaling Groups healthy
- Amazon RDS available

Application

- Backend responding
- Frontend responding

CI

- CodePipeline successful
- Frontend CodeBuild successful
- Backend CodeBuild successful

Monitoring

- Dashboard available
- Alarms active
- SNS notifications working

---

# 12. Common Issues

## Backend not starting

Check:

- Python environment
- Dependencies
- Parameter Store configuration

---

## Frontend build fails

Check:

- Node version
- npm packages
- Build logs

---

## Pipeline failure

Check:

- GitHub connection
- IAM permissions
- CodeBuild logs

---

## SNS email not received

Check:

- Email subscription status
- Alarm configuration

---

# 13. Next Steps

After completing this guide, the environment will provide:

- High Availability
- Automatic Scaling
- Continuous Integration
- Centralized Monitoring
- Operational Alerting

Future phases will introduce:

- Jenkins
- Terraform
- Ansible
- Kubernetes
- GitOps
