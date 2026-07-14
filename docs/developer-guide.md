# Developer Guide

## Employee Management System

Version: v1.0.0-beta

---

# Overview

This guide is intended for developers contributing to the Employee Management System (EMS).

It explains the project structure, development workflow, coding standards, and recommended practices to ensure consistency across the codebase.

---

# Project Structure

```
employee-management-system/

├── app/
│   ├── backend/
│   └── frontend/
│
├── platform/
│   ├── bootstrap/
│   ├── cicd/
│   ├── gitops/
│   ├── iac/
│   ├── observability/
│   ├── security/
│   └── templates/
│
├── docs/
├── diagrams/
├── assets/
└── tests/
```

---

# Development Workflow

The recommended workflow is:

```
Clone Repository

↓

Create Feature Branch

↓

Implement Changes

↓

Test Locally

↓

Commit Changes

↓

Push Branch

↓

Open Pull Request

↓

Code Review

↓

Merge
```

---

# Backend Development

Location

```
app/backend
```

Run locally

```bash
python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Swagger

```
http://localhost:8000/docs
```

---

# Frontend Development

Location

```
app/frontend
```

Run locally

```bash
npm install

npm run dev
```

Default URL

```
http://localhost:5173
```

---

# Repository Standards

Developers should:

- Write modular code
- Use descriptive names
- Avoid hardcoded secrets
- Keep documentation updated
- Follow the repository structure
- Test changes before committing

---

# Git Workflow

Create a feature branch.

```bash
git checkout -b feature/<feature-name>
```

Example

```bash
git checkout -b feature/cloudwatch-dashboard
```

Commit using Conventional Commits.

```bash
git commit -m "feat(observability): add dashboard widgets"
```

---

# Coding Standards

## Python

- Follow PEP 8
- Use type hints where practical
- Keep business logic inside services
- Separate routers from models

---

## React

- Functional Components
- React Hooks
- Reusable Components
- Keep components small

---

## Bash

- Use `set -e`
- Log important actions
- Keep scripts idempotent

---

# Security Guidelines

Never commit:

- AWS Access Keys
- Secret Keys
- Database Passwords
- Private Keys
- `.env` files

Use:

- IAM Roles
- Systems Manager Parameter Store

---

# Testing

Before opening a Pull Request:

- Backend starts successfully
- Frontend builds successfully
- Health checks pass
- Documentation updated

---

# Future Development

Future phases include:

- AWS Native CI/CD
- Docker
- Kubernetes
- GitOps
- Agentic DevOps
- Advanced Observability

---

# References

- README.md
- architecture.md
- setup-guide.md
- operations-guide.md
- runbook.md






