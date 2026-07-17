# 🚑 Operations Runbook

## 1. Purpose

This runbook provides standard operating procedures for responding to common incidents within the Employee Management System (EMS) environment.

The objective is to reduce downtime by providing consistent troubleshooting and recovery steps for infrastructure, application, and CI-related issues.

---

# 2. Incident Response Workflow

Whenever an issue occurs:

1. Receive notification (CloudWatch Alarm / Amazon SNS)
2. Identify the affected component
3. Verify the issue using CloudWatch metrics and logs
4. Apply the appropriate recovery procedure
5. Confirm the service has returned to a healthy state
6. Document the incident and corrective actions

---

# 3. CodePipeline Failure

## Symptoms

- Pipeline execution fails.
- CloudWatch Alarm is triggered.
- SNS email notification is received.

## Investigation

- Open AWS CodePipeline.
- Identify the failed stage.
- Review execution history.
- Inspect CloudWatch Logs.

## Resolution

- Fix the identified issue.
- Commit the required changes.
- Push to GitHub.
- Verify the next pipeline execution completes successfully.

---

# 4. Frontend CodeBuild Failure

## Symptoms

- Frontend build stage fails.
- CloudWatch Alarm enters ALARM state.

## Investigation

Review:

- Build logs
- npm installation
- Build errors
- Missing dependencies

## Resolution

Correct the application code or build configuration and trigger a new pipeline execution.

---

# 5. Backend CodeBuild Failure

## Symptoms

- Backend build fails.

## Investigation

Check:

- Python dependencies
- requirements.txt
- FastAPI application
- Build logs

## Resolution

Resolve the underlying issue and verify that the build completes successfully.

---

# 6. EC2 Instance Unhealthy

## Symptoms

- EC2 health checks fail.
- Target Group reports unhealthy instances.
- Auto Scaling replaces instances.

## Investigation

Check:

- EC2 Instance Status
- System Logs
- CloudWatch Metrics
- Security Groups

## Resolution

- Verify Launch Template configuration.
- Confirm bootstrap scripts execute successfully.
- Perform an Instance Refresh if required.

---

# 7. Application Load Balancer Issues

## Symptoms

- Application inaccessible.
- Target Groups unhealthy.
- Increased HTTP 5xx responses.

## Investigation

Verify:

- Target Group health
- Listener configuration
- Security Groups
- Backend application status

## Resolution

Restore application health and verify that targets return to the Healthy state.

---

# 8. Amazon RDS Issues

## Symptoms

- Database connection failures.
- High CPU alarms.
- Increased response times.

## Investigation

Check:

- Database status
- Security Groups
- Database connections
- CloudWatch Metrics

## Resolution

- Verify connectivity.
- Review database performance.
- Scale database resources if necessary.
- Restore from backup if required.

---

# 9. CloudWatch Alarm Triggered

## Investigation

Determine:

- Which resource triggered the alarm.
- Current metric values.
- Recent operational changes.

## Resolution

Investigate the root cause before clearing the alarm.

Never suppress alarms without understanding why they were triggered.

---

# 10. SNS Notifications Not Received

## Investigation

Verify:

- SNS Topic
- Email subscription status
- CloudWatch Alarm configuration

## Resolution

- Reconfirm email subscription.
- Test SNS delivery.
- Validate alarm actions.

---

# 11. High CPU Utilization

## Symptoms

- EC2 CPU alarm triggered.
- RDS CPU alarm triggered.

## Investigation

Check:

- CloudWatch Dashboard
- Running processes
- Recent deployments
- Traffic levels

## Resolution

- Allow Auto Scaling to respond if applicable.
- Optimize the application.
- Increase instance capacity if required.

---

# 12. Parameter Store Issues

## Symptoms

- Application cannot read configuration.
- Authentication failures.

## Investigation

Verify:

- Parameter names
- IAM permissions
- Parameter values

## Resolution

Update Parameter Store entries and restart the affected application if necessary.

---

# 13. General Troubleshooting Checklist

Before escalating an issue, verify:

- EC2 instance health
- Auto Scaling Group health
- Target Group health
- Application Load Balancer
- Amazon RDS
- CloudWatch Dashboard
- CloudWatch Logs
- CodePipeline
- CodeBuild
- SNS Notifications

---

# 14. Recovery Validation

After resolving an incident, confirm:

- Application is accessible.
- Backend API responds successfully.
- Target Groups are healthy.
- Auto Scaling Groups are healthy.
- CodePipeline completes successfully.
- CloudWatch alarms return to the OK state.

---

# 15. Escalation Guidelines

Escalate incidents when:

- Multiple services fail simultaneously.
- Amazon RDS becomes unavailable.
- Repeated pipeline failures occur.
- Auto Scaling cannot recover unhealthy instances.
- Security-related incidents are detected.

---

# 16. Conclusion

This runbook provides standardized recovery procedures for the Employee Management System.

Following these procedures helps minimize downtime, improve operational consistency, and ensure reliable system recovery during incidents.
