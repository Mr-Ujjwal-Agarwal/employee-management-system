# 🛠️ Operations Guide

> **Document Version:** 2.0  
> **Project:** Enterprise Employee Management System  
> **Audience:** DevOps Engineers, Platform Engineers, System Administrators, Contributors  
> **Prerequisites:** Successful deployment using the Setup Guide  
> **Status:** Production Portfolio Project  
> **Last Updated:** July 2026

---

# 📖 Purpose

This document describes the operational procedures required to manage, maintain, monitor, and support the Enterprise Employee Management System (EMS) after deployment.

It serves as the primary operational handbook for engineers responsible for ensuring application availability, infrastructure stability, deployment reliability, and day-to-day platform maintenance.

Unlike the Setup Guide, which focuses on provisioning and deployment, this document covers routine operational activities performed throughout the application's lifecycle.

---

# 🎯 Operational Objectives

The operational procedures described in this guide are designed to achieve the following objectives.

- Maintain application availability.
- Ensure infrastructure stability.
- Monitor application health.
- Standardize deployment operations.
- Support repeatable maintenance procedures.
- Simplify operational troubleshooting.
- Maintain deployment consistency.
- Reduce manual operational effort.
- Improve platform reliability.
- Support long-term maintainability.

---

# 🌍 Operational Overview

The Enterprise Employee Management System is operated through an automated DevOps workflow that integrates cloud infrastructure, containerized applications, deployment automation, configuration management, and centralized monitoring.

Daily operations involve managing both the application and the supporting AWS infrastructure while ensuring that deployments remain consistent and reliable.

The operational lifecycle includes:

- Infrastructure management
- Application management
- Container operations
- Deployment automation
- Monitoring
- Incident response
- Routine maintenance

---

# 🏗️ Operational Architecture

The production platform consists of multiple integrated operational components.

```text
                        End Users
                             │
                             ▼
                Application Load Balancer
                             │
           ┌─────────────────┴─────────────────┐
           ▼                                   ▼
   React Frontend Container          FastAPI Backend Container
           │                                   │
           └───────────────┬───────────────────┘
                           ▼
                  Amazon RDS (MySQL)

────────────────────────────────────────────────────────

GitHub Repository
        │
        ▼
Jenkins Pipeline
        │
        ▼
Docker Images
        │
        ▼
Amazon ECR
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
Production Deployment

────────────────────────────────────────────────────────

Amazon CloudWatch
        ▲
        │
Infrastructure & Application Monitoring
```

---

# 👥 Operational Responsibilities

Each platform component has a clearly defined operational responsibility.

| Component | Operational Responsibility |
|-----------|----------------------------|
| GitHub | Source code management and version control |
| Jenkins | Continuous Integration and deployment automation |
| Docker | Container lifecycle management |
| Amazon ECR | Container image storage and version management |
| Terraform | Infrastructure provisioning and lifecycle management |
| Ansible | Server configuration and application deployment |
| Amazon EC2 | Compute platform for application hosting |
| Amazon RDS | Managed database platform |
| Application Load Balancer | Traffic distribution |
| Amazon CloudWatch | Monitoring, logging, and operational visibility |

---

# 📅 Daily Operational Checklist

The following verification tasks should be completed before performing maintenance activities or deploying a new application version.

---

## 🌐 Application Health

Verify that:

- The frontend application is accessible.
- Backend APIs respond successfully.
- Authentication (if applicable) functions correctly.
- API requests complete without unexpected errors.
- Application response times remain within expected limits.

---

## 🐳 Container Health

Verify that:

- Required containers are running.
- No containers are restarting unexpectedly.
- Container resource usage remains stable.
- Container logs contain no critical errors.
- Docker services are operating normally.

---

## ☁️ Infrastructure Health

Verify:

- Amazon EC2 instances are operational.
- Application Load Balancer is healthy.
- Amazon RDS is available.
- Security Groups remain unchanged.
- Network connectivity is functioning correctly.

---

## 🚀 Deployment Health

Review the latest deployment.

Confirm that:

