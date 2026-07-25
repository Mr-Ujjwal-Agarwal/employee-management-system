# 🚑 Operations Runbook

> **Document Version:** 2.0  
> **Project:** Enterprise Employee Management System  
> **Audience:** DevOps Engineers, Platform Engineers, System Administrators, Contributors  
> **Prerequisites:** Successful application deployment and access to the production environment  
> **Status:** Production Portfolio Project  
> **Last Updated:** July 2026

---

# 📖 Purpose

This runbook provides standardized incident response and recovery procedures for the Enterprise Employee Management System (EMS).

Its purpose is to help engineers respond consistently to operational incidents by providing structured recovery workflows, validation procedures, escalation guidelines, and post-incident activities.

Unlike the Operations Guide, which focuses on routine platform management, this document is intended to be used during service disruptions, deployment failures, infrastructure incidents, and production outages.

---

# 🎯 Objectives

This runbook is designed to:

- Minimize service downtime.
- Standardize incident response.
- Reduce recovery time.
- Maintain deployment consistency.
- Protect infrastructure stability.
- Improve operational reliability.
- Support repeatable recovery procedures.
- Document validated recovery workflows.
- Promote continuous operational improvement.

---

# 🌍 Incident Management Overview

The Enterprise Employee Management System operates on multiple interconnected platform components.

A failure within one component may affect other services across the deployment pipeline. Therefore, incidents should be investigated methodically before corrective actions are performed.

The primary operational components include:

- React Frontend
- FastAPI Backend
- Docker
- Docker Compose
- Jenkins
- Amazon Elastic Container Registry (ECR)
- Terraform
- Ansible
- Amazon EC2
- Application Load Balancer
- Amazon RDS
- Amazon CloudWatch

This runbook provides recovery procedures for each of these components.

---

# 🏗️ Incident Response Architecture

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
Docker Image Build
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

# 🚨 Incident Severity Levels

Operational incidents should be classified according to their impact on platform availability.

| Severity | Description | Example |
|-----------|-------------|---------|
| Critical | Complete service outage affecting all users | Application unavailable, infrastructure failure |
| High | Major functionality unavailable | Backend API failure, database outage |
| Medium | Partial service degradation | Jenkins pipeline failure, deployment issues |
| Low | Minor operational issue with limited impact | Log warnings, resource cleanup, monitoring alerts |

Incident priority should always be determined before beginning recovery activities.

---

# 📞 Initial Incident Response

Before attempting recovery, complete the following initial assessment.

### Step 1 — Identify the Incident

Determine:

- Which service is affected.
- When the issue began.
- Whether the incident is ongoing.
- Which users or systems are impacted.

---

### Step 2 — Determine the Scope

Identify whether the issue affects:

- Frontend
- Backend
- Infrastructure
- Database
- Deployment pipeline
- Monitoring
- Multiple platform components

Understanding the scope helps prevent unnecessary recovery actions.

---

### Step 3 — Review Recent Changes

Determine whether any recent changes may have contributed to the incident.

Review:

- Recent deployments
- Infrastructure changes
- Terraform executions
- Ansible playbook runs
- Jenkins pipeline history
- Configuration updates

---

### Step 4 — Collect Diagnostic Information

Before restarting services or modifying infrastructure, collect diagnostic information.

Useful sources include:

- Docker logs
- Jenkins build logs
- Amazon CloudWatch logs
- System logs
- Terraform output
- Ansible execution logs

Capturing evidence before recovery assists with root cause analysis.

---

### Step 5 — Avoid Multiple Simultaneous Changes

During incident response:

- Modify one component at a time.
- Validate each recovery step.
- Record all corrective actions.
- Avoid introducing additional variables during troubleshooting.

---

# 📢 Incident Communication

For significant incidents, maintain clear communication throughout the recovery process.

Record:

- Incident start time.
- Affected services.
- Recovery actions performed.
- Validation results.
- Resolution time.
- Root cause (if identified).

Maintaining an incident timeline simplifies post-incident reviews and helps identify opportunities for operational improvement.

---

# 🔍 Initial Validation Checklist

Before beginning recovery procedures, verify the current platform state.

| Component | Validation |
|-----------|------------|
| Frontend | Application accessibility |
| Backend | API availability |
| Docker | Container status |
| Jenkins | Pipeline status |
| Amazon ECR | Image availability |
| Terraform | Infrastructure state |
| Ansible | Configuration status |
| Amazon EC2 | Instance health |
| Application Load Balancer | Target health |
| Amazon RDS | Database connectivity |
| Amazon CloudWatch | Metrics and logs |

