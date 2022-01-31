from django.urls import path
from .views import NoteList
from .views import NoteDetail

urlpatterns = [
    path('', NoteList.as_view()),
    path('<int:pk>/', NoteDetail.as_view()),
]