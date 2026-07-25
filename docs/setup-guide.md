# ⚙️ Setup Guide

> **Document Version:** 2.0  
> **Project:** Enterprise Employee Management System  
> **Audience:** Developers, DevOps Engineers, Contributors  
> **Status:** Production Portfolio Project  
> **Last Updated:** July 2026

---

# 📖 Purpose

This guide provides detailed instructions for setting up the **Enterprise Employee Management System (EMS)** for local development, infrastructure provisioning, deployment automation, and production deployment on Amazon Web Services (AWS).

It is intended for developers, DevOps engineers, and contributors who want to understand the project architecture, deploy the application, or contribute to its development.

By following this guide, you will configure a complete development and deployment environment capable of supporting the entire software delivery lifecycle.

---

# 🎯 Objectives

After completing this guide, you will be able to:

- Clone and configure the project repository.
- Prepare the local development environment.
- Run the frontend and backend applications.
- Build and execute Docker containers.
- Provision AWS infrastructure using Terraform.
- Configure infrastructure using Ansible.
- Configure Jenkins for CI/CD automation.
- Publish container images to Amazon Elastic Container Registry (ECR).
- Deploy the application to AWS.
- Verify successful deployment and application health.

---

# 🌍 Deployment Overview

The Enterprise Employee Management System follows an automated deployment workflow that combines Infrastructure as Code, Configuration as Code, containerization, and Continuous Integration/Continuous Deployment.

The deployment process is illustrated below.

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Jenkins Pipeline
      │
      ▼
Build Docker Images
      │
      ▼
Amazon Elastic Container Registry (ECR)
      │
      ▼
Terraform Infrastructure
      │
      ▼
AWS Resources
      │
      ▼
Ansible Configuration
      │
      ▼
Application Deployment
      │
      ▼
Production Environment
```

This guide follows the same workflow used throughout the project.

---

# 💻 System Requirements

Ensure the following software is installed before beginning the setup process.

| Software | Recommended Version | Purpose |
|----------|---------------------|---------|
| Git | Latest Stable | Source control |
| Docker Engine | 24+ | Container runtime |
| Docker Compose | Version 2 | Multi-container deployment |
| Python | 3.12+ | Backend runtime |
| Node.js | 20+ | Frontend runtime |
| npm | 10+ | Frontend package manager |
| Terraform | Latest Stable | Infrastructure provisioning |
| Ansible | Latest Stable | Configuration management |
| AWS CLI | Version 2 | AWS resource management |
| Jenkins | Latest LTS | CI/CD automation |
| Visual Studio Code | Latest | Development environment |

---

# ☁️ AWS Requirements

Before provisioning infrastructure, ensure an AWS account has been configured with sufficient permissions.

The deployment requires access to services including:

- Amazon EC2
- Amazon VPC
- Amazon RDS
- Amazon ECR
- IAM
- Security Groups
- Application Load Balancer
- Amazon CloudWatch

AWS credentials should be configured locally using the AWS CLI or through environment variables.

---

# 📁 Repository Structure

The project repository follows a modular organization that separates application development, infrastructure provisioning, deployment automation, monitoring, and documentation.

```text
employee-management-system/
│
├── app/
│   ├── frontend/
│   └── backend/
│
├── platform/
│   ├── terraform/
│   ├── ansible/
│   ├── cicd/
│   ├── bootstrap/
│   └── observability/
│
├── docs/
│
├── assets/
│
├── tests/
│
├── Jenkinsfile
├── docker-compose.yml
├── README.md
├── SECURITY.md
└── CHANGELOG.md
```

---

# 📂 Directory Overview

Each directory within the repository serves a specific purpose.

| Directory | Description |
|-----------|-------------|
| `app/frontend` | React frontend application |
| `app/backend` | FastAPI backend application |
| `platform/terraform` | Infrastructure as Code definitions |
| `platform/ansible` | Configuration management playbooks and roles |
| `platform/cicd` | CI/CD automation scripts and supporting resources |
| `platform/bootstrap` | Bootstrap scripts and Nginx configuration |
| `platform/observability` | CloudWatch configuration |
| `docs` | Technical documentation |
| `assets` | Architecture diagrams and project images |
| `tests` | Automated testing resources |

---

# 🔑 Prerequisites

Before proceeding, verify the following prerequisites have been completed.

## Development Environment

- Git is installed and configured.
- Docker Engine is running.
- Docker Compose is available.
- Python is installed.
- Node.js and npm are installed.

---

## AWS Environment

- AWS account is active.
- AWS CLI is configured.
- IAM credentials have appropriate permissions.
- Amazon ECR repositories are accessible.

---

## Development Tools

- Visual Studio Code (or preferred IDE)
- GitHub account
- Jenkins server
- Internet connectivity for dependency installation

---

# 📌 Setup Workflow

The setup process is organized into several stages.

```text
Repository Setup
        │
        ▼
