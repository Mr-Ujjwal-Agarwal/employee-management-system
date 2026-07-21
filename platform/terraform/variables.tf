############################################
# Project Configuration
############################################

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "employee-management"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "prod"
}

############################################
# AWS Configuration
############################################

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

############################################
# Networking
############################################

variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  description = "Public Subnet 1 CIDR"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  description = "Public Subnet 2 CIDR"
  type        = string
  default     = "10.0.2.0/24"
}

variable "private_subnet_1_cidr" {
  description = "Private Subnet 1 CIDR"
  type        = string
  default     = "10.0.11.0/24"
}

variable "private_subnet_2_cidr" {
  description = "Private Subnet 2 CIDR"
  type        = string
  default     = "10.0.12.0/24"
}

############################################
# Availability Zones
############################################

variable "availability_zone_1" {
  description = "Primary Availability Zone"
  type        = string
  default     = "ap-south-1a"
}

variable "availability_zone_2" {
  description = "Secondary Availability Zone"
  type        = string
  default     = "ap-south-1b"
}

############################################
# EC2 Configuration
############################################

variable "ami_id" {
  description = "Amazon Linux 2023 AMI"
  type        = string
}

variable "instance_type" {
  description = "EC2 Instance Type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
}

############################################
# Auto Scaling - Frontend
############################################

variable "frontend_min_size" {
  description = "Frontend ASG Minimum Size"
  type        = number
  default     = 2
}

variable "frontend_desired_size" {
  description = "Frontend ASG Desired Capacity"
  type        = number
  default     = 2
}

variable "frontend_max_size" {
  description = "Frontend ASG Maximum Size"
  type        = number
  default     = 4
}

############################################
# Auto Scaling - Backend
############################################

variable "backend_min_size" {
  description = "Backend ASG Minimum Size"
  type        = number
  default     = 2
}

variable "backend_desired_size" {
  description = "Backend ASG Desired Capacity"
  type        = number
  default     = 2
}

variable "backend_max_size" {
  description = "Backend ASG Maximum Size"
  type        = number
  default     = 4
}

############################################
# Database
############################################

variable "db_name" {
  description = "Database Name"
  type        = string
  default     = "emsdb"
}

variable "db_username" {
  description = "Database Username"
  type        = string
}

variable "db_password" {
  description = "Database Password"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS Instance Class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Database Storage (GB)"
  type        = number
  default     = 20
}

############################################
# Load Balancer
############################################

variable "alb_idle_timeout" {
  description = "ALB Idle Timeout"
  type        = number
  default     = 60
}

############################################
# DevOps Server
############################################

variable "devops_instance_type" {
  description = "DevOps EC2 Instance Type"
  type        = string
  default     = "t3.medium"
}

############################################
# Common Tags
############################################

variable "common_tags" {
  description = "Common tags applied to all AWS resources"

  type = map(string)

  default = {

    Project = "Employee-Management-System"

    Environment = "Production"

    ManagedBy = "Terraform"

    Owner = "Ujjwal Agarwal"

  }
}
