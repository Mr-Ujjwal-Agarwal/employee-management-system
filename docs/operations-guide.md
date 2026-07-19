# 🛠️ Operations Guide

> **Document Version:** Phase 3 – Enterprise CI/CD  
> **Project:** Enterprise Employee Management System  
> **Audience:** DevOps Engineers, System Administrators, Contributors  
> **Prerequisites:** Successful project deployment using the Setup Guide  
> **Last Updated:** July 2026

---

# 1. Overview

This document describes the day-to-day operational procedures for managing the **Enterprise Employee Management System (EMS)** after deployment.

It serves as the primary operational handbook for developers and DevOps engineers responsible for maintaining the application, monitoring its health, deploying updates, and performing routine maintenance.

This guide covers:

- Application lifecycle management
- Docker container operations
- Jenkins operational procedures
- Amazon ECR image management
- AWS EC2 administration
- Log monitoring
- Deployment validation
- Security operations
- Routine maintenance

> **Note:** This guide focuses on operating the application after deployment. For installation instructions, refer to the **Setup Guide**.

---

# 2. Operational Architecture

The production workflow is illustrated below.

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
Docker Image Build
      │
      ▼
Amazon ECR
      │
      ▼
AWS EC2 Instance
      │
      ▼
Docker Compose
      │
      ▼
