############################################
# AWS Provider Configuration
############################################

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Ujjwal Agarwal"
    }
  }
}

############################################
# AWS Account Identity
############################################

data "aws_caller_identity" "current" {}

############################################
# AWS Region
############################################

data "aws_region" "current" {}
