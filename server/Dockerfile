# Stage 1: Build
FROM node:22 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the project
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Define the command to run the application
CMD ["node", "dist/main.js"]
