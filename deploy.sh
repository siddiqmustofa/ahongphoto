#!/bin/bash

echo "🚀 GlowBox Deployment Script"
echo "============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

echo "✓ Docker and Docker Compose found"
echo ""

# Create .env file if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Backend Environment
RESEND_API_KEY=re_your_api_key_here
SENDER_EMAIL=noreply@glowbox.app
APP_URL=http://localhost

# Frontend Environment  
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
    echo "✓ .env file created. Please update with your actual values."
    echo ""
fi

# Build and start containers
echo "Building Docker images..."
docker-compose build

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
    echo ""
    echo "Starting containers..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✓ Containers started successfully"
        echo ""
        echo "🎉 GlowBox is now running!"
        echo ""
        echo "Access the application at:"
        echo "  Frontend: http://localhost"
        echo "  Backend:  http://localhost:8001"
        echo "  API Docs: http://localhost:8001/docs"
        echo ""
        echo "To view logs: docker-compose logs -f"
        echo "To stop:      docker-compose down"
        echo ""
    else
        echo "❌ Failed to start containers"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi