# ================================
# 🏗️ Stage 1: Builder
# ================================
FROM node:22-slim AS builder

WORKDIR /app

# Copy only dependency files first (for caching)
COPY package*.json ./

# Install all deps (including dev deps for build)
RUN npm ci

# Copy the rest of the source
COPY . .

# Build Next.js app
RUN npm run build

# ================================
# 🏃‍♂️ Stage 2: Runner
# ================================
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy required files from builder
COPY --from=builder --chown=appuser:appuser /app/package*.json ./
COPY --from=builder --chown=appuser:appuser /app/.next ./.next
COPY --from=builder --chown=appuser:appuser /app/public ./public
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/src ./src
COPY --from=builder --chown=appuser:appuser /app/tsconfig.json ./tsconfig.json

# Switch to app user
USER appuser

# Expose port 3000
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
