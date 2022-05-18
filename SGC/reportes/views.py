
from datetime import date, datetime

from usuarios.models import Usuarios
from .models import Reportes, Generan, Alojan
from .serializers import AlojanSerializer, ReportesSerializer, GeneranSerializer, UpdateGeneranSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from materias.models import Asignan
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from persoAuth.permissions import AdminDocentePermission, OnlyAdminPermission, OnlyDocentePermission

# Create your views here.


class ReportesView(generics.ListAPIView):
    '''
    Vista que permite ver todos los reportes registrados en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = ReportesSerializer
    queryset = Reportes.objects.all()


# NOTE: ESte para que es?
class GeneranView(generics.ListAPIView):
    '''
    Vista que permite ver todos los generan registrados en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = GeneranSerializer
    queryset = Generan.objects.all()


class AlojanView(generics.ListAPIView):
    '''
    Vista que permite ver todos los alojan registrados en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = AlojanSerializer
    queryset = Alojan.objects.all()


class CreateReportesView(APIView):
    '''
    Vista que permite registrar un reporte en la BD
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = ReportesSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.validated_data.get('Nombre_Reporte')
            serializer.save()
            ID_Reporte = Reportes.objects.get(Nombre_Reporte=name)
            asignan = Asignan.objects.all()
            if not asignan:
                pass
            else:
                date01 = 'Jun 20'
                fecha = date.today()
                parse01 = datetime.strptime(
                    date01, '%b %d').date().replace(year=fecha.year)

                if fecha < parse01:
                    semestre = 'Enero - Junio ' + str(fecha.year)
                else:
                    semestre = 'Agosto - Diciembre ' + str(fecha.year)

                for i in asignan:
                    ID_Asignan = Asignan.objects.get(ID_Asignan=i.ID_Asignan)
                    generate = Generan(
                        Estatus=None, Sememestre=semestre, ID_Asignan=i, ID_Reporte=ID_Reporte)
                    generate.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OnlySaveReportesView(APIView):
    '''
    Vista que permite guardar pero no "enviar" un reporte
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    serializer_class = ReportesSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class CreateAlojanView(APIView):
    '''
    Vista que permite guardar los archivos PDF que se necesiten subir para el reporte
    (DOCENTE)
    '''
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated, AdminDocentePermission]

    serializer_class = AlojanSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, AdminDocentePermission])
def alojanFromView(request, fk):
    '''
    Vista que permite ver todos los alojan de una cierta generacion
    (DOCENTE)
    '''
    if request.method == 'GET':
        try:
            ID_Generacion = Generan.objects.get(ID_Generacion=fk)
        except Generan.DoesNotExist:
            return Response({'Error': ' Generado no existe'}, status=status.HTTP_404_NOT_FOUND)

        AlojanX = Alojan.objects.filter(ID_Generacion=ID_Generacion)
        serializer_class = AlojanSerializer(AlojanX, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


@api_view(['GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
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


@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def EnviarGeneran(request, pk):
    '''
    Vista que permite crear o "enviar" un generan de un reporte que solo fue guardado
    (ADMIN)
    '''

    try:
        reporte = Reportes.objects.get(ID_Reporte=pk)
    except Reportes.DoesNotExist:
        return Response({'Error': 'Reporte no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        try:
            asignan = Asignan.objects.all()
        except Asignan.DoesNotExist:
            return Response({'Error': 'No hay asignan'}, status=status.HTTP_404_NOT_FOUND)

        try:
            date01 = 'Jun 20'
            fecha = date.today()
            parse01 = datetime.strptime(
                date01, '%b %d').date().replace(year=fecha.year)

            if fecha < parse01:
                semestre = 'Enero - Junio ' + str(fecha.year)
            else:
                semestre = 'Agosto - Diciembre ' + str(fecha.year)

            for x in asignan:
                generate = Generan(
                    Estatus=None, Sememestre=semestre, ID_Asignan=x, ID_Reporte=reporte)
                generate.save()

            return Response({'Success': 'Generan creado'}, status=status.HTTP_201_CREATED)
        except:
            return Response({'Error': 'Error al crear un generan'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, AdminDocentePermission])
def GetGeneranUser(request):
    '''
    Vista que permite obtener todos los reportes que el usuario debe entregar
    (DOCENTE)
    '''
    try:
        usuario = Usuarios.objects.get(ID_Usuario=request.user)
        generan = Generan.objects.filter(ID_Asignan__ID_Usuario=usuario)
    except Generan.DoesNotExist:
        return Response({'Error': 'No hay registros'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GeneranSerializer(generan, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, AdminDocentePermission])
def GetReporte(request, pk):
    '''
    Vista que permite obtener la informacion de un reporte especifico
    (DOCENTE)
    '''
    try:
        reporte = Reportes.objects.get(ID_Reporte=pk)
    except Generan.DoesNotExist:
        return Response({'Error': 'No hay reporte'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReportesSerializer(reporte)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyDocentePermission])
def CrearGeneran(request, pk):
    '''
    Vista que permite crear un generan (en si no crea nada ya que el espacio ya
    fue creado, solo se modifica con los datos de estatus y el pdf)
    (DOCENTE)
    '''
    try:
        generan = Generan.objects.get(ID_Generacion=pk)
        reporte = Reportes.objects.get(
            ID_Reporte=generan.ID_Reporte.ID_Reporte)
    except Generan.DoesNotExist:
        return Response({'Error': 'Generado no existe'}, status=status.HTTP_400_BAD_REQUEST)

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
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