- Jenkins pipeline completed successfully.
- Latest Docker images exist in Amazon ECR.
- Deployment completed without failures.
- Health checks passed successfully.

---

## 📊 Monitoring Health

Review Amazon CloudWatch for:

- Infrastructure metrics
- Application logs
- System resource utilization
- Error events
- Warning notifications

Any unexpected behaviour should be investigated before continuing with operational activities.

---

# 📌 Operational Workflow

Routine operations generally follow the workflow below.

```text
Health Verification
        │
        ▼
Infrastructure Check
        │
        ▼
Container Verification
        │
        ▼
Application Validation
        │
        ▼
Deployment (If Required)
        │
        ▼
Monitoring Review
        │
        ▼
Operational Maintenance
```

This standardized workflow helps ensure that operational changes are performed consistently while reducing the likelihood of introducing service disruptions.

# 🐳 Docker Operations

Docker provides the runtime environment for the Enterprise Employee Management System. Routine container management ensures that application services remain healthy, available, and consistent across deployments.

---

## Verify Docker Service

Confirm that the Docker daemon is running.

```bash
systemctl status docker
```

If the service is inactive, start it.

```bash
sudo systemctl start docker
```

Enable Docker to start automatically after system reboot.

```bash
sudo systemctl enable docker
```

---

## View Running Containers

Display all active containers.

```bash
docker ps
```

Verify that the expected application containers are running.

Typical services include:

- React Frontend
- FastAPI Backend

---

## View All Containers

Display both active and stopped containers.

```bash
docker ps -a
```

This command is useful for identifying failed or exited containers.

---

## Restart Services

Restart all application services.

```bash
docker compose restart
```

Restart an individual service.

```bash
docker restart <container-name>
```

---

## Rebuild Application Containers

Rebuild container images after application changes.

```bash
docker compose up --build -d
```

---

## Stop Services

Gracefully stop all running containers.

```bash
docker compose down
```

Remove associated volumes if required.

```bash
docker compose down -v
```

---

## Resource Cleanup

Remove stopped containers.

```bash
docker container prune
```

Remove unused images.

```bash
docker image prune
```

Remove unused Docker resources.

```bash
docker system prune
```

> **Note:** Review the resources that will be removed before confirming the operation.

---

# ❤️ Container Health Monitoring

Routine container monitoring helps identify application failures before they impact users.

---

## Inspect Container Details

```bash
docker inspect <container-name>
```

Review:

- Current state
- Restart count
- Mounted volumes
- Network configuration
- Environment variables

---

## Monitor Resource Usage

Display real-time resource consumption.

```bash
docker stats
```

Monitor:

- CPU utilization
- Memory utilization
- Network traffic
- Block I/O

Unexpected increases may indicate application or infrastructure issues.

---

## Container Health Checklist

Healthy containers should:

- Remain in the **Running** state.
- Restart only when expected.
- Consume stable CPU and memory resources.
- Produce consistent application logs.
- Respond successfully to health checks.

---

# 🌐 Application Operations

Routine application management ensures that both frontend and backend services remain operational.

---

## Verify Frontend

Confirm that:

- Application loads successfully.
- Static assets are served correctly.
- Browser console contains no critical errors.
- User interface functions as expected.

---

## Verify Backend

Confirm that:

- REST API endpoints respond successfully.
- Health endpoints return expected responses.
- Application logs contain no runtime exceptions.
- Database connectivity is operational.

---

## Verify End-to-End Communication

Perform a functional validation.

Confirm that:

- Frontend requests reach the backend.
- Backend processes requests successfully.
- Responses are returned correctly.
- User interface updates dynamically.

---

# 📄 Log Management

Application logs provide the primary source of operational information during troubleshooting.

---

## View Application Logs

Display logs for all services.

```bash
docker compose logs
```

---

## Follow Live Logs

Monitor logs in real time.

```bash
docker compose logs -f
```

---

## View Backend Logs

```bash
docker logs backend
```

---

## View Frontend Logs

```bash
docker logs frontend
```

---

## View Recent Logs

Display the most recent log entries.

