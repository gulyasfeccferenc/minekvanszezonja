###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN apk add --no-cache alpine-sdk python3

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN yarn install #--only=production && npm cache clean --force

# Run the build command which creates the production bundle
RUN yarn run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/build ./dist

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the server using the production build
CMD [ "npx", "serve", "dist" ]
