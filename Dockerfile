FROM node:22.14-alpine3.20 AS build

ARG ENVIROMENT
ENV ENVIROMENT=$ENVIROMENT

RUN apk --no-cache add curl git
WORKDIR /app

COPY . .

RUN npm install --production=false

RUN npm run build

FROM node:22.14-alpine3.20 as production

ARG ENVIROMENT
ENV ENVIROMENT=$ENVIROMENT

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/migrations /app/migrations
COPY --from=build /app/package.json /app/

RUN mkdir -p /app/node_modules

COPY --from=build /app/node_modules/tiktoken /app/node_modules/tiktoken

# uglify-js is a dependency of mjml, not builded in the previous step
COPY --from=build /app/node_modules/uglify-js /app/node_modules/uglify-js

# dotenv is required at runtime via -r dotenv/config
COPY --from=build /app/node_modules/dotenv /app/node_modules/dotenv

CMD [ "npm", "start" ]
