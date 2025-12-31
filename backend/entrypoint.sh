#!/bin/sh

# Run migrations
python manage.py migrate

if [ "$RUN_MODE" = "production" ]; then
    echo "Starting in PRODUCTION mode with gunicorn"
    # Collect static files if needed
    python manage.py collectstatic --noinput
    exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
else
    echo "Starting in DEVELOPMENT mode with runserver"
    exec python manage.py runserver 0.0.0.0:8000
fi
