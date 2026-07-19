# ⚙️ Setup Guide

> **Document Version:** Phase 3 – Enterprise CI/CD  
> **Project:** Enterprise Employee Management System  
> **Audience:** Developers, DevOps Engineers, Contributors  
> **Last Updated:** July 2026

---

# 1. Overview

This guide provides step-by-step instructions for setting up the **Enterprise Employee Management System (EMS)** for both local development and AWS deployment.

It is intended for developers and DevOps engineers who want to contribute to the project or deploy the application in a cloud environment.

At the end of this guide, you will have:

- A fully configured local development environment
- Running frontend and backend services
- Dockerized application
- Jenkins configured for CI/CD
- Amazon ECR integration
- AWS EC2 deployment
- Verified application health

---

# 2. Project Architecture

The current deployment architecture is shown below.

```
Developer
     │
     ▼
GitHub Repository
     │
     ▼
Jenkins Pipeline
     │
     ▼
Docker Image Build
     │
     ▼
Amazon ECR
     │
     ▼
AWS EC2
     │
     ▼
Docker Compose
     │
     ▼
Employee Management System
```

This setup guide follows the same workflow used throughout the project.

---

# 3. System Requirements

Ensure the following software is installed before starting.

| Software | Recommended Version |
|-----------|--------------------|
| Git | Latest Stable |
| Docker Engine | 24+ |
| Docker Compose | v2 |
| Python | 3.12+ |
| Node.js | 20+ |
| npm | 10+ |
| AWS CLI | Version 2 |
| Jenkins | LTS |
| VS Code | Recommended |

---

# 4. Repository Structure

The repository is organized into multiple components.

```text
employee-management-system/

├── app/
│   ├── backend/
│   └── frontend/
│
├── docker/
│
├── docs/
│
├── jenkins/
│
├── scripts/
│
├── README.md
│
└── docker-compose.yml
```

> **Note:** The exact structure may evolve as additional project phases are completed.

---

# 5. Clone the Repository

Clone the repository using Git.

```bash
git clone https://github.com/<your-username>/employee-management-system.git

cd employee-management-system
```

Verify the repository.

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

# 6. Backend Setup

Navigate to the backend directory.

```bash
cd app/backend
```

Create a virtual environment.

```bash
python3 -m venv venv
```

Activate it.

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```powershell
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the backend.

```bash
uvicorn app.main:app --reload
```

Verify the backend.

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# 7. Frontend Setup

Navigate to the frontend directory.

```bash
cd app/frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Verify the application.

```
http://localhost:5173
```

---

# 8. Docker Setup

Verify Docker installation.

```bash
docker --version
```

Verify Docker Compose.

```bash
docker compose version
```

Build the project.

```bash
docker compose build
```

Start all services.

```bash
docker compose up -d
```

Verify running containers.

```bash
docker ps
```

Expected services should include:

- Frontend
- Backend

---

# 9. Environment Configuration

Create the required environment files before deployment.

Typical variables include:

```text
APP_ENV

API_BASE_URL

DATABASE_URL

AWS_REGION

AWS_ACCOUNT_ID

ECR_REPOSITORY

SECRET_KEY
```

> Sensitive information should never be committed to the repository.

---

# 10. Jenkins Setup

Install Jenkins (LTS version).

Required plugins include:

- Git
- Pipeline
- Docker
- Docker Pipeline
- Credentials Binding
- Blue Ocean (Optional)

Configure:

- Git executable
- Docker access
- AWS credentials
- GitHub credentials

Create a Pipeline job that references the project's `Jenkinsfile`.

> Detailed pipeline configuration is documented separately.

---

# 11. Amazon ECR Configuration

Authenticate Docker with Amazon ECR.

```bash
aws configure
```

Login to ECR.

```bash
aws ecr get-login-password \
| docker login \
--username AWS \
--password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

Push Docker images.

```bash
docker push <image-name>
```

Verify the repository in Amazon ECR.

---

# 12. AWS EC2 Deployment

Launch an EC2 instance with Docker installed.

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the project.

```bash
cd employee-management-system
```

Deploy the application.

```bash
docker compose up -d
```

Verify deployment.

```bash
docker ps
```

---

# 13. Deployment Verification

Verify the following after setup.

## Local Verification

- Backend is accessible
- Frontend is accessible
- Docker containers are healthy
- API communication is successful

---

## Jenkins Verification

- Pipeline executes successfully
- Docker images build correctly
- Images are pushed to Amazon ECR

---

## AWS Verification

- EC2 instance is running
- Containers are healthy
- Application is accessible
- Logs contain no critical errors

---

# 14. Common Setup Mistakes

During setup, verify the following:

- Docker daemon is running
- AWS CLI is configured correctly
- Docker has permission to execute
- Required environment variables exist
- Required ports are available
- Jenkins has Docker access
- AWS credentials are valid

> A complete list of real project incidents is documented in the **Engineering Incident Log & Troubleshooting Guide**.

---

# 15. Best Practices

Follow these recommendations during development.

- Use Docker for consistency.
- Keep dependencies updated.
- Never commit secrets or credentials.
- Use feature branches for development.
- Verify changes locally before pushing.
- Monitor container logs after deployment.
- Keep documentation synchronized with implementation.

---

# 16. Related Documentation

- README.md
- architecture.md
- operations-guide.md
- runbook.md
- roadmap.md
- troubleshooting.md

---

# 17. Conclusion

You have successfully completed the project setup.

The environment is now ready for:

- Local development
- Containerized execution
- Continuous Integration using Jenkins
- Docker image management with Amazon ECR
- AWS EC2 deployment

Future phases of the project will extend this setup with:

- Terraform
- Ansible
- Kubernetes
- GitOps
- Monitoring
- DevSecOps
