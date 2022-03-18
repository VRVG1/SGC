from django.urls import path
from .views import ReportesView, CreateReportesView

urlpatterns = [
    path('reportes', ReportesView.as_view()),
    path('create-reporte', CreateReportesView.as_view())
]