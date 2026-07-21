############################################
# Application Load Balancer
############################################

resource "aws_lb" "main" {

  name               = local.alb_name
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.alb.id
  ]

  subnets = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]

  idle_timeout = var.alb_idle_timeout

  enable_deletion_protection = false

  tags = merge(
    local.common_tags,
    {
      Name = local.alb_name
    }
  )
}

############################################
# Frontend Target Group
############################################

resource "aws_lb_target_group" "frontend" {

  name        = local.frontend_target_group_name
  port        = local.http_port
  protocol    = "HTTP"
  target_type = "instance"

  vpc_id = aws_vpc.main.id

  health_check {

    enabled             = true
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2

    protocol = "HTTP"
    port     = "traffic-port"

    path = "/"

    matcher = "200"

  }

  tags = merge(
    local.common_tags,
    {
      Name = local.frontend_target_group_name
    }
  )
}

############################################
# HTTP Listener
############################################

resource "aws_lb_listener" "http" {

  load_balancer_arn = aws_lb.main.arn

  port     = local.http_port
  protocol = "HTTP"

  default_action {

    type = "forward"

    target_group_arn = aws_lb_target_group.frontend.arn

  }

}
