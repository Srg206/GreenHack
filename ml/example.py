from recsys import RecSys
from fuzzy import FuzzySearch

# пример данных о пользователях
users_data = [
    {
        'user_id': '16547468',
        'search_history': ['выставка экологии', 'конференция про чернозем', 'спасение планеты', 'зеленая выставка'],
        'interests': ['выставки', 'конференции', 'земля'],
        'favorites': ['Всемирная конференция по экологии в Ростове-на-Дону 2024']
    },
    {
        'user_id': '246688933',
        'search_history': ['посадки леса', 'день земли', 'экологический фестиваль', 'сохранение лесов'],
        'interests': ['экология', 'фестивали', 'лес'],
        'favorites': ['Экологический фестиваль в Санкт-Петербурге']
    },
]

# пример данных о мероприятиях
events_data = [
    {
        'event_id': '45678095432', 
        'name': 'Всемирная конференция по экологии в Ростове-на-Дону 2024', 
        'category': 'конференции'
    },
    {
        'event_id': '543578987536', 
        'name': 'Зеленая выставка в Москве', 
        'category': 'выставки'
    },
    {
        'event_id': '65757998745', 
        'name': 'Экологический фестиваль в Санкт-Петербурге', 
        'category': 'фестивали'
    }
]

recsys = RecSys(users_data, events_data)

# пример получения персонализированных рекомендаций для пользователя
user_id = '16547468'
recommendations = recsys.hybrid_recommendation(user_id, top_n=5)
print(f'Рекомендации для пользователя {user_id}: {recommendations}')

# пример добавления нового пользователя
new_user = {
    'user_id': '6558909875674563',
    'search_history': ['экологический туризм', 'устойчивое развитие', 'очистка рек'],
    'interests': ['туризм', 'реки', 'экология'],
    'favorites': ['Зеленая выставка в Москве']
}

recsys.add_user(new_user)

# пример добавления нового мероприятия
new_event = {
    'event_id': '98746321532', 
    'name': 'Всемирная конференция по вскапыванию чернозёма', 
    'category': 'конференции'
}

recsys.add_event(new_event)

# пример получения персонализированных рекомендаций для нового пользователя
new_user_id = '6558909875674563'
new_recommendations = recsys.hybrid_recommendation(new_user_id, top_n=5)
print(f'Рекомендации для нового пользователя {new_user_id}: {new_recommendations}')

# пример обновления данных существующего пользователя
updated_user = {
    'user_id': '6558909875674563',
    'search_history': ['экологический туризм', 'устойчивое развитие', 'очистка рек', 'новый запрос'],
    'interests': ['туризм', 'реки', 'экология', 'новый интерес'],
    'favorites': ['Зеленая выставка в Москве', 'новое избранное']
}

recsys.update_user(updated_user)

recommendations_after_update = recsys.hybrid_recommendation('6558909875674563', top_n=5)
print(f'Обновленные рекомендации для пользователя: {recommendations_after_update}')

fs = FuzzySearch(events_data)

# пример нечеткого поиска по запросу
fs.search('конференция', limit=10)

# пример добавления нового события в систему нечеткого поиска
fs.add_event(new_event)