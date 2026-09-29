FROM node:24-alpine AS frontend

WORKDIR /frontend

COPY reserve-station/package*.json ./

RUN npm ci

COPY reserve-station/ .

RUN npm run build


FROM python:3.14-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

COPY --from=frontend /frontend/dist /app/frontend_dist

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -f /etc/nginx/sites-enabled/default

EXPOSE 80

CMD ["sh", "-c", "daphne -b 127.0.0.1 -p 8000 backend.asgi:application & nginx -g 'daemon off;'"]