Frontend + Backend Containers
```

---

# 3. Operational Responsibilities

| Component | Responsibility |
|------------|---------------|
| GitHub | Source code management |
| Jenkins | CI/CD pipeline execution |
| Docker | Container lifecycle management |
| Amazon ECR | Docker image storage |
| AWS EC2 | Application hosting |
| Docker Compose | Multi-container orchestration |
| Linux | Operating system administration |

---

# 4. Daily Operational Checklist

Perform the following checks before starting operational activities.

## Application

- Verify frontend is accessible.
- Verify backend API is responding.
- Confirm API communication is functioning correctly.

---

## Containers

- Verify all containers are running.
- Ensure no containers are restarting continuously.
- Review container health status.

---

## Jenkins

- Verify the latest pipeline completed successfully.
- Review failed builds.
- Check build logs if necessary.

---

## Amazon ECR

- Confirm the latest Docker images are available.
- Verify successful image pushes.

---

## AWS EC2

- Verify instance status.
- Check available disk space.
- Monitor CPU and memory usage.
- Confirm Docker service is running.

---

# 5. Docker Operations

## Start Services

```bash
docker compose up -d
```

---

## Stop Services

```bash
docker compose down
```

---

## Restart Services

```bash
docker compose restart
```

---

## Rebuild Services

```bash
docker compose up -d --build
```

---

## View Running Containers

```bash
docker ps
```

---

## View All Containers

```bash
docker ps -a
```

---

## Remove Stopped Containers

```bash
docker container prune
```

---

## Remove Unused Images

```bash
docker image prune
```

---

## Remove All Unused Docker Resources

```bash
docker system prune
```

> **Warning:** This command removes unused containers, networks, images, and build cache.

---

# 6. Container Health Monitoring

Regularly verify container health.

View running containers.

```bash
docker ps
```

Inspect container details.

```bash
docker inspect <container-name>
```

Monitor live resource usage.

```bash
docker stats
```

Healthy containers should:

- Remain in the **Running** state.
- Restart only when expected.
- Consume stable system resources.
- Respond successfully to application requests.

---

# 7. Log Management

Application logs are the primary source for diagnosing runtime issues.

## View Logs

```bash
docker compose logs
```

---

## Follow Logs

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

## Display Recent Logs

```bash
docker logs --tail 100 backend
```

Review logs after every deployment to identify unexpected warnings or errors.

---

# 8. Jenkins Operations

The Jenkins server manages Continuous Integration and deployment automation.

Routine operational tasks include:

- Monitor pipeline executions.
- Trigger manual builds when required.
- Review build history.
- Inspect failed pipeline stages.
- Review console output.
- Manage credentials.
- Maintain build workspace.
- Backup Jenkins configuration.

Recommended maintenance:

- Update plugins periodically.
- Restart Jenkins after major configuration changes.
- Remove obsolete jobs.
- Review executor availability.

---

# 9. Amazon ECR Operations

Authenticate Docker with Amazon ECR.

```bash
aws configure
```

Authenticate Docker.

```bash
aws ecr get-login-password \
| docker login \
--username AWS \
--password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
```

List repositories.

```bash
aws ecr describe-repositories
```

List repository images.

```bash
aws ecr list-images \
--repository-name <repository-name>
```

Verify that the latest application images have been successfully pushed before deployment.

---

# 10. AWS EC2 Operations

Routine EC2 administration includes monitoring system resources and verifying service availability.

Useful commands:

Check uptime.

```bash
uptime
```

Memory usage.

```bash
free -h
```

Disk utilization.

```bash
df -h
```

CPU processes.

```bash
top
```

Docker service status.

```bash
systemctl status docker
```

Restart Docker service.

```bash
sudo systemctl restart docker
```

System logs.

```bash
journalctl -xe
```

Docker logs.

```bash
journalctl -u docker
```

---

# 11. Deployment Management

Whenever a new application version is released:

## Step 1

Retrieve the latest source code.

```bash
git pull origin main
```

---

## Step 2

Build updated Docker images.

```bash
docker compose build
```

---

## Step 3

Restart application services.

```bash
docker compose up -d
```

---

## Step 4

Verify running containers.

```bash
docker ps
```

---

## Step 5

Verify frontend and backend accessibility.

---

Deployment should be considered successful only after all verification checks pass.

---

# 12. Deployment Validation

After every deployment verify the following.

## Application

- Frontend loads successfully.
- Backend API responds correctly.
- API requests complete successfully.

---

## Containers

- All containers are running.
- No restart loops.
- No container failures.

---

## Jenkins

- Pipeline completed successfully.
- Images were built successfully.
- Deployment stage completed.

---

## Amazon ECR

- Latest images exist.
- Image tags are correct.

---

## AWS EC2

- Docker service is active.
- Application is reachable.
- No critical system errors.

---

# 13. Backup & Recovery Considerations

Although the current implementation focuses on application deployment, regular backup practices are recommended.

Recommended items to protect:

- Jenkins configuration
- Docker Compose configuration
- Environment files
- Deployment scripts
- Application source code
- Docker image versions

As the project evolves, automated backup procedures will be introduced.

---

# 14. Security Operations

Perform the following security checks regularly.

- Review Jenkins credentials.
- Protect AWS access keys.
- Rotate credentials periodically.
- Restrict Docker socket access.
- Verify EC2 Security Groups.
- Review SSH access.
- Remove unused accounts.
- Apply operating system security updates.

Follow the Principle of Least Privilege for all administrative access.

---

# 15. Routine Maintenance

## Daily

- Verify application availability.
- Review deployment status.
- Check Docker containers.
- Review logs.

---

## Weekly

- Remove unused Docker images.
- Remove stopped containers.
- Review disk usage.
- Verify Jenkins build history.
- Validate Docker storage.

---

## Monthly

- Update Docker.
- Update Jenkins plugins.
- Review system packages.
- Review AWS credentials.
- Audit documentation.
- Verify backup strategy.

---

# 16. Operational Best Practices

Follow these recommendations during routine operations.

- Verify deployments immediately after completion.
- Monitor logs after every release.
- Keep Docker images updated.
- Avoid manual production changes.
- Secure credentials appropriately.
- Clean unused Docker resources regularly.
- Monitor disk utilization.
- Maintain operational documentation.
- Validate changes before deployment.
- Keep rollback procedures documented.

---

# 17. Related Documentation

- README.md
- architecture.md
- setup-guide.md
- runbook.md
- roadmap.md
- troubleshooting.md

---

# 18. Conclusion

The Enterprise Employee Management System is operated through standardized operational procedures that emphasize consistency, reliability, and maintainability.

By following this guide, operators can confidently manage deployments, monitor application health, maintain Docker infrastructure, administer Jenkins pipelines, and ensure the overall stability of the application environment.

As future project phases introduce Terraform, Ansible, Kubernetes, GitOps, Monitoring, and DevSecOps, this guide will evolve to include additional operational workflows while preserving the same operational standards.