This initial assessment provides the baseline for selecting the appropriate recovery procedure.

# 🌐 Frontend Service Recovery

Recover the frontend service when the user interface becomes unavailable or behaves unexpectedly.

---

## Common Symptoms

- Website is inaccessible.
- Blank or partially rendered page.
- HTTP 4xx or 5xx responses.
- Static assets fail to load.
- Frontend container is unavailable.

---

## Investigation

Verify that the frontend container is running.

```bash
docker ps
```

Review frontend logs.

```bash
docker logs frontend
```

Inspect the container configuration.

```bash
docker inspect frontend
```

Verify that the frontend can communicate with the backend and that the Application Load Balancer is routing traffic correctly.

---

## Recovery Procedure

Restart the frontend service.

```bash
docker compose restart frontend
```

If the issue persists, rebuild and redeploy the frontend container.

```bash
docker compose up --build -d frontend
```

If deployment was recently performed, verify that the latest image has been pulled successfully from Amazon ECR.

---

## Validation

Confirm that:

- Frontend application loads successfully.
- Static assets are served correctly.
- Browser console contains no critical errors.
- Backend API requests complete successfully.
- Application Load Balancer routes traffic normally.

---

# ⚙️ Backend Service Recovery

Recover the backend service when API requests fail or application functionality is unavailable.

---

## Common Symptoms

- REST API unavailable.
- HTTP 500 responses.
- Database connection failures.
- Backend container exits unexpectedly.
- Application errors appear in logs.

---

## Investigation

Review backend logs.

```bash
docker logs backend
```

Inspect the backend container.

```bash
docker inspect backend
```

Verify running services.

```bash
docker ps
```

If database-related errors are present, verify Amazon RDS connectivity before restarting the application.

---

## Recovery Procedure

Restart the backend service.

```bash
docker compose restart backend
```

If necessary, rebuild the backend container.

```bash
docker compose up --build -d backend
```

If configuration changes were recently applied, confirm that the Ansible deployment completed successfully.

---

## Validation

Verify that:

- Backend container is running.
- REST API responds successfully.
- Database connectivity is restored.
- Frontend communicates successfully with the backend.
- No recurring application errors appear in logs.

---

# 🐳 Docker Container Recovery

Recover individual containers experiencing failures or instability.

---

## Common Symptoms

- Container exited unexpectedly.
- Continuous restart loop.
- Image pull failure.
- Container becomes unresponsive.
- Health checks fail.

---

## Investigation

List all containers.

```bash
docker ps -a
```

Review container logs.

```bash
docker logs <container-name>
```

Inspect the container.

```bash
docker inspect <container-name>
```

Check resource utilization.

```bash
docker stats
```

Determine whether the issue is application-related or infrastructure-related before restarting the container.

---

## Recovery Procedure

Restart the affected container.

```bash
docker restart <container-name>
```

If the issue persists, recreate all services.

```bash
docker compose down
```

```bash
docker compose up -d
```

If image corruption is suspected, rebuild the affected service.

```bash
docker compose up --build -d
```

---

## Validation

Confirm that:

- Container remains in the **Running** state.
- No restart loop occurs.
- Health checks pass successfully.
- Application logs contain no critical errors.
- Service responds normally.

---

# 🔧 Docker Service Recovery

Recover the Docker Engine when containers cannot be managed or started.

---

## Common Symptoms

- Docker commands fail.
- Containers cannot be started.
- Docker daemon unavailable.
- Docker Compose commands fail.
- Docker service unexpectedly stops.

---

## Investigation

Check Docker service status.

```bash
systemctl status docker
```

Review Docker daemon logs.

```bash
journalctl -u docker
```

Verify Docker version.

```bash
docker version
```

Verify available disk space.

```bash
df -h
```

Insufficient storage or daemon failures should be resolved before restarting containers.

---

## Recovery Procedure

Restart the Docker service.

```bash
sudo systemctl restart docker
```

Verify that Docker is operational.

```bash
docker ps
```

Restart application services.

```bash
docker compose up -d
```

If Docker continues to fail, investigate daemon configuration, system resources, and operating system logs before proceeding.

---

## Validation

Confirm that:

- Docker service is active.
- Docker daemon responds normally.
- Application containers start successfully.
- Docker Compose executes without errors.
- Application becomes accessible.

