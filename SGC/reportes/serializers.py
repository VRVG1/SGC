from rest_framework import serializers

from materias.models import Asignan
from .models import Reportes, Generan


class GeneranSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generan
        fields = ('ID_Generacion', 'Estatus', 'Path_PDF',
                  'Sememestre', 'ID_Materia', 'ID_Usuario', 'ID_Reporte')


class UpdateGeneranSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generan
        fields = ('Estatus', 'Path_PDF')


class ReportesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reportes
        fields = ('ID_Reporte', 'Nombre_Reporte',
                  'Fecha_Entrega', 'Descripcion', 'Opcional')
