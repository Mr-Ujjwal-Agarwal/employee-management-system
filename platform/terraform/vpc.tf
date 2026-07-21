resource "aws_vpc" "main" {
cidr_block = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(
    local.common_tags,
    {
      Name = "employee-management-vpc"
    }
  )
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.main.id
cidr_block        = var.public_subnet_1_cidr
availability_zone = var.az1
  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags,
    {
      Name = "public-subnet-1"
    }
  )
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.main.id
cidr_block        = var.public_subnet_2_cidr
availability_zone = var.az2
  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags,
    {
      Name = "public-subnet-2"
    }
  )
}

resource "aws_subnet" "private_subnet_1" {
  vpc_id            = aws_vpc.main.id
cidr_block        = var.private_subnet_1_cidr
availability_zone = var.az1
  tags = merge(
    local.common_tags,
    {
      Name = "private-subnet-1"
    }
  )
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id            = aws_vpc.main.id
cidr_block        = var.private_subnet_2_cidr
availability_zone = var.az2
  tags = merge(
    local.common_tags,
    {
      Name = "private-subnet-2"
    }
  )
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    local.common_tags,
    {
      Name = "employee-management-igw"
    }
  )
}

resource "aws_eip" "nat_eip" {
  domain = "vpc"

  tags = merge(
    local.common_tags,
    {
      Name = "nat-eip"
    }
  )
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnet_1.id

  depends_on = [
    aws_internet_gateway.igw
  ]

  tags = merge(
    local.common_tags,
    {
      Name = "employee-management-nat"
    }
  )
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = merge(
    local.common_tags,
    {
      Name = "public-route-table"
    }
  )
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = merge(
    local.common_tags,
    {
      Name = "private-route-table"
    }
  )
}

resource "aws_route_table_association" "public_subnet_1" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_subnet_2" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_subnet_1" {
  subnet_id      = aws_subnet.private_subnet_1.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "private_subnet_2" {
  subnet_id      = aws_subnet.private_subnet_2.id
  route_table_id = aws_route_table.private_rt.id
}
