############################################
# Frontend ECR Repository
############################################

resource "aws_ecr_repository" "frontend" {

  name = local.frontend_repository_name

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = merge(
    local.common_tags,
    {
      Name = local.frontend_repository_name
    }
  )
}

############################################
# Backend ECR Repository
############################################

resource "aws_ecr_repository" "backend" {

  name = local.backend_repository_name

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = merge(
    local.common_tags,
    {
      Name = local.backend_repository_name
    }
  )
}
