############################################
# DevOps EC2 Instance
############################################

resource "aws_instance" "devops" {

  ami           = var.ami_id
  instance_type = var.devops_instance_type
  key_name      = var.key_name

  subnet_id = aws_subnet.public_1.id

  vpc_security_group_ids = [
    aws_security_group.devops.id
  ]

  iam_instance_profile = aws_iam_instance_profile.devops_profile.name

  associate_public_ip_address = true

  user_data = file(
    "${path.module}/scripts/devops-userdata.sh"
  )

  tags = merge(
    local.common_tags,
    {
      Name = local.devops_instance_name
      Role = "DevOps"
    }
  )
}

