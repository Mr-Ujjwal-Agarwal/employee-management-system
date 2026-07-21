############################################
# Local Values
############################################

locals {

  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = merge(
    var.common_tags,
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Ujjwal Agarwal"
    }
  )

  ############################################
  # Resource Names
  ############################################

  vpc_name = "${local.name_prefix}-vpc"

  public_subnet_1_name = "${local.name_prefix}-public-subnet-1"
  public_subnet_2_name = "${local.name_prefix}-public-subnet-2"

  private_subnet_1_name = "${local.name_prefix}-private-subnet-1"
  private_subnet_2_name = "${local.name_prefix}-private-subnet-2"

  frontend_sg_name = "${local.name_prefix}-frontend-sg"
  backend_sg_name  = "${local.name_prefix}-backend-sg"
  alb_sg_name      = "${local.name_prefix}-alb-sg"
  devops_sg_name   = "${local.name_prefix}-devops-sg"
  database_sg_name = "${local.name_prefix}-database-sg"

  frontend_lt_name = "${local.name_prefix}-frontend-lt"
  backend_lt_name  = "${local.name_prefix}-backend-lt"

  frontend_asg_name = "${local.name_prefix}-frontend-asg"
  backend_asg_name  = "${local.name_prefix}-backend-asg"

  alb_name = "${local.name_prefix}-alb"

  frontend_tg_name = "frontend-tg"
  backend_tg_name  = "backend-tg"

  db_identifier = "${local.name_prefix}-mysql"

  frontend_repository = "employee-management-frontend"
  backend_repository  = "employee-management-backend"

  devops_instance_name = "${local.name_prefix}-devops"

}