---

# 🔍 Service Recovery Checklist

After recovering any application or Docker-related service, complete the following validation steps.

| Component | Validation |
|-----------|------------|
| Frontend | Application accessible |
| Backend | REST API responding |
| Docker Containers | Running without restart loops |
| Docker Engine | Service active |
| Application Load Balancer | Healthy targets |
| Amazon RDS | Database connectivity verified |
| CloudWatch | No recurring errors or warnings |

Recovery should only be considered complete after all validation checks have been successfully performed.

# 🏗️ Terraform Recovery

Terraform manages the AWS infrastructure for the Enterprise Employee Management System. Infrastructure-related incidents should be resolved through Terraform rather than manual changes whenever possible.

---

## Common Symptoms

- Infrastructure provisioning fails.
- Terraform apply terminates unexpectedly.
- Infrastructure drift detected.
- Required AWS resources are missing.
- State file inconsistencies.

---

## Investigation

Initialize the Terraform working directory.

```bash
terraform init
```

Validate the configuration.

```bash
terraform validate
```

Review the execution plan.

```bash
terraform plan
```

Inspect the current state.

```bash
terraform state list
```

Review Terraform outputs.

```bash
terraform output
```

Determine whether the issue is caused by configuration errors, AWS resource conflicts, or state inconsistencies.

---

## Recovery Procedure

Correct configuration errors if identified.

Generate a new execution plan.

```bash
terraform plan
```

Apply the required infrastructure changes.

```bash
terraform apply
```

Avoid modifying AWS resources manually unless absolutely necessary.

---

## Validation

Verify that:

- Terraform completes successfully.
- Infrastructure resources are available.
- Outputs are correct.
- AWS resources match the Terraform configuration.
- Application services remain accessible.

---

# ⚙️ Ansible Recovery

Ansible automates server configuration and application deployment. Recovery focuses on restoring configuration consistency across managed hosts.

---

## Common Symptoms

- Playbook execution fails.
- SSH connection errors.
- Configuration drift.
- Deployment incomplete.
- Services not configured correctly.

---

## Investigation

Verify connectivity.

```bash
ansible all -m ping
```

Review the inventory configuration.

Execute the deployment playbook in check mode if appropriate.

Review previous playbook execution logs for failed tasks.

---

## Recovery Procedure

Run the deployment playbook.

```bash
ansible-playbook playbooks/site.yml
```

Resolve any failed tasks before re-running the playbook.

If inventory or credentials have changed, update them before retrying.

---

## Validation

Confirm that:

- Playbook completes successfully.
- All managed hosts are reachable.
- Required services are configured.
- Application containers are running.
- Configuration matches the intended state.

---

# 🚀 Jenkins Pipeline Recovery

Jenkins automates application build, testing, image publishing, and deployment.

---

## Common Symptoms

- Pipeline fails.
- Build errors.
- Deployment stage fails.
- Source checkout errors.
- Image build failures.

---

## Investigation

Review:

- Pipeline console output.
- Build history.
- Jenkins system logs.
- Workspace status.
- Credentials configuration.
- Docker availability.
- Git repository access.

Identify the failed pipeline stage before attempting recovery.

---

## Recovery Procedure

Correct the underlying issue.

Examples include:

- Fix application build errors.
- Restore repository connectivity.
- Update invalid credentials.
- Resolve Docker build failures.
- Correct pipeline configuration.

Trigger a new pipeline execution after resolving the issue.

---

## Validation

Verify that:

- Pipeline completes successfully.
- Docker images are created.
- Images are pushed to Amazon ECR.
- Deployment stages complete successfully.
- Application is operational.

---

# 📦 Amazon Elastic Container Registry (ECR) Recovery

Amazon ECR stores versioned container images used during deployment.

---

## Common Symptoms

- Docker push fails.
- Authentication errors.
- Image not found.
- Deployment pulls incorrect image.
- Repository unavailable.

---

## Investigation

Verify AWS CLI configuration.

```bash
aws configure list
```

Authenticate with Amazon ECR.

