# Use Node.js LTS version as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN pnpm ci

# Install TypeScript and NestJS CLI globally
RUN pnpm install -g typescript @nestjs/cli

# Copy the entire project
COPY . .

# Install shared app dependencies
RUN cd /app/apps/shared && pnpm install

# Install client app dependencies
RUN cd /app/apps/client && pnpm install

# Install server app dependencies
RUN cd /app/apps/server && pnpm install

# Build the project
RUN cd /app/apps/client && pnpm run build
RUN cd /app/apps/server && pnpm run build

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["pnpm", "start"]
