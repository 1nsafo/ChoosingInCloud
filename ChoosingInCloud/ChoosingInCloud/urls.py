# myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # URL для административной панели
    path('marketplace/', include('MarketApp.urls')),  # Подключение маршрутов из приложения MarketApp
]