```bash
aws ecr get-login-password \
| docker login \
--username AWS \
--password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

Verify repository availability.

```bash
aws ecr describe-repositories
```

List repository images.

```bash
aws ecr list-images \
--repository-name <repository-name>
```

---

## Recovery Procedure

Reauthenticate with Amazon ECR.

Push the latest application images.

Verify successful image upload before beginning deployment.

---

## Validation

Confirm that:

- Repository is accessible.
- Latest images exist.
- Image tags are correct.
- Deployment can successfully pull images.

---

# ☁️ AWS Infrastructure Recovery

Infrastructure recovery focuses on restoring compute, networking, and database availability.

---

## Amazon EC2 Recovery

### Investigation

Review system status.

```bash
uptime
```

Memory utilization.

```bash
free -h
```

Disk utilization.

```bash
df -h
```

Running processes.

```bash
top
```

Docker service.

```bash
systemctl status docker
```

---

### Recovery

Restart Docker if required.

```bash
sudo systemctl restart docker
```

Restart application services.

```bash
docker compose up -d
```

---

### Validation

Verify:

- EC2 instance is reachable.
- Docker service is active.
- Containers are healthy.
- Application is accessible.

---

## Application Load Balancer Recovery

### Investigation

Verify:

- Listener configuration.
- Target group health.
- Registered targets.
- Application availability.

---

### Recovery

Restore unhealthy application targets.

Verify backend services.

Ensure application containers are responding to health checks.

---

### Validation

Confirm that:

- All targets are healthy.
- Traffic is routed correctly.
- Application is accessible through the load balancer.

---

## Amazon RDS Recovery

### Investigation

Verify:

- Database instance availability.
- Database connectivity.
- Storage utilization.
- Maintenance events.

Review application logs for database connection failures.

---

### Recovery

Restore database connectivity.

Correct application configuration if necessary.

Restart backend services after connectivity is restored.

---

### Validation

Verify:

- Database accepts connections.
- Backend APIs function normally.
- Application data is accessible.

---

# 📊 CloudWatch Monitoring Recovery

CloudWatch provides centralized operational visibility across the platform.

---

## Common Symptoms

- Missing logs.
- Missing metrics.
- Monitoring dashboards not updating.
- Alert notifications not received.

---

## Investigation

Verify:

- CloudWatch Agent status (if configured).
- Log group availability.
- Metric collection.
- Alarm configuration.

Determine whether the issue is related to the application, infrastructure, or monitoring configuration.

---

## Recovery Procedure

Restart monitoring components if required.

Verify CloudWatch configuration.

Restore log and metric collection.

Confirm that application services are generating operational data.

---

## Validation

Verify that:

- Metrics are updating.
- Logs are visible.
- Alerts function correctly.
- Monitoring dashboards display current operational data.

---

# 📋 Infrastructure Recovery Checklist

After recovering infrastructure services, verify the following.

| Component | Validation |
|-----------|------------|
| Terraform | Infrastructure state consistent |
| Ansible | Configuration successfully applied |
| Jenkins | Pipeline completed successfully |
| Amazon ECR | Latest images available |
| Amazon EC2 | Instance healthy |
| Application Load Balancer | Healthy targets |
| Amazon RDS | Database connectivity restored |
| CloudWatch | Metrics and logs available |

Infrastructure recovery should only be considered complete after all validation checks have been successfully performed.

# 🚀 Complete Deployment Recovery

Use this recovery procedure when multiple platform components fail or a deployment leaves the application in an inconsistent state.

This process restores the application to a known operational state using the standard deployment workflow.

---

## Step 1 — Assess the Environment

Before making changes, verify:

- Infrastructure availability
- Amazon EC2 instance health
- Application Load Balancer status
- Amazon RDS connectivity
- Docker service status
- Jenkins pipeline status

Collect relevant logs before proceeding.

---

## Step 2 — Stop Running Services

Gracefully stop all application services.

```bash
docker compose down
```

Confirm that containers have stopped successfully.

```bash
docker ps -a
```

---

## Step 3 — Retrieve the Latest Application Version

Update the local repository.

```bash
git pull origin main
```

If the deployment is performed through Jenkins, verify that the latest successful build is available.

---

## Step 4 — Verify Infrastructure

If infrastructure changes were recently introduced, review the Terraform configuration.

```bash
terraform plan
```

Apply infrastructure changes only if required.

```bash
terraform apply
```

---

## Step 5 — Apply Configuration

Apply server configuration using Ansible.

```bash
ansible-playbook playbooks/site.yml
```

Verify successful execution before continuing.

---

## Step 6 — Deploy Application Services

Deploy the application.

```bash
docker compose up --build -d
```

Wait until all containers reach a healthy state.

---

## Step 7 — Validate the Deployment

Verify:

- Frontend accessibility.
- Backend API availability.
- Database connectivity.
- Application Load Balancer health.
- CloudWatch metrics and logs.
- Docker container health.

Deployment recovery is complete only after all validation checks have passed.

---

# 🔄 Deployment Rollback Procedure

Rollback should be considered when a deployment introduces critical issues that cannot be resolved quickly.

---

## Rollback Conditions

Initiate a rollback if:

- Application becomes unavailable.
- Critical API failures occur.
- Containers repeatedly fail.
- Deployment validation fails.
- Database connectivity cannot be restored.
- Production stability is affected.

---

## Rollback Workflow

```text
Deployment Failure
        │
        ▼
