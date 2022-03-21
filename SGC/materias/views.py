
from urllib import request
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from usuarios.models import Usuarios
from .serializers import CarreraSerializer, MateriaSerializer, AsignanSerializer
from .models import Asignan, Materias, Carreras

# Create your views here.


class MateriasView(generics.ListAPIView):
    serializer_class = MateriaSerializer
    queryset = Materias.objects.all()


class CarrerasView(generics.ListAPIView):
    serializer_class = CarreraSerializer
    queryset = Carreras.objects.all()


class AsignanView(generics.ListAPIView):
    serializer_class = AsignanSerializer
    queryset = Asignan.objects.all()


class CreateMateriasView(APIView):
    serializer_class = MateriaSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCarreraView(APIView):
    serializer_class = CarreraSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AsignarMateriaView(APIView):
    serializer_class = AsignanSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrarM(request, pk):
    try:
        materia = Materias.objects.get(ID_Materia=pk)
    except Materias.DoesNotExist:
        return Response({'Error': 'Materia no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        materia_serializer = MateriaSerializer(materia)
        return Response(materia_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        materia.delete()
        return Response({'Mensaje': 'Materia borrada'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def updateM(request, pk):
    try:
        materia = Materias.objects.get(ID_Materia=pk)
    except Materias.DoesNotExist:
        return Response({'Error': 'Materia no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        materia_serializer = MateriaSerializer(materia)
        return Response(materia_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer_class = MateriaSerializer(materia, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrarC(request, pk):
    try:
        carrera = Carreras.objects.get(ID_Carrera=pk)
    except Carreras.DoesNotExist:
        return Response({'Error': 'Carrera no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        carrera_serializer = CarreraSerializer(carrera)
        return Response(carrera_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        carrera.delete()
        return Response({'Mensaje': 'Carrera borrada'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def updateC(request, pk):
    try:
        carrera = Carreras.objects.get(ID_Carrera=pk)
    except Carreras.DoesNotExist:
        return Response({'Error': 'Carrera no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        carrera_serializer = CarreraSerializer(carrera)
        return Response(carrera_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer_class = CarreraSerializer(carrera, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrarAs(request, pkM):
    try:
        asign = Asignan.objects.get(ID_Materia=pkM)
    except Carreras.DoesNotExist:
        return Response({'Error': 'Carrera no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        obj = request.user
        try:
            usuario = Usuarios.objects.get(ID_Usuario=obj)
        except Usuarios.DoesNotExist:
            return Response({'Error': 'Usuario no existe pa'}, status=status.HTTP_400_BAD_REQUEST)

        asig_serializer = AsignanSerializer(asign)
        return Response(asig_serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        asign.delete()
        return Response({'Mensaje': 'Carrera borrada'}, status=status.HTTP_200_OK)
