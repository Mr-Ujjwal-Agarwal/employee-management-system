############################################
# Application Load Balancer Security Group
############################################

resource "aws_security_group" "alb" {
  name        = local.alb_sg_name
  description = "Security Group for ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = local.alb_sg_name
  })
}

############################################
# Frontend Security Group
############################################

resource "aws_security_group" "frontend" {

  name        = local.frontend_sg_name
  description = "Frontend Servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "HTTP From ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    description = "SSH From DevOps"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = [
      aws_security_group.devops.id
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = local.frontend_sg_name
  })
}

############################################
# Backend Security Group
############################################

resource "aws_security_group" "backend" {

  name        = local.backend_sg_name
  description = "Backend Servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Application Traffic"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  ingress {
    description = "SSH From DevOps"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = [
      aws_security_group.devops.id
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = local.backend_sg_name
  })
}

############################################
# DevOps Security Group
############################################

resource "aws_security_group" "devops" {

  name        = local.devops_sg_name
  description = "DevOps Server"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "SSH"

    from_port = 22

    to_port = 22

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {

    description = "Jenkins"

    from_port = 8080

    to_port = 8080

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {

    Name = local.devops_sg_name

  })

}

############################################
# Database Security Group
############################################

resource "aws_security_group" "database" {

  name        = local.database_sg_name

  description = "RDS Database"

  vpc_id = aws_vpc.main.id

  ingress {

    description = "MySQL"

    from_port = 3306

    to_port = 3306

    protocol = "tcp"

    security_groups = [

      aws_security_group.backend.id

    ]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {

    Name = local.database_sg_name

  })

}
