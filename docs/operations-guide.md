# Operations Guide

## Employee Management System

Version: v1.0.0-beta

---

# Overview

This document describes the operational procedures required to maintain, monitor, troubleshoot, and manage the Employee Management System (EMS) in a production environment.

The guide covers:

- Daily Operations
- Infrastructure Monitoring
- Health Validation
- Auto Scaling
- CloudWatch Monitoring
- Incident Response
- Maintenance
- Operational Best Practices

---

# Operational Responsibilities

Routine operations include:

- Monitoring infrastructure health
- Reviewing CloudWatch dashboards
- Verifying Auto Scaling activity
- Monitoring Load Balancer health
- Validating database connectivity
- Reviewing application logs
- Responding to CloudWatch alarms
- Ensuring backup procedures are functioning

---

# Production Environment

## Compute

- Frontend Auto Scaling Group
- Backend Auto Scaling Group
- Launch Templates

---

## Networking

- Public Application Load Balancer
- Internal Application Load Balancer
- Amazon VPC
- NAT Gateway

---

## Database

Amazon RDS MySQL

---

## Monitoring

- Amazon CloudWatch
- CloudWatch Agent
- CloudWatch Dashboard
- CloudWatch Alarms
- Amazon SNS

---

# Daily Operational Checklist

Every production day should begin with the following checks.

## Infrastructure

Verify:

- EC2 Instances Running
- Auto Scaling Groups Healthy
- Load Balancers Healthy
- Target Groups Healthy

---

## Database

Verify:

- Amazon RDS Status = Available
- Storage Utilization
- Database Connections

---

## Monitoring

Verify:

- CloudWatch Dashboard
- CloudWatch Metrics
- Memory Metrics
- Disk Metrics

---

## Notifications

Verify:

- SNS Topic Active
- Alarm Notifications Received

---

# Health Check Procedures

## EC2

```bash
aws ec2 describe-instances
```

Verify:

- Running State
- Correct IAM Role
- Launch Template Version

---

## Auto Scaling

```bash
aws autoscaling describe-auto-scaling-groups
```

Verify:

- Desired Capacity
- Current Capacity
- Healthy Instances

---

## Load Balancer

```bash
aws elbv2 describe-target-health \
--target-group-arn <TARGET_GROUP_ARN>
```

Verify:

All targets should report

```
healthy
```

---

## Amazon RDS

```bash
aws rds describe-db-instances
```

Verify:

```
available
```

---

## Parameter Store

```bash
aws ssm describe-parameters
```

Verify all required parameters exist.

---

## CloudWatch

Verify:

- Dashboard updated
- Metrics arriving
- No missing data

---

## SNS

Trigger a test alarm.

Verify email delivery.

---

# Monitoring Procedures

## CloudWatch Dashboard

Review:

- CPU Utilization
- Memory Usage
- Disk Utilization
- Network Traffic

Dashboard should be reviewed daily.

---

## CloudWatch Alarms

Current alarms monitor:

- Frontend CPU
- Backend CPU
- Frontend Memory
- Backend Memory
- Disk Usage

Investigate alarms immediately after notification.

---

## Log Monitoring

Review:

### Backend

```
journalctl -u ems-backend
```

---

### Nginx

```
/var/log/nginx/access.log

/var/log/nginx/error.log
```

---

### CloudWatch Agent

```
systemctl status amazon-cloudwatch-agent
```

---

# Auto Scaling Operations

Verify:

```
Desired Capacity

Minimum Capacity

Maximum Capacity
```

Review:

- Scaling Activities
- Instance Refresh
- Launch Template Version

---

# Maintenance Procedures

Routine maintenance includes:

- Updating operating system packages
- Updating application dependencies
- Rotating credentials
- Reviewing IAM permissions
- Reviewing CloudWatch alarms

Maintenance should be performed during approved maintenance windows.

---

# Incident Response

## Instance Failure

Symptoms

- Target becomes unhealthy
- Auto Scaling launches replacement

Response

- Verify bootstrap logs
- Verify health checks
- Confirm replacement instance becomes healthy

---

## Database Connectivity Failure

Verify:

- RDS Status
- Security Groups
- Parameter Store
- IAM Role

---

## CloudWatch Metrics Missing

Verify:

```
systemctl status amazon-cloudwatch-agent
```

---

## SNS Notification Failure

Verify:

- Topic Subscription
- Email Confirmation
- Alarm Configuration

---

# Operational Best Practices

Always:

- Use IAM Roles
- Store secrets in Parameter Store
- Monitor CloudWatch daily
- Validate Auto Scaling activities
- Keep Launch Templates updated
- Test alarms regularly

Never:

- Store credentials inside source code
- Modify production instances manually
- Disable health checks
- Expose Amazon RDS publicly

---

# Maintenance Window Checklist

Before maintenance:

- Notify stakeholders
- Verify backups
- Review CloudWatch dashboard

During maintenance:

- Monitor alarms
- Validate application health

After maintenance:

- Verify target health
- Verify database connectivity
- Review CloudWatch metrics
- Confirm application availability

---

# Escalation Procedure

Level 1

Application Issue

↓

Level 2

Infrastructure Issue

↓

Level 3

AWS Service Issue

↓

AWS Support (if required)

---

# Operations Summary

The Employee Management System is designed for reliable day-to-day operations using AWS managed services, infrastructure automation, and proactive monitoring.

The operational model emphasizes:

- Reliability
- Availability
- Observability
- Security
- Automation
- Maintainability

For disaster recovery procedures, refer to:

- `docs/disaster-recovery.md`

For troubleshooting guidance, refer to:

- `docs/runbook.md`

