#!/bin/bash

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

if nc -z localhost 5173 2>/dev/null; then
    PORT=$(find_port 5174)
    echo "Port 5173 in use, using port $PORT"
else
    PORT=5173
fi

sed -i "s/- \"5173:5173\"/- \"$PORT:5173\"/" docker-compose.yml
docker compose up -d
sed -i "s/- \"$PORT:5173\"/- \"5173:5173\"/" docker-compose.yml
echo "Docs available at http://localhost:$PORT"