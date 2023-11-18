@echo off
echo Building Docker image...
docker build -t notification-server:1.0 .
echo Docker image built successfully!
echo Saving Docker image to file...
docker save notification-server:1.0 > notification-server.tar
echo Docker image saved to notification-server.tar!
echo Removing Docker image...
docker rmi notification-server:1.0
echo Docker image removed successfully!