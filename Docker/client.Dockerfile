FROM node:20-alpine
WORKDIR /app

COPY discovermap.client/package*.json ./
RUN npm install

COPY discovermap.client/. .
EXPOSE 5174
CMD ["npm", "run", "dev", "--", "--host"]