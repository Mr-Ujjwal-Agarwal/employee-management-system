# Production Runbook

## Employee Management System

Version: v1.0.0-beta

---

# Purpose

This runbook provides operational procedures for diagnosing and resolving common production incidents within the Employee Management System (EMS).

The objective is to:

- Restore services quickly
- Reduce downtime
- Maintain application availability
- Provide standardized recovery procedures

---

# Incident Severity Levels

| Severity | Description | Response Time |
|----------|-------------|---------------|
| P1 | Complete Service Outage | Immediate |
| P2 | Partial Service Degradation | Within 30 Minutes |
| P3 | Minor Functional Issue | Same Business Day |
| P4 | Cosmetic / Low Impact | Planned Maintenance |

---

# Standard Investigation Workflow

```
Alert Received

↓

Identify Impact

↓

Identify Component

↓

Collect Logs

↓

Validate Health

↓

Apply Fix

↓

Verify Recovery

↓

Close Incident
```

---

# Infrastructure Components

- Frontend Auto Scaling Group
- Backend Auto Scaling Group
- Public ALB
- Internal ALB
- Amazon RDS
- CloudWatch
- SNS
- Parameter Store

---

# Useful AWS CLI Commands

## EC2

```bash
aws ec2 describe-instances
```

---

## Auto Scaling

```bash
aws autoscaling describe-auto-scaling-groups
```

---

## Target Groups

```bash
aws elbv2 describe-target-health \
--target-group-arn <TARGET_GROUP_ARN>
```

---

## CloudWatch

```bash
aws cloudwatch describe-alarms
```

---

## Parameter Store

```bash
aws ssm describe-parameters
```

---

## RDS

```bash
aws rds describe-db-instances
```

---

# Common Incident 1

## Frontend Target Unhealthy

### Symptoms

- Website unavailable
- ALB reports unhealthy targets
- HTTP 502 or 503 errors

---

### Investigation

Check Target Group

```bash
aws elbv2 describe-target-health
```

SSH into instance

```bash
ssh ubuntu@<EC2-IP>
```

Check Nginx

```bash
sudo systemctl status nginx
```

Check frontend process

```bash
ps aux | grep node
```

---

### Resolution

- Restart Nginx

```bash
sudo systemctl restart nginx
```

- Verify health check endpoint

- Review bootstrap logs

```bash
sudo less /var/log/cloud-init-output.log
```

---

### Validation

Confirm target returns

```
Healthy
```

---

# Common Incident 2

## Backend Service Down

### Symptoms

- API unavailable
- Frontend cannot retrieve data
- Internal ALB unhealthy

---

### Investigation

Backend service

```bash
sudo systemctl status ems-backend
```

Logs

```bash
journalctl -u ems-backend
```

API

```bash
curl http://localhost:8000/docs
```

---

### Resolution

Restart service

```bash
sudo systemctl restart ems-backend
```

Review logs

Fix configuration if required

---

### Validation

Swagger UI loads

```
http://localhost:8000/docs
```

---
# Common Incident 3

## Database Connection Failure

### Symptoms

- API returns 500 errors
- Backend logs contain database connection failures

---

### Investigation

Verify RDS

```bash
aws rds describe-db-instances
```

Verify Parameter Store

```bash
aws ssm get-parameter \
--name "/ems/prod/db/host"
```

Check IAM Role

```bash
aws sts get-caller-identity
```

---

### Resolution

Verify:

- Security Groups
- RDS Status
- IAM Permissions
- Parameter Store values

Restart backend

```bash
sudo systemctl restart ems-backend
```

---

# Common Incident 4

## Auto Scaling Not Replacing Instance

### Symptoms

- Desired Capacity not restored
- Instance terminated
- No replacement launched

---

### Investigation

```bash
aws autoscaling describe-scaling-activities
```

Check Launch Template

Review Activity History

---

### Resolution

- Verify Launch Template
- Verify IAM Permissions
- Verify User Data
- Refresh Launch Template if necessary

---

# Common Incident 5

## CloudWatch Metrics Missing

### Symptoms

- Dashboard empty
- Memory metrics unavailable
- Disk metrics unavailable

---

### Investigation

```bash
systemctl status amazon-cloudwatch-agent
```

Configuration

```bash
cat /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
```

---

### Resolution

Restart Agent

```bash
sudo systemctl restart amazon-cloudwatch-agent
```

If missing

Run installation script

```bash
bash platform/observability/cloudwatch/install-agent.sh
```

---

# Common Incident 6

## SNS Notifications Not Received

### Symptoms

CloudWatch alarm triggered

No email received

---

### Investigation

Verify:

- SNS Subscription
- Email Confirmation
- Alarm Actions

---

### Resolution

Confirm subscription

Re-test alarm

Verify topic ARN

---

# Common Incident 7

## Parameter Store Access Denied

### Symptoms

Backend startup failure

AccessDeniedException

---

### Investigation

```bash
aws iam get-role \
--role-name <ROLE_NAME>
```

Verify policy

```bash
AmazonSSMReadOnlyAccess
```

or equivalent custom policy

---

### Resolution

Attach correct IAM policy

Restart backend

---

# Escalation Matrix

| Issue | Primary Owner |
|--------|---------------|
| EC2 | Platform Engineer |
| Auto Scaling | Cloud Engineer |
| RDS | Database Administrator |
| IAM | Cloud Engineer |
| Monitoring | DevOps Engineer |
| SNS | DevOps Engineer |

---

# Post-Incident Checklist

After resolving any incident:

- Verify application availability
- Confirm healthy targets
- Check CloudWatch dashboard
- Review Auto Scaling status
- Validate database connectivity
- Update incident documentation
- Identify root cause
- Record preventive actions

---

# Root Cause Analysis Template

## Incident

Description:

---

## Timeline

Detection:

Investigation:

Resolution:

Recovery:

---

## Root Cause

Document the underlying cause.

---

## Corrective Actions

Immediate fix

---

## Preventive Actions

Long-term improvement

---

# Conclusion

This runbook provides standardized procedures for diagnosing and recovering from common production incidents.

Following these procedures helps ensure:

- Faster recovery
- Reduced downtime
- Consistent operational practices
- Improved system reliability
