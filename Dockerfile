FROM node:24-alpine AS frontend

WORKDIR /frontend

COPY reserve-station/package*.json ./

RUN npm ci

COPY reserve-station/ .

RUN npm run build


FROM python:3.14-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ /app/

COPY --from=frontend /frontend/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["sh", "-c", "python manage.py migrate --noinput && /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf"]