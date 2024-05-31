# Django Notes

django-admin startproject "nombre_projecto" .

python manage.py startapp "nombreapp"

python manage.py makemigrations "nombre app"

python manage.py migrate

python3 manage.py createsuperuser 

python3 manage.py runserver

# Documentación de migrations
https://docs.djangoproject.com/en/4.0/topics/migrations/

# Copiar a portapapeles
pwd | pbcopy

# venv
coreapi==2.3.3  
django-cors-headers==4.3.1  
django-filter==24.2  
djangorestframework-simplejwt==5.3.1  
drf-yasg==1.21.7  
pillow==10.3.0  
pip-chill==1.0.3  
python-decouple==3.8  


# Listar servidores que se van a permitir conectar
https://pypi.org/project/django-cors-headers/

CORS_ALLOWED_ORIGINS = [  
    "http://localhost:5173",  
]  

# Documentación de la API
https://www.django-rest-framework.org/community/3.10-announcement/

REST_FRAMEWORK = {  
    ...: ...,  
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",  
}  

# Otra libreria de documentacion 
https://drf-yasg.readthedocs.io/en/stable/readme.html?highlight=usage#usage


# .env config
EMAIL_HOST=  
EMAIL_HOST_USER=  
EMAIL_HOST_PASSWORD=  
EMAIL_PORT=  
EMAIL_FROM=  
EMAIL_SUBJECT=  
HTTP_HTTPS_PROTOCOL=  
HOST_DOMAIN=  