```bash
docker logs --tail 100 backend
```

---

## Log Review Checklist

Review logs after every deployment.

Check for:

- Runtime exceptions
- Failed API requests
- Network errors
- Database connectivity issues
- Unexpected warnings

Operational issues should be investigated before proceeding with additional deployments.

---

# ☁️ Infrastructure Operations

Infrastructure resources should be reviewed regularly to ensure that the production environment remains stable and available.

---

## Amazon EC2

Verify:

- Instance status
- CPU utilization
- Memory usage
- Disk usage
- Network connectivity

Useful commands:

```bash
uptime
```

```bash
free -h
```

```bash
df -h
```

```bash
top
```

---

## Application Load Balancer

Verify:

- Target group health
- Listener configuration
- Application availability
- Traffic distribution

Investigate any unhealthy targets before performing deployments.

---

## Amazon RDS

Verify:

- Database availability
- Connection status
- Storage utilization
- Backup status

Ensure that application services maintain stable database connectivity.

---

# 📊 Monitoring Operations

Amazon CloudWatch provides centralized monitoring for infrastructure and application resources.

Routine monitoring should include both metrics and logs.

---

## Infrastructure Monitoring

Review:

- CPU utilization
- Memory utilization (where available)
- Disk utilization
- Network throughput

Identify abnormal resource consumption before it impacts application performance.

---

## Application Monitoring

Review:

- Application logs
- Error events
- Service availability
- Response times

Investigate recurring warnings or repeated failures.

---

## Operational Dashboard Review

During routine operational checks, verify:

- Infrastructure health
- Container status
- Deployment status
- Application availability
- System metrics

CloudWatch should be reviewed regularly to detect operational issues before they become service-impacting incidents.

# 🏗️ Terraform Operations

Terraform is responsible for provisioning and managing the AWS infrastructure that hosts the Enterprise Employee Management System.

Infrastructure changes should always be performed through Terraform to maintain consistency, version control, and reproducibility.

---

## Initialize Terraform

Navigate to the Terraform directory.

```bash
cd platform/terraform
```

Initialize the Terraform working directory.

```bash
terraform init
```

---

## Validate Configuration

Validate the Terraform configuration before making any infrastructure changes.

```bash
terraform validate
```

Correct any reported errors before proceeding.

---

## Review Planned Changes

Generate an execution plan.

```bash
terraform plan
```

Review all proposed infrastructure changes carefully.

Confirm that:

- Resources being created are expected.
- Existing resources are not unintentionally modified.
- No unexpected resource deletions are planned.

---

## Apply Infrastructure Changes

Provision or update infrastructure.

```bash
terraform apply
```

Infrastructure modifications should be performed during approved maintenance windows whenever possible.

---

## Review Infrastructure State

Display deployed resources.

```bash
terraform state list
```

Inspect Terraform outputs.

```bash
terraform output
```

---

## Terraform Operational Checklist

Verify:

- Infrastructure provisioning completed successfully.
- No failed resources exist.
- Outputs are correct.
- Remote state (if configured) is accessible.
- AWS resources match the Terraform configuration.

---

# ⚙️ Ansible Operations

Ansible standardizes server configuration and application deployment across managed infrastructure.

Configuration changes should be implemented through Ansible playbooks and roles rather than manual server modifications.

---

## Verify Connectivity

Confirm connectivity to managed hosts.

```bash
ansible all -m ping
```

Successful responses indicate that SSH access and inventory configuration are functioning correctly.

---

## Execute Playbooks

Run the primary deployment playbook.

```bash
ansible-playbook playbooks/site.yml
```

Individual playbooks may also be executed for targeted operational tasks.

---

## Review Playbook Results

Verify that:

- All tasks completed successfully.
- No hosts failed.
- No unreachable hosts exist.
- Configuration changes were applied correctly.

---

## Operational Validation

Confirm that:

- Docker is installed.
- Application services are running.
- Nginx configuration is active.
- CloudWatch Agent is operational.
- Application containers are healthy.

---

# 🚀 Jenkins Operations

Jenkins automates application build, testing, image publishing, and deployment.

