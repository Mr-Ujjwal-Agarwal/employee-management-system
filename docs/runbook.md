# 🚑 Operations Runbook

> **Document Version:** Phase 3 – Enterprise CI/CD  
> **Project:** Enterprise Employee Management System  
> **Audience:** DevOps Engineers, System Administrators, Contributors  
> **Prerequisites:** Application successfully deployed  
> **Last Updated:** July 2026

---

# 1. Overview

This runbook provides standardized recovery procedures for operational incidents affecting the Enterprise Employee Management System (EMS).

It serves as the primary reference during service disruptions and production incidents by documenting repeatable recovery procedures, validation steps, escalation guidelines, and post-incident activities.

This document covers:

- Incident response
- Service recovery
- Docker failures
- Jenkins failures
- Amazon ECR issues
- AWS EC2 recovery
- Deployment rollback
- Service validation
- Escalation procedures

---

# 2. Scope

This runbook applies to the current production architecture.

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
AWS EC2
      │
      ▼
Docker Compose
      │
      ▼
Frontend + Backend Containers
```

---

# 3. Incident Severity Levels

| Severity | Description | Example |
|-----------|-------------|----------|
| Critical | Complete application outage | Both frontend and backend unavailable |
| High | Major service disruption | Backend API unavailable |
| Medium | Partial functionality affected | Jenkins pipeline failure |
| Low | Minor operational issue | Log warnings, disk cleanup required |

Prioritize incident response according to severity.

---

# 4. Initial Incident Response

Before attempting recovery:

- Identify the affected service.
- Determine the scope of impact.
- Verify whether the issue is ongoing.
- Review recent deployments.
- Collect logs and diagnostic information.
- Avoid making multiple simultaneous changes.

---

# 5. Frontend Service Recovery

## Symptoms

- Website unavailable
- Blank page
- HTTP errors
- Container not responding

### Investigation

Verify running containers.

```bash
docker ps
```

Inspect frontend logs.

```bash
docker logs frontend
```

Inspect container configuration.

```bash
docker inspect frontend
```

### Recovery

Restart frontend container.

```bash
docker compose restart frontend
```

If unsuccessful:

```bash
docker compose up -d --build frontend
```

### Validation

- Frontend loads successfully.
- Browser console contains no critical errors.
- Backend communication succeeds.

---

# 6. Backend Service Recovery

## Symptoms

- API unavailable
- HTTP 500 errors
- Database/API failures
- Backend container exited

### Investigation

Check backend logs.

```bash
docker logs backend
```

Inspect container.

```bash
docker inspect backend
```

Verify running services.

```bash
docker ps
```

### Recovery

Restart backend.

```bash
docker compose restart backend
```

If required:

```bash
docker compose up -d --build backend
```

### Validation

- Backend container running.
- API returns successful responses.
- Frontend communicates with backend correctly.

---

# 7. Docker Container Recovery

## Symptoms

- Container exited
- Restart loop
- Image pull failure
- Container unavailable

### Investigation

```bash
docker ps -a
```

```bash
docker logs <container-name>
```

```bash
docker inspect <container-name>
```

### Recovery

Restart container.

```bash
docker restart <container-name>
```

Recreate services.

```bash
docker compose down
```

```bash
docker compose up -d
```

### Validation

```bash
docker ps
```

Verify all expected containers are running.

---

# 8. Docker Service Recovery

## Symptoms

- Docker commands fail
- Containers cannot start
- Docker daemon unavailable

### Investigation

Check Docker status.

```bash
systemctl status docker
```

Review Docker logs.

```bash
journalctl -u docker
```

### Recovery

Restart Docker.

```bash
sudo systemctl restart docker
```

Verify Docker.

```bash
docker ps
```

### Validation

- Docker service active.
- Containers restart successfully.

---

# 9. Jenkins Pipeline Recovery

## Symptoms

- Pipeline failure
- Build failure
- Deployment failure
- Git checkout failure

### Investigation

Review:

- Pipeline console output
- Jenkins system logs
- Workspace status
- Credentials
- Docker connectivity
- Git repository access

### Recovery

- Correct pipeline configuration.
- Resolve build errors.
- Verify credentials.
- Retry pipeline execution.

If required, rebuild Docker images.

### Validation

- Pipeline completes successfully.
- Images built successfully.
- Deployment stage succeeds.

---

# 10. Amazon ECR Recovery

## Symptoms

- Docker push fails
- Authentication errors
- Image unavailable

### Investigation

Verify AWS configuration.

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

Verify repositories.

```bash
aws ecr describe-repositories
```

### Recovery

- Reauthenticate with Amazon ECR.
- Push Docker image again.
- Verify repository contents.

### Validation

Latest Docker image appears in the repository.

---

# 11. AWS EC2 Recovery

## Symptoms

- Application unreachable
- SSH unavailable
- High resource utilization

### Investigation

Check instance health.

```bash
uptime
```

Memory.

```bash
free -h
```

Disk.

```bash
df -h
```

Processes.

```bash
top
```

Docker.

```bash
systemctl status docker
```

### Recovery

Restart Docker if required.

```bash
sudo systemctl restart docker
```

Restart application.

```bash
docker compose up -d
```

### Validation

- EC2 reachable.
- Containers healthy.
- Application accessible.

---

# 12. Complete Deployment Recovery

Use this procedure if multiple services fail.

## Step 1

Stop running services.

```bash
docker compose down
```

---

## Step 2

Pull the latest source code.

```bash
git pull origin main
```

---

## Step 3

Rebuild images.

```bash
docker compose build
```

---

## Step 4

Deploy services.

```bash
docker compose up -d
```

---

## Step 5

Verify containers.

```bash
docker ps
```

---

# 13. Deployment Rollback

Rollback should be considered when:

- Deployment fails.
- Critical application errors occur.
- Containers cannot start.
- New release is unstable.

Recovery procedure:

1. Stop current deployment.
2. Restore previous application version.
3. Pull previous Docker image.
4. Restart containers.
5. Verify application functionality.
6. Notify stakeholders.

Rollback is complete only after successful validation.

---

# 14. Service Validation Checklist

After every recovery verify:

## Application

- Frontend accessible
- Backend responding
- API requests successful

---

## Containers

- Containers running
- No restart loops
- No failed services

---

## Jenkins

- Latest pipeline successful
- Build completed
- Deployment completed

---

## Amazon ECR

- Images available
- Correct image version deployed

---

## AWS EC2

- Docker service active
- No critical system errors
- Application reachable

---

# 15. Escalation Guidelines

Escalate the incident when:

- Multiple services fail simultaneously.
- Root cause cannot be identified.
- Deployment repeatedly fails.
- Docker daemon cannot be recovered.
- EC2 instance becomes inaccessible.
- Security incidents are suspected.
- Data integrity may be affected.

Record all recovery attempts before escalation.

---

# 16. Post-Incident Activities

After resolving an incident:

- Document the root cause.
- Record corrective actions.
- Identify preventive improvements.
- Update project documentation if required.
- Review deployment procedures.
- Share lessons learned with contributors.

Every incident should result in actionable improvements whenever possible.

---

# 17. Best Practices

Follow these recommendations during incident response.

- Stay calm and investigate before making changes.
- Modify one component at a time.
- Collect logs before restarting services.
- Validate every recovery step.
- Avoid deleting resources without verification.
- Maintain rollback capability.
- Keep recovery procedures documented.
- Review recurring incidents periodically.

---

# 18. Related Documentation

- README.md
- architecture.md
- setup-guide.md
- operations-guide.md
- roadmap.md
- troubleshooting.md

---

# 19. Conclusion

This runbook provides standardized operational recovery procedures for the Enterprise Employee Management System.

By following these documented workflows, operators can respond consistently to incidents, reduce service downtime, validate successful recoveries, and continuously improve operational reliability.

Future project phases—including Terraform, Ansible, Kubernetes, GitOps, Monitoring, and DevSecOps—will extend this runbook with additional recovery procedures while preserving the same operational standards.
