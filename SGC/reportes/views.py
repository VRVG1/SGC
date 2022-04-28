from datetime import date, datetime
from django.shortcuts import render
from .models import Reportes, Generan
from .serializers import ReportesSerializer, GeneranSerializer, UpdateGeneranSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from materias.models import Asignan
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from persoAuth.permissions import OnlyAdminPermission, AdminEspectadorPermission

# Create your views here.


class ReportesView(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminEspectadorPermission]

    '''
    Vista que permite ver todos los reportes registrados en la BD
    (ADMIN)
    '''
    serializer_class = ReportesSerializer
    queryset = Reportes.objects.all()


# NOTE: ESte para que es?
class GeneranView(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminEspectadorPermission]

    '''
    Vista que permite ver todos los generan registrados en la BD
    (ADMIN)
    '''
    serializer_class = GeneranSerializer
    queryset = Generan.objects.all()


class CreateReportesView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminEspectadorPermission]

    '''
    Vista que permite registrar un reporte en la BD
    (ADMIN)
    '''
    serializer_class = ReportesSerializer

    def post(self, request, format=None):
        date01 = 'Jun 20'
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.validated_data.get('Nombre_Reporte')
            serializer.save()
            ID_Reporte = Reportes.objects.get(Nombre_Reporte=name)
            asignan = Asignan.objects.all()
            fecha = date.today()
            parse01 = datetime.strptime(
                date01, '%b %d').date().replace(year=fecha.year)

            if fecha < parse01:
                semestre = '01-' + str(fecha.year)
            else:
                semestre = '02-' + str(fecha.year)

            for i in asignan:
                generate = Generan(Estatus=None, Path_PDF=None, Sememestre=semestre, ID_Materia=i.ID_Materia,
                                   ID_Usuario=i.ID_Usuario, ID_Reporte=ID_Reporte)
                generate.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrarReporte(request, pk):
    '''
    Vista que permite borrar un reporte de la BD
    (ADMIN)
    '''
    try:
        reporte = Reportes.objects.get(ID_Reporte=pk)
    except Reportes.DoesNotExist:
        return Response({'Error': 'Reporte no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        reporte_serializer = ReportesSerializer(reporte)
        return Response(reporte_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        reporte.delete()
        return Response({'Mensaje': 'Reporte Borrado'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def updateReporte(request, pk):
    '''
    Vista que permite actualizar (modificar) un reporte de la BD
    (ADMIN)
    '''
    try:
        reporte = Reportes.objects.get(ID_Reporte=pk)
    except Reportes.DoesNotExist:
        return Response({'Error': 'Reporte no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        reporte_serializer = ReportesSerializer(reporte)
        return Response(reporte_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer_class = ReportesSerializer(reporte, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

# HACER QUE VICTOR HAGA LA PARSE (INVESTIGAR MAS) COMO FORM-DATA O ALGO ASÍ
# TRATAR DE EXPLICAR QUE HONGO CON EL POSTMAN
# HACER QUE CADA QUE SE BORRE UN ASIGNA, SE BORRE EL ARCHIVO DE ESTE

# TAMBIEN FUNCIONA COMO ACTUALIZAR GENERA


@api_view(['GET', 'PUT'])
@parser_classes([MultiPartParser, FormParser])
def CrearGeneran(request, pk):
    '''
    Vista que permite crear un generan (en si no crea nada ya que el espacio ya fue creado, solo se modifica con los datos de estatus y el pdf)
    (DOCENTE)
    '''
    try:
        generan = Generan.objects.get(ID_Generacion=pk)
        reporte = Reportes.objects.get(
            ID_Reporte=generan.ID_Reporte.ID_Reporte)
    except Generan.DoesNotExist:
        return Response({'Error': 'Generado no existe'}, status=status.HTTP_400_BAD_REQUEST)

    if request.user != generan.ID_Usuario.ID_Usuario:
        return Response({'Error': 'A este usuario no le corresponde este asignan'}, status=status.HTTP_401_UNAUTHORIZED)

    fechaE = reporte.Fecha_Entrega
    fechaH = date.today()

    if fechaH > fechaE:
        estatus = 'Entrega tarde'
    else:
        estatus = 'Entrega a tiempo'

    if request.method == 'GET':
        generan_serializer = GeneranSerializer(generan)
        return Response(generan_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer_class = GeneranSerializer(generan, data=request.data)
        if serializer_class.is_valid():
            serializer_class.validated_data['Estatus'] = estatus
            serializer_class.validated_data['ID_Materia'] = generan.ID_Materia
            serializer_class.validated_data['ID_Usuario'] = generan.ID_Usuario
            serializer_class.validated_data['ID_Reporte'] = generan.ID_Reporte
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
