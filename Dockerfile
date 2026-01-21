# filename: Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install only production deps for final image
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --prefer-offline --no-audit

# Copy source
COPY src ./src

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000
CMD ["node", "src/server.js"]
