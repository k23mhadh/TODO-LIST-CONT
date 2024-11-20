FROM node:19 AS build-stage

WORKDIR /app

COPY . .


RUN npm install


RUN npm run build
RUN npm prune --production

# Second stage
FROM node:19

WORKDIR /app
COPY --from=build-stage /app /app


EXPOSE 3006

# Start the Fastify app
CMD ["npm", "run", "start"]