Routine operational activities include monitoring pipeline execution and maintaining build infrastructure.

---

## Review Pipeline Status

Confirm that:

- Latest build completed successfully.
- No failed stages exist.
- Build duration remains within expected limits.
- Console output contains no unexpected errors.

---

## Trigger Manual Build

If required, manually trigger a new pipeline execution through the Jenkins dashboard.

Typical reasons include:

- Infrastructure updates
- Application fixes
- Deployment retries
- Configuration changes

---

## Review Build History

Review:

- Recent deployments
- Failed builds
- Pipeline trends
- Execution duration

Investigate repeated failures before approving further deployments.

---

## Jenkins Maintenance

Perform routine maintenance by:

- Updating plugins
- Removing obsolete jobs
- Cleaning workspaces
- Reviewing executor availability
- Backing up Jenkins configuration

---

# 📦 Amazon Elastic Container Registry (ECR) Operations

Amazon ECR stores versioned container images used during application deployment.

Operational tasks focus on verifying image availability and maintaining repository consistency.

---

## Authenticate with Amazon ECR

```bash
aws ecr get-login-password \
| docker login \
--username AWS \
--password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

---

## List Repositories

```bash
aws ecr describe-repositories
```

---

## List Repository Images

```bash
aws ecr list-images \
--repository-name <repository-name>
```

---

## Verify Latest Images

Confirm that:

- Latest frontend image exists.
- Latest backend image exists.
- Image tags are correct.
- Images were pushed successfully during the most recent pipeline execution.

---

# 🚀 Deployment Operations

Application deployment should follow a standardized workflow to ensure consistency across releases.

---

## Deployment Workflow

```text
Source Code Update
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
Terraform (Infrastructure Updates)
        │
        ▼
Ansible (Configuration)
        │
        ▼
Application Deployment
        │
        ▼
Health Verification
        │
        ▼
Production Environment
```

---

## Deployment Validation

After deployment, verify the following.

### Infrastructure

- AWS resources are operational.
- Application Load Balancer is healthy.
- Amazon EC2 instances are available.
- Amazon RDS is accessible.

---

### Containers

- All required containers are running.
- No restart loops are observed.
- Container health checks pass successfully.

---

### Application

- Frontend is accessible.
- Backend APIs respond correctly.
- Database connectivity is verified.
- End-to-end functionality is operational.

---

### Monitoring

Verify CloudWatch for:

- Infrastructure metrics
- Application logs
- Warning events
- Error events

---

## Post-Deployment Checklist

Complete the following before closing a deployment.

- Verify Jenkins pipeline completion.
- Confirm latest images are stored in Amazon ECR.
- Validate infrastructure health.
- Confirm application availability.
- Review application logs.
- Review CloudWatch metrics.
- Record deployment results if required.

Only consider the deployment successful after all validation checks have been completed successfully.

# 📅 Maintenance Schedule

Routine maintenance ensures that the Enterprise Employee Management System remains secure, reliable, and operational.

The following schedule provides recommended maintenance activities based on operational frequency.

---

## Daily Maintenance

Perform the following tasks each day.

### Application

- Verify frontend availability.
- Verify backend API availability.
- Confirm successful end-to-end communication.
- Review application health status.

---

### Infrastructure

- Verify Amazon EC2 instance health.
- Confirm Application Load Balancer status.
- Verify Amazon RDS availability.
- Review infrastructure metrics in Amazon CloudWatch.

---

### Containers

- Verify all containers are running.
- Review Docker logs.
- Check for unexpected container restarts.
- Monitor CPU and memory utilization.

---

### CI/CD

- Review the latest Jenkins pipeline execution.
- Verify successful deployments.
- Confirm the latest container images are available in Amazon ECR.

---

## Weekly Maintenance

Perform the following activities every week.

### Docker Maintenance

Remove unused Docker resources.

```bash
docker container prune

docker image prune

