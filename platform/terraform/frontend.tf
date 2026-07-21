############################################
# Frontend Launch Template
############################################

resource "aws_launch_template" "frontend" {

  name_prefix   = "${local.name_prefix}-frontend-"
  image_id      = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [
    aws_security_group.frontend.id
  ]

  iam_instance_profile {
    name = aws_iam_instance_profile.frontend_profile.name
  }

  user_data = base64encode(
    file("${path.module}/scripts/frontend-userdata.sh")
  )

  update_default_version = true

  tag_specifications {

    resource_type = "instance"

    tags = merge(
      local.common_tags,
      {
        Name = "${local.name_prefix}-frontend"
        Role = "Frontend"
      }
    )
  }

  tags = merge(
    local.common_tags,
    {
      Name = local.frontend_launch_template_name
    }
  )
}

############################################
# Backend Launch Template
############################################

resource "aws_launch_template" "backend" {

  name_prefix   = "${local.name_prefix}-backend-"
  image_id      = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [
    aws_security_group.backend.id
  ]

  iam_instance_profile {
    name = aws_iam_instance_profile.backend_profile.name
  }

  user_data = base64encode(
    file("${path.module}/scripts/backend-userdata.sh")
  )

  update_default_version = true

  tag_specifications {

    resource_type = "instance"

    tags = merge(
      local.common_tags,
      {
        Name = "${local.name_prefix}-backend"
        Role = "Backend"
      }
    )
  }

  tags = merge(
    local.common_tags,
    {
      Name = local.backend_launch_template_name
    }
  )
}

############################################
# Frontend Auto Scaling Group
############################################

resource "aws_autoscaling_group" "frontend" {

  name = local.frontend_asg_name

  min_size         = var.frontend_min_size
  desired_capacity = var.frontend_desired_size
  max_size         = var.frontend_max_size

  vpc_zone_identifier = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  target_group_arns = [
    aws_lb_target_group.frontend.arn
  ]

  health_check_type         = "ELB"
  health_check_grace_period = 300

  launch_template {

    id      = aws_launch_template.frontend.id
    version = "$Latest"

  }

  tag {

    key                 = "Name"
    value               = "${local.name_prefix}-frontend"
    propagate_at_launch = true

  }

  tag {

    key                 = "Role"
    value               = "Frontend"
    propagate_at_launch = true

  }

  dynamic "tag" {

    for_each = local.common_tags

    content {

      key                 = tag.key
      value               = tag.value
      propagate_at_launch = true

    }

  }

  lifecycle {

    create_before_destroy = true

  }

}

############################################
# Backend Auto Scaling Group
############################################

resource "aws_autoscaling_group" "backend" {

  name = local.backend_asg_name

  min_size         = var.backend_min_size
  desired_capacity = var.backend_desired_size
  max_size         = var.backend_max_size

  vpc_zone_identifier = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  health_check_type         = "EC2"
  health_check_grace_period = 300

  launch_template {

    id      = aws_launch_template.backend.id
    version = "$Latest"

  }

  tag {

    key                 = "Name"
    value               = "${local.name_prefix}-backend"
    propagate_at_launch = true

  }

  tag {

    key                 = "Role"
    value               = "Backend"
    propagate_at_launch = true

  }

  dynamic "tag" {

    for_each = local.common_tags

    content {

      key                 = tag.key
      value               = tag.value
      propagate_at_launch = true

    }

  }

  lifecycle {

    create_before_destroy = true

  }

}
