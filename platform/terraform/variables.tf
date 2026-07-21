############################################
# General Configuration
############################################

variable "project_name" {
  description = "Project Name"
  type        = string
  default     = "employee-management-system"
}

variable "environment" {
  description = "Deployment Environment"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

############################################
# Networking
############################################

variable "vpc_cidr" {
  description = "VPC CIDR Block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  type    = string
  default = "10.0.2.0/24"
}

variable "private_subnet_1_cidr" {
  type    = string
  default = "10.0.11.0/24"
}

variable "private_subnet_2_cidr" {
  type    = string
  default = "10.0.12.0/24"
}

############################################
# Availability Zones
############################################

variable "availability_zone_1" {
  type    = string
  default = "ap-south-1a"
}

variable "availability_zone_2" {
  type    = string
  default = "ap-south-1b"
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
  description = "EC2 Key Pair"
  type        = string
}

############################################
# Auto Scaling
############################################

variable "desired_capacity" {
  type    = number
  default = 2
}

variable "min_size" {
  type    = number
  default = 2
}

variable "max_size" {
  type    = number
  default = 4
}

############################################
# Database
############################################

variable "db_name" {
  type    = string
  default = "emsdb"
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "db_instance_class" {
  type    = string
  default = "db.t3.micro"
}

############################################
# Tags
############################################

variable "common_tags" {
  description = "Common Resource Tags"
  type        = map(string)

  default = {
    Project     = "Employee-Management-System"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}
