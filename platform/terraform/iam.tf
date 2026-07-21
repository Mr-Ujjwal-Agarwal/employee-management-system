############################################
# IAM Role - Frontend EC2
############################################

resource "aws_iam_role" "frontend_role" {

  name = "${local.name_prefix}-frontend-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = local.common_tags
}

############################################
# Frontend Instance Profile
############################################

resource "aws_iam_instance_profile" "frontend_profile" {

  name = "${local.name_prefix}-frontend-profile"

  role = aws_iam_role.frontend_role.name
}

############################################
# Attach SSM Policy
############################################

resource "aws_iam_role_policy_attachment" "frontend_ssm" {

  role       = aws_iam_role.frontend_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"

}

############################################
# IAM Role - Backend EC2
############################################

resource "aws_iam_role" "backend_role" {

  name = "${local.name_prefix}-backend-role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Principal = {

          Service = "ec2.amazonaws.com"

        }

        Action = "sts:AssumeRole"

      }

    ]

  })

  tags = local.common_tags

}

############################################
# Backend Instance Profile
############################################

resource "aws_iam_instance_profile" "backend_profile" {

  name = "${local.name_prefix}-backend-profile"

  role = aws_iam_role.backend_role.name

}

############################################
# Backend SSM
############################################

resource "aws_iam_role_policy_attachment" "backend_ssm" {

  role       = aws_iam_role.backend_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"

}

############################################
# Backend CloudWatch
############################################

resource "aws_iam_role_policy_attachment" "backend_cloudwatch" {

  role = aws_iam_role.backend_role.name

  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"

}

############################################
# IAM Role - DevOps EC2
############################################

resource "aws_iam_role" "devops_role" {

  name = "${local.name_prefix}-devops-role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Principal = {

          Service = "ec2.amazonaws.com"

        }

        Action = "sts:AssumeRole"

      }

    ]

  })

  tags = local.common_tags

}

############################################
# DevOps Instance Profile
############################################

resource "aws_iam_instance_profile" "devops_profile" {

  name = "${local.name_prefix}-devops-profile"

  role = aws_iam_role.devops_role.name

}

############################################
# AWS Managed Policies
############################################

resource "aws_iam_role_policy_attachment" "devops_ssm" {

  role       = aws_iam_role.devops_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"

}

resource "aws_iam_role_policy_attachment" "devops_cloudwatch" {

  role       = aws_iam_role.devops_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"

}

resource "aws_iam_role_policy_attachment" "devops_ecr" {

  role       = aws_iam_role.devops_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"

}

resource "aws_iam_role_policy_attachment" "devops_s3" {

  role       = aws_iam_role.devops_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"

}
