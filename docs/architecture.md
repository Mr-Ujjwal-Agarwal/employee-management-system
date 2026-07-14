# System Architecture

## Employee Management System

Version: v1.0.0-beta

---

# Overview

The Employee Management System (EMS) is designed as a production-inspired three-tier web application deployed on Amazon Web Services (AWS).

The architecture emphasizes:

- High Availability
- Fault Tolerance
- Scalability
- Security
- Automation
- Observability
- Maintainability

Unlike a traditional student project, this repository focuses on deploying and operating a production-ready cloud infrastructure around the application.

---

# Architecture Goals

The architecture was designed to achieve the following objectives.

## High Availability

- Eliminate single points of failure.
- Automatically recover from instance failures.
- Distribute traffic across multiple EC2 instances.

---

## Scalability

Automatically scale compute resources based on demand.

Frontend and backend servers are independently scalable using Auto Scaling Groups.

---

## Security

Protect internal services using private networking.

Sensitive information such as database credentials is stored in AWS Systems Manager Parameter Store instead of application code.

---

## Automation

Automate server provisioning using:

- Launch Templates
- EC2 User Data
- Bootstrap Scripts

Every new instance automatically configures itself without manual intervention.

---

## Monitoring

Monitor infrastructure health using:

- Amazon CloudWatch
- CloudWatch Agent
- CloudWatch Dashboard
- CloudWatch Alarms
- Amazon SNS

---

# Architecture Overview

The application follows a classic three-tier architecture.

```text
                    Internet
                        │
                        ▼
         Public Application Load Balancer
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
 Frontend EC2                    Frontend EC2
 Auto Scaling                    Auto Scaling
        │                               │
        └───────────────┬───────────────┘
                        │
                Internal Load Balancer
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
 Backend EC2                     Backend EC2
 Auto Scaling                    Auto Scaling
        │                               │
        └───────────────┬───────────────┘
                        │
                        ▼
                 Amazon RDS MySQL
```

---

# Infrastructure Components

The infrastructure consists of multiple AWS managed services.

| Layer | AWS Service |
|--------|-------------|
| Compute | Amazon EC2 |
| Scaling | Auto Scaling Groups |
| Networking | Amazon VPC |
| Load Balancing | Application Load Balancer |
| Database | Amazon RDS MySQL |
| Monitoring | Amazon CloudWatch |
| Notifications | Amazon SNS |
| Secrets | Systems Manager Parameter Store |
| Security | IAM |

---

# Availability Strategy

High availability is achieved through multiple mechanisms.

## Compute

Two Auto Scaling Groups are used.

- Frontend Auto Scaling Group
- Backend Auto Scaling Group

Each group automatically replaces unhealthy instances.

---

## Networking

Application Load Balancers distribute traffic across healthy instances.

Health checks continuously monitor instance availability.

---

## Database

Amazon RDS provides a managed relational database deployed within private networking.

---

## Failure Recovery

If an EC2 instance becomes unhealthy:

1. Health check fails.
2. Auto Scaling terminates the instance.
3. Launch Template creates a replacement.
4. Bootstrap script configures the new server.
5. Instance registers with the Load Balancer.
6. Traffic resumes automatically.

No manual intervention is required.

---

# Design Principles

The architecture follows several cloud design principles.

## Loose Coupling

Frontend and backend are deployed independently.

Each layer can be updated without affecting the other.

---

## Least Privilege

IAM Roles are used instead of embedding AWS credentials.

Instances receive only the permissions they require.

---

## Infrastructure Automation

Manual server configuration has been minimized.

Bootstrap scripts automatically:

- Install packages
- Configure services
- Retrieve secrets
- Start applications
- Register monitoring

---

## Observability

Operational visibility is provided through:

- CloudWatch Metrics
- CloudWatch Dashboard
- CloudWatch Alarms
- SNS Email Notifications

---

# Current Architecture Status

| Component | Status |
|-----------|--------|
| VPC | ✅ |
| Public ALB | ✅ |
| Internal ALB | ✅ |
| Auto Scaling | ✅ |
| Launch Templates | ✅ |
| Bootstrap Automation | ✅ |
| Amazon RDS | ✅ |
| Parameter Store | ✅ |
| CloudWatch | ✅ |
| SNS | ✅ |
| CodeDeploy | 🚧 Planned |
| HTTPS | 🚧 Planned |

---
# Network Topology

The infrastructure is deployed inside a dedicated Amazon Virtual Private Cloud (VPC) that separates public-facing components from internal application services.

## Public Layer

The public layer contains resources that require internet access.

Components:

- Public Application Load Balancer
- NAT Gateway
- Public Route Table
- Internet Gateway

Responsibilities:

- Accept incoming client requests
- Distribute traffic to frontend servers
- Provide outbound internet access for private resources

---

## Private Application Layer

The application layer contains the backend compute resources.

Components:

- Frontend Auto Scaling Group
- Backend Auto Scaling Group
- Internal Application Load Balancer

Responsibilities:

- Serve application traffic
- Process API requests
- Communicate securely with the database
- Remain inaccessible directly from the internet

---

## Database Layer

The database resides in private subnets.

Components:

- Amazon RDS MySQL

Responsibilities:

- Store application data
- Accept connections only from backend servers
- Remain isolated from public access

---

# Network Request Flow

The following sequence describes how a client request travels through the infrastructure.

```
User Browser
      │
      ▼
Public Application Load Balancer
      │
      ▼
Frontend EC2 Instance
      │
      ▼
Internal Application Load Balancer
      │
      ▼
Backend EC2 Instance
      │
      ▼
Amazon RDS MySQL
```

No component communicates directly with the database except the backend.

---

# Security Architecture

Security is implemented using multiple layers.

## Network Isolation

- Public Subnets expose only the public ALB.
- Backend servers remain in private networking.
- Amazon RDS is not publicly accessible.

---

## Security Groups

Security Groups provide instance-level firewall protection.

### Public ALB

Inbound

- HTTP (80)
- HTTPS (443) *(Planned)*

Outbound

- Frontend Auto Scaling Group

---

### Frontend EC2

Inbound

- Public ALB only

Outbound

- Internal Load Balancer

---

### Internal ALB

Inbound

- Frontend Security Group

Outbound

- Backend Security Group

---

### Backend EC2

Inbound

- Internal ALB only

Outbound

- Amazon RDS

---

### Amazon RDS

Inbound

- Backend Security Group only

Outbound

- None

---

# IAM Strategy

No AWS Access Keys are stored on EC2 instances.

Instead, IAM Roles provide temporary credentials for:

- Systems Manager Parameter Store
- CloudWatch Agent
- Future CodeDeploy integration

This follows the AWS Security Best Practice of using IAM Roles instead of static credentials.

---

# Configuration Management

Application configuration is separated from source code.

Database configuration is stored in:

AWS Systems Manager Parameter Store

Example:

```
/ems/prod/db/host

/ems/prod/db/name

/ems/prod/db/user

/ems/prod/db/password

/ems/prod/db/port
```

Benefits:

- No secrets inside Git
- Centralized configuration
- Easy rotation of credentials
- IAM controlled access

---

# Bootstrap Lifecycle

Every EC2 instance follows the same lifecycle.

```
Launch Template

↓

EC2 Created

↓

User Data Executed

↓

Operating System Updated

↓

Packages Installed

↓

Application Downloaded

↓

Dependencies Installed

↓

Parameter Store Read

↓

Nginx Configured

↓

CloudWatch Agent Installed

↓

Application Started

↓

Health Check Passed

↓

Registered in Target Group
```

The entire provisioning process is automated.

---

# Monitoring Architecture

Infrastructure monitoring is handled through Amazon CloudWatch.

Metrics Collected:

- CPU Utilization
- Memory Utilization
- Disk Usage
- Network Traffic
- Target Health

Alerts:

- CPU High
- Memory High
- Disk Usage High

Notifications:

Amazon SNS sends email alerts whenever an alarm enters the ALARM state.

---

# Design Decisions (Architecture Decision Records)

## ADR-001

Decision

Use separate Auto Scaling Groups for frontend and backend.

Reason

Frontend and backend have different scaling characteristics.

---

## ADR-002

Decision

Use an Internal Application Load Balancer.

Reason

Backend services should never be publicly accessible.

---

## ADR-003

Decision

Store secrets in Systems Manager Parameter Store.

Reason

Avoid hardcoding credentials inside the application.

---

## ADR-004

Decision

Use EC2 User Data for provisioning.

Reason

Every new instance should become production-ready automatically.

---

## ADR-005

Decision

Monitor infrastructure using Amazon CloudWatch.

Reason

Provides native AWS monitoring with minimal operational overhead.

---

# Architecture Evolution

The project roadmap extends the current architecture.

## Phase 2

- AWS CodeDeploy
- AWS CodePipeline
- GitHub Actions

---

## Phase 3

- Route53
- ACM
- HTTPS
- CloudFront

---

## Phase 4

Container Platform

- Docker
- Kubernetes
- Helm
- ArgoCD

---

## Phase 5

Observability

- Prometheus
- Grafana
- Loki

Security

- Trivy
- Checkov
- SonarQube

AI Platform

- Deployment Agent
- Monitoring Agent
- Rollback Agent
- Documentation Agent

---

# Conclusion

The current architecture provides a production-oriented deployment model built around AWS managed services.

The design prioritizes:

- High Availability
- Security
- Automation
- Scalability
- Operational Simplicity
- Cloud-Native Best Practices

Future phases will extend the platform with CI/CD, container orchestration, GitOps, advanced observability, and AI-assisted platform operations while preserving the core architectural principles established in Phase 1.
