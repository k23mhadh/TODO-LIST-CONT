# First stage: Install dependencies and build the 
FROM node:19 AS build-stage

WORKDIR /app

COPY . .


RUN npm install


RUN npm run build:ts
RUN npm prune --production

# Second stage
FROM node:19

WORKDIR /app
COPY --from=build-stage /app /app

# Expose the port Fastify will run on
EXPOSE 3000

# Start the Fastify app
CMD ["npm", "run", "dev:start"]