Incident Assessment
        │
        ▼
Stop Current Deployment
        │
        ▼
Restore Previous Stable Version
        │
        ▼
Deploy Previous Containers
        │
        ▼
Validate Platform Health
        │
        ▼
Resume Normal Operations
```

---

## Rollback Procedure

Stop the current deployment.

```bash
docker compose down
```

Deploy the previously validated application version.

If using Amazon ECR, ensure that the correct image tag is selected.

Restart the application.

```bash
docker compose up -d
```

Verify that the restored version is functioning correctly before closing the incident.

---

# ✅ Post-Recovery Validation Checklist

Complete the following validation after every recovery activity.

| Component | Validation |
|-----------|------------|
| Frontend | Accessible through browser |
| Backend | REST API responding successfully |
| Docker | Containers healthy |
| Terraform | Infrastructure consistent |
| Ansible | Configuration successfully applied |
| Jenkins | Pipeline operational |
| Amazon ECR | Correct images available |
| Amazon EC2 | Instance healthy |
| Application Load Balancer | Healthy targets |
| Amazon RDS | Database connectivity restored |
| Amazon CloudWatch | Metrics and logs updating |

Recovery activities should not be considered complete until all applicable validation checks have passed.

---

# 📞 Escalation Guidelines

Escalate an incident whenever recovery procedures cannot restore normal platform operation.

Escalation should occur when:

- Multiple platform services fail simultaneously.
- Infrastructure provisioning repeatedly fails.
- Root cause cannot be identified.
- Jenkins deployments continue to fail.
- Terraform cannot restore infrastructure.
- Ansible configuration repeatedly fails.
- Application Load Balancer remains unhealthy.
- Amazon RDS becomes unavailable.
- Security incidents are suspected.
- Data integrity may be affected.

Document all investigation and recovery activities before escalation.

---

# 📝 Post-Incident Review

Every resolved incident should be followed by a structured review.

Record:

- Incident summary
- Root cause
- Affected services
- Recovery actions performed
- Validation results
- Total recovery time
- Preventive recommendations

The objective of the review is to reduce the likelihood of similar incidents in the future.

---

# ⭐ Incident Response Best Practices

Follow these operational practices during every incident.

---

## Investigation

- Collect logs before restarting services.
- Confirm the scope of the incident.
- Review recent infrastructure and deployment changes.
- Validate assumptions with available evidence.

---

## Recovery

- Modify one platform component at a time.
- Validate each recovery action before proceeding.
- Avoid unnecessary infrastructure changes.
- Follow documented recovery procedures whenever possible.

---

## Communication

- Maintain an accurate incident timeline.
- Record recovery activities.
- Document validation results.
- Share significant operational findings with the engineering team.

---

## Continuous Improvement

Following every incident:

- Update documentation if procedures change.
- Improve deployment processes where appropriate.
- Refine monitoring and alerting.
- Eliminate recurring operational issues.

---

# 📚 Related Documentation

The following documents complement this runbook.

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and quick start |
| `architecture.md` | System architecture and design |
| `setup-guide.md` | Environment setup and deployment |
| `operations-guide.md` | Routine platform operations |
| `SECURITY.md` | Security architecture and operational controls |

---

# 📝 Conclusion

This runbook provides standardized incident response and recovery procedures for the Enterprise Employee Management System across the complete application and infrastructure stack.

By following the documented workflows for application recovery, infrastructure restoration, deployment validation, rollback, and post-incident review, engineers can respond consistently to operational incidents while minimizing service disruption and maintaining platform reliability.

Together with the Architecture Guide, Setup Guide, Operations Guide, and Security documentation, this runbook forms a comprehensive operational reference that supports the long-term stability, maintainability, and resilience of the platform.
