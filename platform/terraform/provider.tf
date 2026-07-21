############################################
# AWS Provider
############################################

provider "aws" {

  region = var.aws_region

  default_tags {

    tags = local.common_tags

  }

}

############################################
# Caller Identity
############################################

data "aws_caller_identity" "current" {}

############################################
# AWS Region
############################################

data "aws_region" "current" {}
