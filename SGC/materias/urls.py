from django.urls import path
from .views import MateriasView, CreateMateriasView, borrarM, borrarAs, CreateCarreraView, AsignarMateriaView, CarrerasView, borrarC
from .views import updateM, updateC, AsignanView

urlpatterns = [
    path('materias', MateriasView.as_view()),
    path('create_materia', CreateMateriasView.as_view()),
    path('create_carrera', CreateCarreraView.as_view()),
    path('asign_materia', AsignarMateriaView.as_view()),
    path('carreras', CarrerasView.as_view()),
    path('asignan', AsignanView.as_view()),
    path('delete-materia/pk', borrarM),
    path('delete-carrera/pk', borrarC),
    path('delete-asign/<int:pkM>', borrarAs),
    path('update-materia/pk', updateM),
    path('update-carrera/pk', updateC),

]
