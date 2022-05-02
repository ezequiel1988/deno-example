FROM denoland/deno:1.21.1

WORKDIR /app

USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

CMD deno run --allow-net --allow-env server.ts