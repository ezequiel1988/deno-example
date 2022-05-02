FROM denoland/deno:1.17.1
EXPOSE 8080
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno cache server.ts
RUN mkdir -p /var/tmp/log

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "server.ts"]