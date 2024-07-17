"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

get_schema_view = get_schema_view(
    openapi.Info(
        title="E-commerce Backend APIs",
        default_version="v1",
        description="This is documentation for the E-commerce Backend APIs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="test1@mail.com", name="test1"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # URLs de la documentación
    path("", get_schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    # URLs de las aplicaciones
    path("admin/", admin.site.urls),
    path("api/", include("apps.account.api_rest.routers")),
    path("api/", include("apps.product.api_rest.routers")),
    path("api/", include("apps.product_vendor.api_rest.routers")),
    path("api/", include("apps.shipping_information.api_rest.routers")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
