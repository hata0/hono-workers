FROM node:23.3.0-bookworm-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# tini は PID 1 問題対策
# openssl は prisma が使うため
# procps はホットリロードを使うため
# 最後の削除処理はキャッシュを消すため
RUN apt-get update && apt-get -qq install -y --no-install-recommends \
  tini \
  openssl \
  procps \
  && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY --chown=node:node . .

USER node
