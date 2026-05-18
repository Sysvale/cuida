#!/bin/bash

set -e

find_port() {
    local port=$1
    while :; do
        if ! nc -z localhost "$port" 2>/dev/null; then
            echo "$port"
            return 0
        fi
        ((port++))
    done
}

restore_compose() {
    sed -i '' "s/- \"$PORT:5173\"/- \"5173:5173\"/" docker-compose.yml 2>/dev/null || \
    sed -i "s/- \"$PORT:5173\"/- \"5173:5173\"/" docker-compose.yml
}

if nc -z localhost 5173 2>/dev/null; then
    PORT=$(find_port 5174)
    echo "Port 5173 in use, using port $PORT"
else
    PORT=5173
fi

# Use temp file for cross-platform sed
cp docker-compose.yml docker-compose.yml.bak
trap 'mv docker-compose.yml.bak docker-compose.yml' EXIT

# macOS compatible sed (add empty string after -i)
sed -i '' "s/- \"5173:5173\"/- \"$PORT:5173\"/" docker-compose.yml 2>/dev/null || \
sed -i "s/- \"5173:5173\"/- \"$PORT:5173\"/" docker-compose.yml

if ! docker compose up -d; then
    echo "Docker compose failed, restoring original docker-compose.yml"
    mv docker-compose.yml.bak docker-compose.yml
    exit 1
fi

# Restore original (remove trap first)
trap - EXIT
mv docker-compose.yml.bak docker-compose.yml

echo "Docs available at http://localhost:$PORT"