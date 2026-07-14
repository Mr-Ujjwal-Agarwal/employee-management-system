# Contributing Guide

Thank you for your interest in contributing to the Employee Management System project.

We welcome improvements, bug fixes, documentation updates, and new features.

---

# Repository Workflow

```
Fork Repository

↓

Create Feature Branch

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

# Branch Naming Convention

Use meaningful branch names.

Examples:

```
feature/add-cloudwatch-dashboard

feature/docker-support

bugfix/backend-auth

hotfix/rds-timeout

docs/readme-update

refactor/bootstrap-script
```

---

# Commit Message Convention

This project follows Conventional Commits.

Examples

```
feat(terraform): add NAT Gateway module

fix(frontend): resolve API timeout

docs(readme): update deployment section

refactor(bootstrap): simplify userdata script

test(api): add employee endpoint tests

chore(repo): update repository structure
```

---

# Pull Request Checklist

Before opening a Pull Request ensure:

- Code builds successfully
- Documentation is updated
- No sensitive information is committed
- Tests pass
- Bootstrap scripts are validated

---

# Coding Standards

## Python

- Follow PEP8
- Use descriptive variable names
- Add type hints where applicable
- Write modular code

---

## React

- Functional Components
- React Hooks
- ESLint Compliant
- Component Reusability

---

## Shell Scripts

- Use Bash
- Include comments
- Use `set -e`
- Log important actions

---

## Infrastructure

Infrastructure changes should:

- Maintain High Availability
- Preserve Security Best Practices
- Be documented
- Avoid breaking production deployments

---

# Security Guidelines

Never commit:

- AWS Access Keys
- Secret Keys
- Database Passwords
- `.env` Files
- Private Keys
- SSH Keys

Use:

- AWS IAM Roles
- AWS Systems Manager Parameter Store
- Security Groups

---

# Reporting Issues

Please include:

- Environment
- Error Logs
- Reproduction Steps
- Expected Behaviour
- Actual Behaviour

---

# License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
