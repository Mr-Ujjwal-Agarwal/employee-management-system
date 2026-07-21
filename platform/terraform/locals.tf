############################################
# Local Values
############################################

locals {

  ##########################################
  # Naming Convention
  ##########################################

  name_prefix = "${var.project_name}-${var.environment}"

  ##########################################
  # Ports
  ##########################################

  ssh_port      = 22
  http_port     = 80
  https_port    = 443
  frontend_port = 80
  backend_port  = 5000
  mysql_port    = 3306
  jenkins_port  = 8080

  ##########################################
  # Protocols
  ##########################################

  tcp_protocol = "tcp"
  all_protocol = "-1"

  ##########################################
  # Resource Names
  ##########################################

  vpc_name = "${local.name_prefix}-vpc"

  internet_gateway_name = "${local.name_prefix}-igw"

  nat_gateway_name = "${local.name_prefix}-nat"

  public_route_table_name  = "${local.name_prefix}-public-rt"
  private_route_table_name = "${local.name_prefix}-private-rt"

  public_subnet_1_name = "${local.name_prefix}-public-subnet-1"
  public_subnet_2_name = "${local.name_prefix}-public-subnet-2"

  private_subnet_1_name = "${local.name_prefix}-private-subnet-1"
  private_subnet_2_name = "${local.name_prefix}-private-subnet-2"

  alb_name = "${local.name_prefix}-alb"

  alb_security_group_name      = "${local.name_prefix}-alb-sg"
  frontend_security_group_name = "${local.name_prefix}-frontend-sg"
  backend_security_group_name  = "${local.name_prefix}-backend-sg"
  database_security_group_name = "${local.name_prefix}-database-sg"
  devops_security_group_name   = "${local.name_prefix}-devops-sg"

  frontend_launch_template_name = "${local.name_prefix}-frontend-lt"
  backend_launch_template_name  = "${local.name_prefix}-backend-lt"

  frontend_asg_name = "${local.name_prefix}-frontend-asg"
  backend_asg_name  = "${local.name_prefix}-backend-asg"

  frontend_target_group_name = "ems-prod-fe-tg"
  backend_target_group_name  = "ems-prod-be-tg"

  db_subnet_group_name = "${local.name_prefix}-db-subnet-group"

  db_identifier = "${local.name_prefix}-mysql"

  frontend_repository_name = "employee-management-frontend"
  backend_repository_name  = "employee-management-backend"

  devops_instance_name = "${local.name_prefix}-devops"

  ##########################################
  # Common Tags
  ##########################################

  common_tags = merge(
    var.common_tags,
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  )

}
