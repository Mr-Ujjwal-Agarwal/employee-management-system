# 🏗️ System Architecture

## 1. Introduction

The **Employee Management System (EMS)** is a production-inspired, cloud-native application designed to demonstrate modern AWS infrastructure, high availability, continuous integration, monitoring, and operational best practices.

Rather than focusing solely on application development, this project showcases how a full-stack application can be deployed, monitored, and maintained using native AWS services.

The project is implemented in multiple phases, with **Phase 2** representing the completion of the cloud infrastructure, AWS-native Continuous Integration (CI), and monitoring stack.

---

# 2. Architecture Goals

The architecture was designed with the following objectives:

- High Availability
- Fault Tolerance
- Horizontal Scalability
- Secure Configuration Management
- Automated Continuous Integration
- Centralized Monitoring
- Operational Visibility
- Modular Repository Structure
- Easy Future Expansion

---

# 3. High-Level Architecture

The project consists of five major layers:

```
                    Users
                       │
                       ▼
              Application Load Balancer
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
 Frontend Auto Scaling        Backend Auto Scaling
         │                           │
         └─────────────┬─────────────┘
                       ▼
                  Amazon RDS

────────────────────────────────────────

Developer

↓

GitHub

↓

AWS CodePipeline

↓

Frontend CodeBuild

+

Backend CodeBuild

↓

CloudWatch

↓

SNS
```

> **Note:** A professional AWS architecture diagram will be added in a future revision.

---

# 4. Architecture Overview

The solution is divided into multiple logical layers.

| Layer | Responsibility |
|--------|----------------|
| Presentation Layer | React frontend served through an Application Load Balancer |
| Application Layer | FastAPI backend hosted on Amazon EC2 |
| Database Layer | Amazon RDS |
| Networking Layer | Amazon VPC with public and private subnets |
| CI Layer | AWS CodePipeline and AWS CodeBuild |
| Monitoring Layer | Amazon CloudWatch and Amazon SNS |

---

# 5. AWS Networking Architecture

The application is deployed inside a custom Amazon Virtual Private Cloud (VPC).

The networking layer consists of:

- Custom VPC
- Public Subnets
- Private Subnets
- Internet Gateway
- NAT Gateway
- Route Tables
- Security Groups

This architecture isolates backend services and the database while exposing only the required entry points through the Application Load Balancer.

---

# 6. Compute Layer

The compute layer is responsible for hosting both frontend and backend services.

## Frontend

- Amazon EC2
- Auto Scaling Group
- Launch Template
- Public Application Load Balancer

## Backend

- Amazon EC2
- Auto Scaling Group
- Launch Template
- Internal communication with the frontend
- FastAPI application

Using Auto Scaling Groups ensures that failed instances are automatically replaced and allows the application to scale horizontally based on demand.

---

# 7. Database Layer

The project uses **Amazon RDS** as the managed relational database service.

Benefits include:

- Managed backups
- High availability support
- Simplified maintenance
- Secure networking
- Centralized storage

The backend communicates directly with Amazon RDS using credentials stored securely in AWS Systems Manager Parameter Store.

---

# 8. Configuration Management

Application configuration is managed using **AWS Systems Manager Parameter Store**.

Sensitive values such as database credentials and application configuration are stored outside the application code.

Benefits include:

- Secure secret storage
- Centralized configuration
- Easier environment management
- Reduced hardcoded credentials

---

# 9. Continuous Integration Architecture

The project implements an AWS-native Continuous Integration workflow.

## Workflow

Developer

↓

Git Push

↓

GitHub Repository

↓

AWS CodePipeline

↓

Frontend CodeBuild

+

Backend CodeBuild

↓

Build Validation

↓

CloudWatch Logs

Every commit automatically triggers the pipeline, ensuring that both frontend and backend components are built and validated.

---

# 10. Monitoring & Alerting

Monitoring is implemented using Amazon CloudWatch.

The monitoring stack includes:

- CloudWatch Dashboard
- CloudWatch Metrics
- CloudWatch Logs
- CloudWatch Alarms
- Amazon SNS

CloudWatch provides centralized operational visibility while Amazon SNS delivers email notifications whenever critical alarms are triggered.

---

# 11. Security Design

The project follows several AWS security best practices.

## Identity

- IAM Roles
- Least Privilege Principle

## Networking

- Security Groups
- Private Subnets
- Internal Communication

## Secrets

- AWS Systems Manager Parameter Store

## Monitoring

- CloudWatch
- SNS Notifications

---

# 12. Request Flow

The application processes requests using the following flow.

```
User

↓

Application Load Balancer

↓

Frontend EC2

↓

Backend EC2

↓

Amazon RDS

↓

Response
```

---

# 13. Build Flow

Continuous Integration follows this sequence.

```
Developer

↓

GitHub

↓

AWS CodePipeline

↓

Frontend CodeBuild

↓

Backend CodeBuild

↓

CloudWatch Logs

↓

CloudWatch Dashboard

↓

SNS Alerts
```

---

# 14. Design Decisions

Several architectural decisions were made during development.

| Decision | Reason |
|----------|--------|
| Auto Scaling Groups | High availability |
| Application Load Balancer | Traffic distribution |
| Amazon RDS | Managed database |
| Parameter Store | Secure configuration |
| AWS CodePipeline | Native CI workflow |
| AWS CodeBuild | Automated builds |
| CloudWatch | Centralized monitoring |
| SNS | Alert notifications |

---

# 15. Current Limitations

The current implementation intentionally excludes:

- Continuous Deployment
- Kubernetes
- Infrastructure as Code
- GitOps
- Container Orchestration

These capabilities are planned for future project phases.

---

# 16. Future Enhancements

The project roadmap includes:

## Phase 3

- Jenkins
- Continuous Deployment
- Automated Application Deployment
- Health Checks

## Phase 4

- Terraform
- Ansible
- Infrastructure as Code

## Phase 5

- Docker
- Amazon EKS
- Helm
- Argo CD
- Prometheus
- Grafana

---

# Conclusion

The Employee Management System demonstrates a production-inspired AWS architecture that combines modern application development with cloud infrastructure, Continuous Integration, monitoring, and operational best practices.

The architecture has been intentionally designed to evolve across multiple phases, allowing additional DevOps capabilities to be introduced without requiring major architectural changes.

