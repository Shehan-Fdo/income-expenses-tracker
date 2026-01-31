#!/bin/bash

# Stop nginx temporarily
systemctl stop nginx

# Get SSL certificate
certbot certonly --standalone -d tracker.kavindushehan.site --non-interactive --agree-tos --email me@kavindushehan.site

# Start nginx
systemctl start nginx

echo "SSL certificate obtained successfully!"
