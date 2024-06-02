"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 4.2.13.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import datetime
from pathlib import Path

from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-_)+@i*5b*idvfqm896@977q+n4vy+^fk-+#0r)e1)%g#ij%2$o"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party apps
    "rest_framework_simplejwt.token_blacklist",
    "rest_framework",
    "drf_yasg",
    "django_filters",
    "corsheaders",
    "thumbnails",
    # Local apps
    "apps.user",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "assets" / "static"]
STATIC_ROOT = BASE_DIR / "assets" / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "assets" / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom User model
AUTH_USER_MODEL = "user.User"


# Cors headers
# https://pypi.org/project/django-cors-headers/
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

# Simple JWT
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",)
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Ingrese 'Bearer <token>' como valor",
        }
    },
    "USE_SESSION_AUTH": False,
    "JSON_EDITOR": True,
    "api_key": "",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": datetime.timedelta(minutes=1),
    "REFRESH_TOKEN_LIFETIME": datetime.timedelta(days=3),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

# Configuración de envío de correos
# https://docs.djangoproject.com/en/4.2/topics/email/
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_PORT = config("EMAIL_PORT")

# Configuración de django-tumbnails
# https://pypi.org/project/django-thumbnails/
THUMBNAILS = {
    # "METADATA": {
    #     "PREFIX": "thumbs",
    #     "BACKEND": "thumbnails.backends.metadata.RedisBackend",
    #     "db": 2,
    #     "port": 6379,
    #     "host": "localhost",
    # },
    "STORAGE": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
        # You can also use Amazon S3 or any other Django storage backends
    },
    "SIZES": {
        "small": {
            "PROCESSORS": [{"PATH": "thumbnails.processors.resize", "width": 500}],
            "POST_PROCESSORS": [
                {
                    "PATH": "thumbnails.post_processors.optimize",
                    "png_command": 'optipng -force -o7 "%(filename)s"',
                    "jpg_command": 'jpegoptim -f --strip-all "%(filename)s"',
                },
            ],
        },
        "medium": {
            "PROCESSORS": [
                {"PATH": "thumbnails.processors.resize", "width": 750},
            ],
            "POST_PROCESSORS": [
                {
                    "PATH": "thumbnails.post_processors.optimize",
                    "png_command": 'optipng -force -o7 "%(filename)s"',
                    "jpg_command": 'jpegoptim -f --strip-all "%(filename)s"',
                },
            ],
        },
        "large": {
            "PROCESSORS": [
                {"PATH": "thumbnails.processors.resize", "width": 1000},
            ],
            "POST_PROCESSORS": [
                {
                    "PATH": "thumbnails.post_processors.optimize",
                    "png_command": 'optipng -force -o7 "%(filename)s"',
                    "jpg_command": 'jpegoptim -f --strip-all "%(filename)s"',
                },
            ],
        },
        "watermarked": {
            "PROCESSORS": [
                {"PATH": "thumbnails.processors.resize", "width": 20, "height": 20},
                # Only supports PNG. File must be of the same size with
                # thumbnail (20 x 20 in this case)
                {"PATH": "thumbnails.processors.add_watermark", "watermark_path": "watermark.png"},
            ],
        },
    },
}
