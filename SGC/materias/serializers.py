from dataclasses import fields
from rest_framework import serializers
from .models import Materias, Carreras, Asignan


class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreras
        fields = ('ID_Carrera', 'Nombre_Carrera')

    def create(self, validated_data):
        carrera = Carreras.objects.create(**validated_data)
        return carrera


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materias
        fields = ('ID_Materia', 'Nombre_Materia', 'Grado', 'Carrera')

    def create(self, validated_data):
        materia = Materias.objects.create(**validated_data)
        return materia


class AsignanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignan
        fields = ('ID_Materia', 'ID_Usuario')

    def create(self, validated_data):
        asign = Asignan.objects.create(**validated_data)
        return asign
