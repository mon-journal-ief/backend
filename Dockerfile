# Use Node.js 20 Alpine
FROM node:20-bookworm

RUN npx -y playwright@1.55.0 install --with-deps

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma:generate

# Build the application
RUN pnpm build

# Copy the built files to the expected location
RUN cp -r dist/src/* dist/ && rm -rf dist/src

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chmod 755 uploads

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of uploads directory to nodejs user
RUN chown -R nodejs:nodejs uploads generated

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 4000

# Start the application
CMD ["pnpm", "start"]