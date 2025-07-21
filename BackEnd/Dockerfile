FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Instala dependências
COPY BackEnd/requeriments.txt .
RUN pip install --upgrade pip \
 && pip install -r requeriments.txt

# Copia o código do backend
COPY BackEnd/ .

# Cria pasta para estáticos
RUN mkdir -p /app/staticfiles

# Padrão de execução
CMD ["bash", "-lc", "python manage.py runserver 0.0.0.0:8000"]