Environment Configuration
        │
        ▼
Application Setup
        │
        ▼
Docker Configuration
        │
        ▼
Infrastructure Provisioning
        │
        ▼
Server Configuration
        │
        ▼
CI/CD Configuration
        │
        ▼
Deployment
        │
        ▼
Validation
```

Each stage builds upon the previous one, ensuring a consistent and repeatable deployment process.

# 📥 Clone the Repository

Clone the project repository from GitHub and navigate to the project root directory.

```bash
git clone https://github.com/<your-username>/employee-management-system.git

cd employee-management-system
```

Verify that the repository has been cloned successfully.

```bash
git status
```

Expected output:

```text
On branch main
nothing to commit
working tree clean
```

---

# ⚙️ Environment Configuration

Before running the application, configure the required environment variables.

The project uses environment-specific configuration files for both frontend and backend services.

Create the required environment files if they do not already exist.

Example variables include:

```text
APP_ENV=development

API_BASE_URL=http://localhost:8000

DATABASE_URL=<database-connection-string>

AWS_REGION=<aws-region>

AWS_ACCOUNT_ID=<aws-account-id>

ECR_FRONTEND_REPOSITORY=<frontend-repository>

ECR_BACKEND_REPOSITORY=<backend-repository>

SECRET_KEY=<application-secret>
```

> **Important:** Never commit credentials, secrets, or environment files containing sensitive information to the repository.

---

# ⚙️ Backend Setup

The backend service is implemented using **FastAPI**.

Navigate to the backend directory.

```bash
cd app/backend
```

---

## Create a Virtual Environment

Create a dedicated Python virtual environment.

```bash
python -m venv venv
```

---

## Activate the Virtual Environment

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

---

## Install Dependencies

Install the required Python packages.

```bash
pip install -r requirements.txt
```

---

## Start the Backend Server

Launch the FastAPI development server.

```bash
uvicorn app.main:app --reload
```

---

## Verify Backend

Open the application in your browser.

Home Endpoint

```
http://localhost:8000
```

Interactive API Documentation

```
http://localhost:8000/docs
```

OpenAPI Specification

```
http://localhost:8000/openapi.json
```

Successful startup indicates that the backend service is ready for development.

---

# 🎨 Frontend Setup

The frontend application is developed using **React**.

Navigate to the frontend directory.

```bash
cd app/frontend
```

---

## Install Dependencies

Install the required Node.js packages.

```bash
npm install
```

---

## Start the Development Server

Launch the React development server.

```bash
npm run dev
```

---

## Verify Frontend

Open the application in your browser.

```
http://localhost:5173
```

Verify that:

- The application loads successfully.
- Static assets are served correctly.
- API requests can reach the backend service.

---

# 🐳 Docker Setup

Docker provides a consistent runtime environment for both local development and production deployment.

---

## Verify Docker Installation

Confirm that Docker is installed correctly.

```bash
docker --version
```

Example output:

```text
Docker version 24.x.x
```

---

## Verify Docker Compose

```bash
docker compose version
```

---

## Build Application Images

Build all application containers.

```bash
docker compose build
```

---

## Start Application Stack

Launch the complete application stack.

```bash
docker compose up -d
```

---

## Verify Running Containers

List active containers.

```bash
docker ps
```

Typical output should include containers similar to:

- Frontend
- Backend

depending on your deployment configuration.

---

## View Container Logs

To inspect application logs:

Frontend

```bash
docker logs <frontend-container>
```

Backend

```bash
docker logs <backend-container>
```

Follow live logs.

```bash
docker logs -f <container-name>
```

---

## Stop the Application

Stop all running services.

```bash
docker compose down
```

To remove associated volumes as well:

```bash
docker compose down -v
```

---

# ✅ Local Development Verification

Before continuing to infrastructure provisioning, verify that the local development environment is functioning correctly.

### Backend Verification

- FastAPI starts without errors.
- API documentation is accessible.
- REST endpoints respond successfully.

### Frontend Verification

- React application loads correctly.
- Static assets are served.
- API requests complete successfully.

### Docker Verification

- Containers build successfully.
- All required containers are running.
- No unexpected errors appear in container logs.

Once these checks have been completed successfully, the local development environment is ready for cloud deployment and infrastructure automation.

# ☁️ AWS CLI Configuration

The AWS Command Line Interface (CLI) enables interaction with AWS services from the local development environment and automation pipeline.

---

## Verify Installation

Confirm that the AWS CLI is installed.

```bash
aws --version
```

Example output:

```text
aws-cli/2.x.x
```

---

## Configure AWS Credentials

Configure the AWS CLI with an IAM user that has sufficient permissions to provision infrastructure and interact with Amazon ECR.

```bash
aws configure
```

You will be prompted for:

```text
AWS Access Key ID
AWS Secret Access Key
Default Region
Default Output Format
```

Verify the configuration.

```bash
aws sts get-caller-identity
```

A successful response confirms that authentication has been configured correctly.

---

# 🏗️ Infrastructure Provisioning

Infrastructure is provisioned using **Terraform**.

All infrastructure definitions are located within the Terraform directory.

```text
platform/
└── terraform/
```

---

## Initialize Terraform

Navigate to the Terraform directory.

```bash
cd platform/terraform
```

Initialize the working directory.

```bash
terraform init
```

This command downloads the required providers and initializes the backend configuration.

---

## Validate Configuration

Before provisioning infrastructure, validate the Terraform configuration.

```bash
terraform validate
```

---

## Review Execution Plan

Generate an execution plan to review the infrastructure changes.

```bash
terraform plan
```

Review the proposed changes carefully before applying them.

---

## Provision Infrastructure

Create or update AWS resources.

```bash
terraform apply
```

Terraform provisions resources such as:

- Amazon VPC
- Subnets
- Security Groups
- IAM resources
- Amazon EC2
- Application Load Balancer
- Amazon RDS
- Amazon ECR

---

## Verify Resources

Confirm that all required AWS resources have been created successfully through:

- AWS Management Console
- AWS CLI
- Terraform outputs

---

# ⚙️ Server Configuration

Once infrastructure provisioning is complete, configure the application servers using **Ansible**.

Navigate to the Ansible directory.

```bash
cd platform/ansible
```

---

## Verify Inventory

Review the inventory file to ensure that target hosts are configured correctly.

Example:

```bash
cat inventories/production/hosts
```

---

## Test Connectivity

Verify connectivity to managed hosts.

```bash
ansible all -m ping
```

Expected output:

```text
SUCCESS
```

---

## Execute Playbooks

Configure the infrastructure using the primary deployment playbook.

```bash
ansible-playbook playbooks/site.yml
```

Depending on your deployment workflow, additional playbooks may also be executed individually.

Typical responsibilities include:

- Operating system configuration
- Docker installation
- AWS CLI installation
- Nginx configuration
- CloudWatch Agent installation
- Backend deployment
- Frontend deployment

---

## Verify Configuration

Confirm that:

- Docker is installed.
- Required services are running.
- Nginx is configured correctly.
- CloudWatch Agent is active.
- Application containers are operational.

---

# 🚀 Jenkins Configuration

Jenkins automates the build and deployment workflow.

---

## Install Required Plugins

Install the following plugins:

- Git
- Pipeline
- Docker
- Docker Pipeline
- Credentials Binding
- SSH Agent
- Blue Ocean (Optional)

---

## Configure Global Tools

Configure:

- Git
- Docker
- JDK (if required)
- AWS CLI

---

## Configure Credentials

Store sensitive information using the Jenkins Credentials Store.

Typical credentials include:

- GitHub Personal Access Token
- AWS Access Key
- AWS Secret Access Key
- SSH Private Key
- Docker Registry Credentials (if applicable)

Sensitive information should never be stored directly in the Jenkinsfile.

---

## Create Pipeline Job

Create a new Pipeline project.

Configure Jenkins to use the repository's `Jenkinsfile`.

Each pipeline execution performs:

- Source checkout
- Docker image build
- Amazon ECR authentication
- Image publishing
- Application deployment
- Health verification
- Cleanup

---

# 📦 Amazon Elastic Container Registry (ECR)

Amazon ECR stores Docker images generated during the CI/CD pipeline.

---

## Authenticate Docker

Authenticate Docker with Amazon ECR.

```bash
aws ecr get-login-password \
| docker login \
--username AWS \
--password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

