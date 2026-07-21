variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR Block"
  type        = string
}

variable "public_subnet_1_cidr" {
  description = "Public Subnet 1 CIDR"
  type        = string
}

variable "public_subnet_2_cidr" {
  description = "Public Subnet 2 CIDR"
  type        = string
}

variable "private_subnet_1_cidr" {
  description = "Private Subnet 1 CIDR"
  type        = string
}

variable "private_subnet_2_cidr" {
  description = "Private Subnet 2 CIDR"
  type        = string
}

variable "az1" {
  description = "Availability Zone 1"
  type        = string
}

variable "az2" {
  description = "Availability Zone 2"
  type        = string
}
