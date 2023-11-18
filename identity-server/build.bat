@echo off
echo Building Docker image...
docker build -t identity-server:1.0 .
echo Docker image built successfully!
echo Saving Docker image to file...
docker save identity-server:1.0 > identity-server.tar
echo Docker image saved to identity-server.tar!
