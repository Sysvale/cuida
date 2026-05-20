FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash git

COPY package*.json ./

RUN if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "docs:dev", "--", "--host", "0.0.0.0"]
