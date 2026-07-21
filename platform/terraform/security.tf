############################################
# Application Load Balancer Security Group
############################################

resource "aws_security_group" "alb" {

  name        = local.alb_security_group_name
  description = "Application Load Balancer Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "HTTP"

    from_port = local.http_port

    to_port = local.http_port

    protocol = local.tcp_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {

    description = "HTTPS"

    from_port = local.https_port

    to_port = local.https_port

    protocol = local.tcp_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = local.all_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {
    Name = local.alb_security_group_name
  })

}

############################################
# Frontend Security Group
############################################

resource "aws_security_group" "frontend" {

  name        = local.frontend_security_group_name
  description = "Frontend Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "HTTP From ALB"

    from_port = local.http_port

    to_port = local.http_port

    protocol = local.tcp_protocol

    security_groups = [
      aws_security_group.alb.id
    ]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = local.all_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {
    Name = local.frontend_security_group_name
  })

}

############################################
# Backend Security Group
############################################

resource "aws_security_group" "backend" {

  name        = local.backend_security_group_name
  description = "Backend Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "Application Traffic"

    from_port = local.backend_port

    to_port = local.backend_port

    protocol = local.tcp_protocol

    security_groups = [
      aws_security_group.frontend.id
    ]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = local.all_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {
    Name = local.backend_security_group_name
  })

}

############################################
# Database Security Group
############################################

resource "aws_security_group" "database" {

  name        = local.database_security_group_name
  description = "Database Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "MySQL"

    from_port = local.mysql_port

    to_port = local.mysql_port

    protocol = local.tcp_protocol

    security_groups = [
      aws_security_group.backend.id
    ]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = local.all_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {
    Name = local.database_security_group_name
  })

}

############################################
# DevOps Security Group
############################################

resource "aws_security_group" "devops" {

  name        = local.devops_security_group_name
  description = "DevOps Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {

    description = "SSH"

    from_port = local.ssh_port

    to_port = local.ssh_port

    protocol = local.tcp_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {

    description = "Jenkins"

    from_port = local.jenkins_port

    to_port = local.jenkins_port

    protocol = local.tcp_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {

    from_port = 0

    to_port = 0

    protocol = local.all_protocol

    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = merge(local.common_tags, {
    Name = local.devops_security_group_name
  })

}
