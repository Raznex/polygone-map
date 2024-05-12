FROM python:3.12

# Обновляем пакетный менеджер
RUN apt-get update -y && apt-get upgrade -y

# Ставим зависимости GDAL, PROJ
RUN apt-get install -y gdal-bin libgdal-dev
RUN apt-get install -y python3-gdal
RUN apt-get install -y binutils libproj-dev

WORKDIR /app

COPY .. .

RUN pip install -r requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8001
