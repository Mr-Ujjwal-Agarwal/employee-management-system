# 🤝 Contributing Guide

Thank you for your interest in contributing to the **Enterprise Employee Management System (EMS)**.

Whether you're fixing bugs, improving documentation, optimizing infrastructure, or introducing new features, your contributions are greatly appreciated.

This guide outlines the standards and workflow followed throughout the project to maintain consistency, code quality, and repository organization.

---

# Repository Workflow

All contributions should follow the workflow below.

```text
Fork Repository
      │
      ▼
Create Feature Branch
      │
      ▼
Implement Changes
      │
      ▼
Test Changes
      │
      ▼
Commit Changes
      │
      ▼
Push Branch
      │
      ▼
Open Pull Request
      │
      ▼
Code Review
      │
      ▼
Merge
```

---

# Branch Naming Convention

Use descriptive branch names.

## Feature

```text
feature/docker-healthcheck

feature/jenkins-improvements

feature/terraform-networking
```

---

## Bug Fix

```text
bugfix/backend-api

bugfix/docker-compose

bugfix/frontend-routing
```

---

## Documentation

```text
docs/readme

docs/setup-guide

docs/architecture
```

---

## Refactoring

```text
refactor/docker

refactor/backend

refactor/pipeline
```

---

## Hotfix

```text
hotfix/deployment

hotfix/security

hotfix/container
```

---

# Commit Message Convention

This repository follows the **Conventional Commits** specification.

Examples:

```text
feat(jenkins): add deployment stage

feat(terraform): create VPC module

fix(docker): resolve compose networking issue

fix(api): correct employee endpoint validation

docs(readme): update architecture diagram

docs(runbook): improve recovery procedures

refactor(frontend): simplify component structure

test(api): add integration tests

chore(repo): reorganize documentation
```

---

# Pull Request Checklist

Before submitting a Pull Request, verify the following:

- Application builds successfully.
- Docker containers start correctly.
- No merge conflicts exist.
- Documentation has been updated (if required).
- No sensitive information is committed.
- Code follows project standards.
- Changes have been tested locally.
- Commit history is clean.

---

# Development Standards

## Python (FastAPI)

- Follow PEP 8.
- Use meaningful variable and function names.
- Add type hints where appropriate.
- Keep modules focused and reusable.
- Handle exceptions gracefully.

---

## React

- Use Functional Components.
- Prefer React Hooks.
- Keep components modular.
- Follow ESLint recommendations.
- Avoid unnecessary re-renders.

---

## Docker

- Keep images lightweight.
- Use multi-stage builds where appropriate.
- Avoid hardcoding secrets.
- Use `.dockerignore`.
- Keep Dockerfiles readable.

---

## Jenkins

- Keep pipelines modular.
- Avoid hardcoded credentials.
- Store secrets using Jenkins Credentials.
- Validate pipelines before merging.

---

# Documentation Standards

Documentation should remain synchronized with implementation.

Whenever introducing a new feature:

- Update README if necessary.
- Update Architecture documentation if the design changes.
- Update the Setup Guide for installation changes.
- Update the Operations Guide for operational changes.
- Update the Runbook if new recovery procedures are introduced.
- Update the Changelog.

---

# Security Guidelines

Never commit:

- AWS credentials
- GitHub Personal Access Tokens
- SSH private keys
- Environment files containing secrets
- Jenkins credentials
- Docker registry passwords
- API keys

Instead:

- Use environment variables.
- Store Jenkins secrets using the Credentials Manager.
- Apply the Principle of Least Privilege.
- Rotate credentials periodically.

---

# Issue Reporting

When reporting an issue, include:

- Operating System
- Docker version
- Application version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Relevant logs
- Screenshots (if applicable)

---

# Feature Requests

Feature requests should include:

- Problem statement
- Proposed solution
- Expected benefits
- Potential implementation approach
- Relevant screenshots or diagrams (optional)

---

# Code Review Guidelines

Every Pull Request should be reviewed for:

- Code quality
- Readability
- Security
- Performance
- Documentation updates
- Deployment impact
- Backward compatibility

Constructive feedback is encouraged to maintain a high-quality engineering standard.

---

# License

By contributing to this repository, you agree that your contributions will be released under the project's **MIT License**.
