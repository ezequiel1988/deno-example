FROM denoland/deno:1.17.1

WORKDIR /app

USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

CMD ["run", "--allow-all", "main.ts"]