---

## Build Images

Frontend

```bash
docker build -t frontend .
```

Backend

```bash
docker build -t backend .
```

---

## Tag Images

Example:

```bash
docker tag frontend:latest \
<account-id>.dkr.ecr.<region>.amazonaws.com/frontend:latest
```

---

## Push Images

```bash
docker push <repository-uri>
```

Verify that the images appear in the Amazon ECR repository.

---

# 🌍 Production Deployment

Once infrastructure, configuration, and container images are available, deploy the latest application version.

The deployment process performs the following operations:

1. Retrieve the latest container images from Amazon ECR.
2. Configure the runtime environment.
3. Start application containers.
4. Verify service health.
5. Complete deployment validation.

Depending on the deployment workflow, application services may be started using:

```bash
docker compose up -d
```

or through automated deployment scripts executed by the Jenkins pipeline and Ansible playbooks.

---

# 🔍 Deployment Validation

After deployment, verify that the application is functioning correctly.

### Infrastructure

- Terraform completed successfully.
- Required AWS resources exist.
- Security Groups are configured correctly.
- Application Load Balancer is operational.

---

### Configuration

- Ansible completed without failures.
- Required packages are installed.
- Docker services are active.
- CloudWatch Agent is running.

---

### Application

- Frontend is accessible.
- Backend APIs respond successfully.
- Database connectivity is operational.
- Container logs show no critical errors.

