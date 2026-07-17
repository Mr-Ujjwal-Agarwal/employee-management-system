# 🛠️ Operations Guide

## 1. Overview

This document describes the day-to-day operational procedures for the Employee Management System (EMS) running on AWS.

The objective is to ensure that the application remains healthy, available, and easy to maintain.

This guide covers:

- Infrastructure monitoring
- Continuous Integration monitoring
- Application maintenance
- Scaling operations
- Backup considerations
- Security best practices

---

# 2. Operational Architecture

The production-inspired environment consists of:

- Amazon EC2
- Auto Scaling Groups
- Application Load Balancers
- Amazon RDS
- AWS Systems Manager Parameter Store
- AWS CodePipeline
- AWS CodeBuild
- Amazon CloudWatch
- Amazon SNS

These services work together to provide a reliable application platform.

---

# 3. Daily Operational Checklist

Perform the following checks regularly.

## Infrastructure

- Verify EC2 instances are healthy.
- Verify Auto Scaling Groups maintain desired capacity.
- Confirm Application Load Balancer target groups are healthy.
- Verify Amazon RDS is available.

---

## Continuous Integration

Verify:

- CodePipeline executions complete successfully.
- Frontend CodeBuild succeeds.
- Backend CodeBuild succeeds.

Investigate failed builds immediately.

---

## Monitoring

Review:

- CloudWatch Dashboard
- CloudWatch Alarms
- CloudWatch Logs

Ensure there are no active alarms requiring attention.

---

# 4. CloudWatch Dashboard

The dashboard provides centralized visibility into the environment.

Monitor:

- Pipeline status
- Frontend build status
- Backend build status
- Frontend CPU utilization
- Backend CPU utilization
- Amazon RDS CPU utilization
- Application Load Balancer metrics

Review the dashboard regularly to identify abnormal behavior.

---

# 5. CloudWatch Alarms

Configured alarms include:

| Alarm | Purpose |
|--------|---------|
| Pipeline Failure | Detect failed pipeline executions |
| Frontend Build Failure | Detect frontend build failures |
| Backend Build Failure | Detect backend build failures |
| Frontend EC2 High CPU | Detect high CPU utilization |
| Backend EC2 High CPU | Detect high CPU utilization |
| Amazon RDS High CPU | Detect excessive database utilization |

Whenever an alarm enters the ALARM state, investigate immediately.

---

# 6. Amazon SNS Notifications

CloudWatch Alarms publish notifications to Amazon SNS.

Operational procedure:

1. Receive notification email.
2. Identify the affected resource.
3. Review CloudWatch metrics.
4. Inspect CloudWatch Logs (if applicable).
5. Resolve the issue.
6. Verify the alarm returns to the OK state.

---

# 7. Build Operations

Every push to GitHub automatically starts the CI pipeline.

Pipeline flow:

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

CloudWatch Logs

↓

CloudWatch Dashboard

↓

SNS Notifications

No manual build execution is required under normal operation.

---

# 8. Auto Scaling Operations

Auto Scaling Groups maintain the desired number of EC2 instances.

Operational checks:

- Desired Capacity
- Minimum Capacity
- Maximum Capacity
- Instance Health
- Launch Template Version

If Launch Templates are updated, perform an Instance Refresh to replace existing instances.

---

# 9. Amazon RDS Operations

Regularly monitor:

- CPU Utilization
- Database Connections
- Storage Capacity
- Availability

Database backups should be verified periodically according to your backup strategy.

---

# 10. Parameter Store Operations

AWS Systems Manager Parameter Store stores application configuration.

Best practices:

- Never hardcode credentials.
- Restrict IAM access using least privilege.
- Rotate sensitive credentials periodically.
- Update application configuration through Parameter Store when possible.

---

# 11. Security Operations

Regularly review:

- IAM Roles
- Security Groups
- EC2 Instance Status
- RDS Security Groups
- Parameter Store permissions

Remove unused permissions and review access periodically.

---

# 12. Maintenance Activities

Typical maintenance tasks include:

- Reviewing CloudWatch metrics
- Monitoring build history
- Updating application code
- Applying security patches
- Updating Launch Templates
- Performing Instance Refresh
- Reviewing alarm thresholds

---

# 13. Operational Best Practices

Recommended practices:

- Monitor the CloudWatch Dashboard daily.
- Investigate all alarms promptly.
- Keep Launch Templates updated.
- Use IAM roles instead of access keys.
- Store secrets in Parameter Store.
- Validate every pipeline execution.
- Document operational changes.

---

# 14. Conclusion

The operational model combines AWS monitoring, automated Continuous Integration, centralized logging, and proactive alerting to provide a reliable and production-inspired application environment.

Following the procedures described in this guide helps maintain system availability, improve operational visibility, and simplify day-to-day management.
