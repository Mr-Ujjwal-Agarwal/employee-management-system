# Ansible Automation

This directory contains the production Ansible automation for the Employee Management System.

## Features

- Common server configuration
- Docker installation
- AWS CLI installation
- CloudWatch Agent installation
- Frontend deployment
- Backend deployment
- Jenkins configuration
- Dynamic AWS Inventory
- Production playbooks

Run:

```bash
ansible-galaxy collection install -r requirements.yml

ansible-playbook playbooks/site.yml
```
