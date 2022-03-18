from pyexpat import model
from django.db import models
from usuarios.models import Usuarios
# Create your models here.


class Carreras(models.Model):
    class Meta:
        db_table = 'Carreras'
    ID_Carrera = models.AutoField(primary_key=True, null=False)
    Nombre_Carrera = models.CharField(max_length=120, null=False)

    def __str__(self):
        return f"{self.Nombre_Carrera}"


class Materias(models.Model):
    class Meta:
        db_table = 'Materias'
    ID_Materia = models.AutoField(primary_key=True, null=False)
    Nombre_Materia = models.CharField(max_length=100, null=False)
    Grado = models.IntegerField(null=False)
    Carrera = models.ForeignKey(Carreras, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.Nombre_Materia}"


class Asignan(models.Model):
    class Meta:
        db_table = 'Asignan'
        unique_together = (('ID_Materia', 'ID_Usuario'),)
    ID_Materia = models.ForeignKey(Materias, on_delete=models.CASCADE)
    ID_Usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
