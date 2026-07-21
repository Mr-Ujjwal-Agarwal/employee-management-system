############################################
# Database Subnet Group
############################################

resource "aws_db_subnet_group" "main" {

  name = local.db_subnet_group_name

  subnet_ids = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  tags = merge(
    local.common_tags,
    {
      Name = local.db_subnet_group_name
    }
  )
}

############################################
# MySQL RDS Instance
############################################

resource "aws_db_instance" "main" {

  identifier = local.db_identifier

  engine         = "mysql"
  engine_version = "8.0"

  instance_class = var.db_instance_class

  allocated_storage = var.db_allocated_storage
  storage_type      = "gp3"

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name = aws_db_subnet_group.main.name

  vpc_security_group_ids = [
    aws_security_group.database.id
  ]

  publicly_accessible = false

  multi_az = false

  backup_retention_period = 0

  skip_final_snapshot = true
  deletion_protection = false

  auto_minor_version_upgrade = true

  apply_immediately = true

  tags = merge(
    local.common_tags,
    {
      Name = local.db_identifier
    }
  )
}
