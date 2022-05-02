from urllib import request
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from datetime import date, datetime
from usuarios.models import Usuarios
from .serializers import CarreraSerializer, MateriaSerializer, AsignanSerializer
from .models import Asignan, Materias, Carreras
from reportes.models import Generan, Reportes
from persoAuth.permissions import OnlyAdminPermission, AdminDocentePermission

# Create your views here.


class MateriasView(generics.ListAPIView):
    '''
    Vista que muestra todas las materias registradas
    (ADMIN Y DOCENTE)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminDocentePermission]

    serializer_class = MateriaSerializer
    queryset = Materias.objects.all()


class CarrerasView(generics.ListAPIView):
    '''
    Vista que muestra todas las carreras registradas
    (ADMIN Y DOCENTE)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminDocentePermission]

    serializer_class = CarreraSerializer
    queryset = Carreras.objects.all()


# TODO: Checar donde se usa esta vista
class AsignanView(generics.ListAPIView):
    '''
    Vista que muestra todos los asignan registradas
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = AsignanSerializer
    queryset = Asignan.objects.all()


class CreateMateriasView(APIView):
    '''
    Vista que permite crear (registrar) materias en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = MateriaSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCarreraView(APIView):
    '''
    Vista que permite crear (registrar) carreras en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = CarreraSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# TODO: Ver en donde se utiliza esta vista
class AsignarMateriaView(APIView):
    '''
    Vista que permite crear (registrar) la asignacion de materia a un usuario en la BD
    Verifica si hay reportes registrados antes de la asignacion actual para registrarle al maestro
    los reportes pasados.
    (ADMIN y DOCENTE)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminDocentePermission]

    serializer_class = AsignanSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            usuario = serializer.validated_data.get('ID_Usuario')
            materia = serializer.validated_data.get('ID_Materia')
            serializer.save()
            reportes = Reportes.objects.all()
            if not reportes:
                pass
            else:
                date01 = 'Jun 20'
                fecha = date.today()
                parse01 = datetime.strptime(
                    date01, '%b %d').date().replace(year=fecha.year)

                if fecha < parse01:
                    semestre = '01-' + str(fecha.year)
                else:
                    semestre = '02-' + str(fecha.year)

                asignan = Asignan.objects.get(
                    ID_Usuario=usuario, ID_Materia=materia)
                for x in reportes:
                    generate = Generan(Estatus=None, Path_PDF=None, Sememestre=semestre,
                                       ID_Materia=asignan.ID_Materia, ID_Usuario=asignan.ID_Usuario, ID_Reporte=x)
                    generate.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def borrarM(request, pk):
    '''
    Vista que permite borrar una materia de la BD
    (ADMIN)
    '''
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def updateM(request, pk):
    '''
    Vista que permite actualizar (modificar) una materia de la BD
    (ADMIN)
    '''
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def borrarC(request, pk):
    '''
    Vista que permite borrar una carrera de la BD
    (ADMIN)
    '''
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def updateC(request, pk):
    '''
    Vista que permite actualizar (modificar) una carrera de la BD
    (ADMIN)
    '''
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def borrarAs(request, pkM):
    '''
    Vista que permite borrar una asignacion de la BD
    (ADMIN)
    '''
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
