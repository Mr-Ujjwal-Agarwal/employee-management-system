############################################
# EC2 IAM Role
############################################

resource "aws_iam_role" "ec2_role" {

  name = "${local.name_prefix}-ec2-role"

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
# Attach AmazonSSMManagedInstanceCore
############################################

resource "aws_iam_role_policy_attachment" "ssm" {

  role = aws_iam_role.ec2_role.name

  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"

}

############################################
# Attach CloudWatch Agent Policy
############################################

resource "aws_iam_role_policy_attachment" "cloudwatch" {

  role = aws_iam_role.ec2_role.name

  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"

}

############################################
# Attach ECR Read Only
############################################

resource "aws_iam_role_policy_attachment" "ecr_readonly" {

  role = aws_iam_role.ec2_role.name

  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"

}

############################################
# Custom Policy
############################################

resource "aws_iam_policy" "ec2_custom" {

  name = "${local.name_prefix}-ec2-custom-policy"

  description = "Custom policy for EC2"

  policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Action = [

          "s3:*",

          "logs:*",

          "cloudwatch:*",

          "ec2:Describe*",

          "elasticloadbalancing:Describe*"

        ]

        Resource = "*"

      }

    ]

  })

}

############################################
# Attach Custom Policy
############################################

resource "aws_iam_role_policy_attachment" "custom" {

  role = aws_iam_role.ec2_role.name

  policy_arn = aws_iam_policy.ec2_custom.arn

}

############################################
# IAM Instance Profile
############################################

resource "aws_iam_instance_profile" "ec2_profile" {

  name = "${local.name_prefix}-instance-profile"

  role = aws_iam_role.ec2_role.name

}
