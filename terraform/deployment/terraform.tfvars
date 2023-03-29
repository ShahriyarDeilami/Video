# General
service_name			= "video"
aws_region              = "ca-central-1"
account_id 				= "your-account-id"
image_tag               = "video" 
# VPC
vpc_name                = "video"
main_vpc_cidr = "10.0.0.0/24"
public_subnet_cidr_blocks = "10.0.0.128/26"
private_subnet_cidr_blocks = "10.0.0.192/26"