---

### CI/CD

- Jenkins pipeline completed successfully.
- Docker images were pushed to Amazon ECR.
- Deployment completed successfully.
- Health checks passed.

# 🔍 Common Setup Issues

The following table lists common issues that may be encountered during project setup and deployment.

| Issue | Possible Cause | Recommended Solution |
|--------|----------------|----------------------|
| Git repository cannot be cloned | Incorrect repository URL or insufficient permissions | Verify repository URL and GitHub access |
| Docker daemon is unavailable | Docker service is not running | Start the Docker service and verify installation |
| Backend fails to start | Missing Python dependencies or incorrect environment variables | Install dependencies and review backend configuration |
| Frontend fails to load | Node.js dependencies not installed | Execute `npm install` and restart the development server |
| Terraform initialization fails | Missing providers or invalid backend configuration | Re-run `terraform init` and review Terraform configuration |
| Terraform apply fails | Invalid AWS credentials or insufficient IAM permissions | Verify AWS CLI configuration and IAM policies |
| Ansible cannot reach target hosts | Incorrect inventory or SSH configuration | Review inventory files and verify SSH connectivity |
| Jenkins pipeline fails | Missing plugins or invalid credentials | Review Jenkins configuration and pipeline credentials |
| Docker image push fails | Amazon ECR authentication failure | Authenticate Docker using AWS CLI and retry |
| Application is inaccessible | Services are not running or network configuration is incorrect | Verify container status, Security Groups, and Load Balancer configuration |

