############################################
# Networking Outputs
############################################

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_1_id" {
  description = "Public Subnet 1 ID"
  value       = aws_subnet.public_1.id
}

output "public_subnet_2_id" {
  description = "Public Subnet 2 ID"
  value       = aws_subnet.public_2.id
}

output "private_subnet_1_id" {
  description = "Private Subnet 1 ID"
  value       = aws_subnet.private_1.id
}

output "private_subnet_2_id" {
  description = "Private Subnet 2 ID"
  value       = aws_subnet.private_2.id
}

############################################
# Load Balancer Outputs
############################################

output "alb_dns_name" {
  description = "Application Load Balancer DNS"
  value       = aws_lb.main.dns_name
}

output "alb_arn" {
  description = "Application Load Balancer ARN"
  value       = aws_lb.main.arn
}

############################################
# Auto Scaling Outputs
############################################

output "frontend_asg_name" {
  description = "Frontend Auto Scaling Group"
  value       = aws_autoscaling_group.frontend.name
}

output "backend_asg_name" {
  description = "Backend Auto Scaling Group"
  value       = aws_autoscaling_group.backend.name
}

############################################
# Database Outputs
############################################

output "database_endpoint" {
  description = "RDS Endpoint"
  value       = aws_db_instance.main.endpoint
}

output "database_name" {
  description = "Database Name"
  value       = aws_db_instance.main.db_name
}

############################################
# ECR Outputs
############################################

output "frontend_repository_url" {
  description = "Frontend ECR Repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "backend_repository_url" {
  description = "Backend ECR Repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

############################################
# DevOps Outputs
############################################

output "devops_instance_id" {
  description = "DevOps Instance ID"
  value       = aws_instance.devops.id
}

output "devops_public_ip" {
  description = "DevOps Public IP"
  value       = aws_instance.devops.public_ip
}
