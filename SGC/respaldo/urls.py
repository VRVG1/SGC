from django.urls import path
from .views import MakeBackup


urlpatterns = [
    path('make-backup', MakeBackup.as_view()),
]
