############################################
# Remote State Configuration
############################################

/*
terraform {

  backend "s3" {

    bucket         = "employee-management-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "ap-south-1"

    dynamodb_table = "employee-management-terraform-lock"

    encrypt = true

  }

}
*/
