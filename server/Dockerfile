#  Dockerfile for Node Express Backend

FROM node:16-alpine

# Create App Directory
WORKDIR /usr/src/app

COPY ./package.json ./

# Install Dependencies


RUN NODE_OPTIONS="--max-old-space-size=8192" npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]