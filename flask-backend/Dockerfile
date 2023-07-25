FROM python:3.11
ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
ENV PORT 5000
WORKDIR $APP_HOME
COPY . ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app