docker system prune
```

Review Docker storage usage.

```bash
docker system df
```

---

### Infrastructure Review

Review:

- EC2 resource utilization
- Security Group configuration
- Application Load Balancer health
- Amazon RDS storage utilization
- CloudWatch metrics

---

### Jenkins Maintenance

- Review failed pipeline executions.
- Clean unused workspaces.
- Verify plugin updates.
- Review build history.
- Confirm credential validity.

---

### Documentation Review

Verify that:

- Operational documentation matches the implementation.
- Deployment procedures remain accurate.
- Infrastructure changes are documented.
- Recovery procedures remain current.

---

## Monthly Maintenance

Perform a comprehensive platform review.

### Operating System

Update system packages.

Example (Amazon Linux):

```bash
sudo dnf update -y
```

---

### Docker

Review:

- Docker Engine version
- Docker Compose version
- Container images
- Storage utilization

---

### AWS Infrastructure

Review:

- IAM permissions
- Security Groups
- VPC configuration
- Amazon RDS maintenance events
- Application Load Balancer configuration

---

### Platform Review

Perform a complete review of:

- Infrastructure health
- Deployment workflow
- Monitoring configuration
- Documentation accuracy
- Operational procedures

---

# 🔐 Operational Security

Operational security should be incorporated into routine maintenance activities.

---

## Identity and Access Management

Regularly verify:

- IAM users
- IAM roles
- Least-privilege permissions
- Unused credentials

Remove unnecessary access wherever possible.

---

## Credential Management

Ensure that:

- Credentials are stored securely.
- Jenkins Credentials Store is used for sensitive information.
- Secrets are never committed to source control.
- Credentials are rotated periodically.

---

## Infrastructure Security

Review:

- Security Group rules
- SSH access
- Network exposure
- EC2 instance security

Investigate unexpected configuration changes immediately.

---

## Container Security

Review:

- Base image versions
- Running containers
- Container privileges
- Docker daemon configuration

Use trusted container images and remove obsolete images regularly.

---

## Monitoring Security Events

Review Amazon CloudWatch for:

- Authentication failures
- Infrastructure warnings
- Service failures
- Unexpected application errors

Investigate recurring security-related events promptly.

---

# ⭐ Operational Best Practices

The following practices help maintain a stable, reliable, and maintainable production environment.

---

## Infrastructure Management

- Manage AWS infrastructure through Terraform.
- Avoid manual infrastructure changes.
- Review Terraform execution plans before applying changes.
- Keep infrastructure configuration under version control.

---

## Configuration Management

- Manage server configuration using Ansible.
- Keep playbooks idempotent.
- Reuse roles wherever possible.
- Validate playbook execution after configuration changes.

---

## Application Deployment

- Deploy through the Jenkins pipeline.
- Validate deployments before release.
- Review application logs after deployment.
- Confirm application health before completing deployment.

---

## Monitoring

- Monitor infrastructure continuously.
- Review CloudWatch metrics regularly.
- Investigate recurring warnings.
- Respond promptly to operational alerts.

---

## Documentation

Maintain documentation as part of the operational process.

Whenever infrastructure, deployment procedures, or operational workflows change:

- Update the relevant documentation.
- Record architectural changes.
- Review operational procedures.
- Keep recovery documentation current.

---

# 📚 Related Documentation

The following documents provide additional technical and operational information.

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and quick start |
| `architecture.md` | System architecture and design |
| `setup-guide.md` | Environment setup and deployment |
| `runbook.md` | Incident response and recovery procedures |
| `SECURITY.md` | Security architecture and operational controls |

---

# 📝 Conclusion

The Enterprise Employee Management System is operated using standardized procedures that integrate infrastructure management, container operations, deployment automation, monitoring, and security into a unified operational workflow.

Routine operational activities—including infrastructure provisioning through Terraform, configuration management with Ansible, automated deployments via Jenkins, container lifecycle management using Docker, and monitoring through Amazon CloudWatch—help ensure that the platform remains reliable, maintainable, and consistent across environments.

By following the operational practices described in this guide, engineers can confidently manage application deployments, maintain infrastructure health, monitor system performance, and support the long-term stability of the platform while adhering to modern DevOps engineering practices.
