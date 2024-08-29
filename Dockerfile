# syntax=docker/dockerfile:1
ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-alpine3.20 as base

RUN mkdir /app && chown node:node /app
WORKDIR /app
# Expose the port that the application listens on.
EXPOSE 3000

# FOR DEVELOPMENT
FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

COPY --chown=node:node . .
RUN chown -R node:node /app/node_modules

USER node
# CMD npm run dev
CMD node src/index.js

# FOR PRODUCTION
FROM base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
# COPY --chown=node:node package.json package-lock.json* ./

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

RUN chown -R node:node /app/node_modules

USER node
# Run the application.
CMD node src/index.js