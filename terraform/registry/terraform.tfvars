namespace          = "SD"
name               = "app"
images_bucket_name = "app-images"
status             = "active"
registry_name = "video-app"

aws_region  = "ca-central-1"


profile = {
  dev     = "devSD"
  prod    = "prodSD"
}

log_retention_days = {
  dev     = 30
  prod    = 90
}

domain = {
  dev     = "images.dev.SD.com"
  prod    = "images.SD.com"
}

transition_days = {
  dev     = 30
  prod    = 90
}
