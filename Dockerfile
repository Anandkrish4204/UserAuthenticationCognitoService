FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 2999
ENV USER_POOL_ID us-east-1_cBgQgceAQ
ENV CLIENT_ID 3pp4gfk4pqsvf6vbmtbeho632f


EXPOSE ${PORT}

CMD ["npm","start"]