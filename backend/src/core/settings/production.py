from .base import *
from ..utils import get_env
import os
from dotenv import load_dotenv

load_dotenv('../../../.env')

DEBUG = False
SECRET_KEY = get_env("DJANGO_SECRET_KEY")
CORS_ALLOWED_ORIGINS = get_env("CORS_ALLOWED_ORIGINS").split(",")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "PORT": get_env("POSTGRES_PORT"),
        "HOST": get_env("POSTGRES_HOST"),
        "NAME": get_env("POSTGRES_DB"),
        "USER": get_env("POSTGRES_USER"),
        "PASSWORD": get_env("POSTGRES_PASSWORD"),
    }
}
FRONTEND_VERIFY_URL = get_env("FRONTEND_VERIFY_URL")

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = get_env("EMAIL_HOST")
EMAIL_USE_TLS = get_env("EMAIL_USE_TLS")
EMAIL_PORT = get_env("EMAIL_PORT")
EMAIL_HOST_USER = get_env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = get_env("EMAIL_HOST_PASSWORD")
