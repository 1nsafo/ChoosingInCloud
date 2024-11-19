# MarketApp/views.py

import requests
from django.shortcuts import render
from .models import Product  # Если используете модель

def product_list(request):
    # Запрос к API Wildberries
    url = "https://content-api.wildberries.ru/content/v2/object/all"  # Замените на актуальный URL
    headers = {
        'Authorization': 'HeaderApiKey',  # Если нужен API ключ
    }
    
    # Получите параметры для лимита и смещения из запроса
    limit = request.GET.get('limit', 100)  # Количество товаров на странице (по умолчанию 100)
    page = request.GET.get('page', 1)  # Номер страницы (по умолчанию 1)
    offset = (int(page) - 1) * int(limit)  # Вычисляем смещение

    params = {
        'limit': limit,
        'locale': 'ru',
        'offset': offset,
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        products = data.get('data', [])
    except requests.exceptions.HTTPError as err:
        products = []
        error_message = f"Ошибка API: {err}"
    except Exception as e:
        products = []
        error_message = f"Произошла ошибка: {e}"

    # Пагинация: вычисляем общее количество страниц
    total_count = data.get('totalCount', 0) if 'data' in locals() else 0
    total_pages = (total_count // int(limit)) + (1 if total_count % int(limit) > 0 else 0)

    # Создаем список страниц для шаблона
    pages = list(range(1, total_pages + 1))

    context = {
        'products': products,
        'error_message': error_message if 'error_message' in locals() else None,
        'current_page': int(page),
        'total_pages': total_pages,
        'pages': pages,  # Передаем список страниц в шаблон
    }
    return render(request, 'MarketApp/main_page.html', context)