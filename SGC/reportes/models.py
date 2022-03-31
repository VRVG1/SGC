from django.db import models
from materias.models import Materias
from usuarios.models import Usuarios

# Create your models here.


class Reportes(models.Model):
    class Meta:
        db_table = 'Reportes'

    ID_Reporte = models.AutoField(primary_key=True, null=False)
    Nombre_Reporte = models.CharField(max_length=120, null=False)
    Fecha_Entrega = models.DateField(null=False)
    Descripcion = models.TextField(max_length=120, null=True, blank=True)
    Opcional = models.BooleanField()


class Generan(models.Model):
    class Meta:
        db_table = 'Generan'

    ID_Generacion = models.AutoField(primary_key=True)
    Estatus = models.CharField(max_length=20, null=True)
    Path_PDF = models.FileField(upload_to="Generados", null=True)
    Sememestre = models.CharField(max_length=20, null=True)
    ID_Materia = models.ForeignKey(Materias, on_delete=models.CASCADE)
    ID_Usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    ID_Reporte = models.ForeignKey(Reportes, on_delete=models.CASCADE)
