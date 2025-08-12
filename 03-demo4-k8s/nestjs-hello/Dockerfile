# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# ===== Stage 2: Runtime =====
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only built artifacts and prod dependencies
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Run the app
CMD ["node", "dist/main.js"]

EXPOSE 3000