---

# 🧪 Post-Deployment Validation Checklist

After deployment, perform the following verification steps.

## Infrastructure Validation

- Terraform completed successfully.
- Amazon EC2 instances are running.
- Application Load Balancer is operational.
- Amazon RDS is available.
- Security Groups are configured correctly.
- Amazon ECR repositories are accessible.

---

## Configuration Validation

- Ansible playbooks completed successfully.
- Docker is installed and running.
- Nginx configuration is active.
- CloudWatch Agent is operational.
- Required system services are enabled.

---

## Application Validation

- React frontend loads successfully.
- FastAPI backend responds to API requests.
- Frontend communicates with backend services.
- Database connectivity is verified.
- Application logs contain no critical errors.

---

## CI/CD Validation

- Jenkins pipeline completed successfully.
- Docker images were built successfully.
- Images were pushed to Amazon ECR.
- Latest application version was deployed.
- Automated health checks passed.

---

# 📋 Operational Best Practices

Follow these recommendations to maintain a reliable and consistent deployment environment.

---

## Source Code Management

- Use feature branches for development.
- Submit changes through pull requests.
- Keep commit messages meaningful and consistent.
- Review code before merging into the main branch.

---

## Infrastructure Management

- Manage AWS resources exclusively through Terraform.
- Avoid manual infrastructure changes whenever possible.
- Store Terraform state securely.
- Review execution plans before applying infrastructure changes.

---

## Configuration Management

- Maintain reusable and idempotent Ansible roles.
- Organize playbooks by functional responsibility.
- Validate inventory files before execution.
- Keep server configuration under version control.

---

## Container Management

- Use official and trusted base images.
- Build images using multi-stage Dockerfiles where appropriate.
- Remove unused images and containers regularly.
- Keep container images up to date.

---

## CI/CD Pipeline

- Store secrets in Jenkins Credentials.
- Validate builds before deployment.
- Monitor pipeline execution logs.
- Keep deployment automation synchronized with infrastructure changes.

---

## Security

- Never commit secrets or credentials to the repository.
- Apply the principle of least privilege for IAM users and roles.
- Rotate credentials periodically.
- Monitor infrastructure using Amazon CloudWatch.
- Review security configurations regularly.

---

## Documentation

- Keep documentation synchronized with implementation.
- Update setup instructions whenever deployment processes change.
- Document infrastructure modifications.
- Record operational procedures and recovery steps.

---

# 📚 Related Documentation

Additional project documentation is available in the following files.

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and quick start |
| `architecture.md` | System architecture and design |
| `operations-guide.md` | Operational procedures and maintenance |
| `runbook.md` | Incident response and recovery |
| `SECURITY.md` | Security architecture and operational practices |

---

# 📝 Conclusion

The Enterprise Employee Management System is designed around modern DevOps engineering practices, combining application development, Infrastructure as Code, Configuration as Code, containerization, and CI/CD automation into a unified deployment workflow.

By following this guide, you have configured the development environment, provisioned cloud infrastructure, prepared application servers, automated deployments, and validated the production environment.

The resulting platform provides a consistent and repeatable setup process that supports local development, cloud deployment, operational maintenance, and future project contributions.

Maintaining this deployment workflow through version-controlled infrastructure, automated configuration, and comprehensive documentation ensures that the platform remains reliable, maintainable, and aligned with production-oriented engineering practices.

