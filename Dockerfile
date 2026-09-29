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

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

COPY --from=frontend /frontend/dist /app/frontend_dist

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]