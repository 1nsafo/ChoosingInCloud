# MarketApp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product_list'),  # Главная страница с продуктами
    # path('product/<int:product_id>/', product_detail, name='product_detail'),  # Страница с деталями продукта
]