from django.urls import path,include
from . import views


urlpatterns = [
    path('wishes_list/', views.wish_list, name='add_wish'),
]