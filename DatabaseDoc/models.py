from django.db import models
from django.db.models.enums import Choices
from django.db.models.expressions import F
from django.db.models.fields import AutoField

# TODO:
# Checar como hacer constrains en DJANGO
# Comentar lo del FileField
# Checar las llaves foraneas para que estén acorde a la ubicación de los archivos


choices_career = (
    ("Sistemas", "Sistemas"),
    ("Informática", "Informática"),
    ("Ambos", "Ambos"),
)

choises_careers = (
    ("Sistemas", "Sistemas"),
    ("Informática", "Informática"),
)

choises_users = (
    ("Administrador","Administrador"),
    ("Docente", "Docente"),
)

choises_status = (
    ("Entregado", "Entregado"),
    ("No entregado", "No entregado"),
)

class Usuarios(models.Model):
    class Meta:
        db_table = 'Usuarios'
    ID_Usuario = models.AutoField(primary_key=True, null=False)
    Nombre_Usuario = models.CharField(max_length=70, null=False)
    User = models.CharField(max_length=10, null= False)
    Password = models.CharField(max_length=20, null= False)
    Carrera = models.CharField(choices=choices_career, null= False)
    Tipo_Usuario = models.CharField(choices=choises_users, null=False)
    CorreoE = models.EmailField(max_length=254, null=False)

class Reportes(models.Model):
    class Meta:
        db_table = 'Reportes'
    ID_Reporte = models.AutoField(primary_key=True, null= False)
    Nombre_Reporte = models.CharField(max_length= 100, null= False)


class Materias(models.Model):
    class Meta:
        db_table = 'Materias'
        unique_together = (('ID_Materia'),('ID_Detallado'),)
    ID_Materia = AutoField(primary_key=True, null= False)
    Nombre_Materia = models.CharField(max_length=100, null=False)
    ID_Detalle = models.ForeignKey('Detalle_Materias', on_delete=models.CASCADE)

class Detalle_Materias(models.Model):
    class Meta:
        db_table = 'Detalle_Materias'
    ID_Detalle = models.AutoField(primary_key=True, null= False)
    Semestre = models.CharField(max_length= 50, null= False)
    Carrera = models.CharField(choises = choises_careers, null= False)

class Generan(models.Model):
    class Meta:
        db_table = 'Generan'
    ID_Generacion = models.AutoField(primary_key=True, null=False)
    Estatus = models.CharField(choises=choises_status, null= False)
    Path_PDF = models.FileField(max_length=254, null=False)
    Semememestre = models.CharField(max_length= 50, null = False)
    ID_Materia = models.ForeignKey('Materias', on_delete=models.CASCADE)
    ID_Usuario = models.ForeignKey('Usuarios', on_delete=models.CASCADE)
    ID_Reporte = models.ForeignKey('Reportes', on_delete=models.CASCADE)
