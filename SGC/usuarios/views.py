from urllib.request import Request
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import UsuarioSerializer, UpdateUsuarioSerializer, UserSerializer, CambioPassSerializer
from .models import Usuarios
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class UsuarioView(generics.ListAPIView):
    """
    VISTA GENERAL DE USUARIOS
    """
    serializer_class = UsuarioSerializer
    queryset = Usuarios.objects.all()


class CreateUsuarioView(APIView):
    """
    VISTA PARA CREAR UN USUARIO DEL SISTEMA
    """
    serializer_class = UsuarioSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CambiarPass(generics.UpdateAPIView):
    """
    VISTA PARA HACER CAMBIO DE CONTRASEÑA
    """
    serializer_class = CambioPassSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # CHECAR SI AMBAS CONTRASEÑAS INGRESADAS SON LA MISMA
            if serializer.data.get('password') != serializer.data.get('new_password'):
                return Response({"password": ["Se debe ingresar la misma contraseña."]}, status=status.HTTP_400_BAD_REQUEST)
            # CIFRAR LA CONTRASEÑA CON set_password
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrar(request, pk=None):
    """
    BORRAR UN USUARIO DEL SISTEMA (HAY QUE VER SI BORRANDO USUARIO SE BORRA USER NO CREO PERO XD)
    """
    try:
        usuario = Usuarios.objects.get(PK=pk)
        print(usuario)
    except Usuarios.DoesNotExist:
        return Response({'ERROR': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        usuario.delete()
        return Response({'Mensaje': 'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def actualizar(request, pk=None):
    try:
        usuario = Usuarios.objects.get(PK=pk)
    except Usuarios.DoesNotExist:
        return Response({'ERROR': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        usuario_serializer = UsuarioSerializer(usuario)
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer_class = UpdateUsuarioSerializer(usuario, data=request.data)
        print(request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get(request, string):
    """
    OBTENER USUARIOS DEPENDIENDO DE LO BUSCADO (SOLO CON LO INGRESADO QUE COINCIDA CON EL INICIO DEL NOMBRE DEL USUARIO)
    """
    usuarios = Usuarios.objects.filter(
        Nombre_Usuario__startswith=string)
    if usuarios.exists():
        pass
    else:
        return Response({'ERROR': 'No hay usuarios con esta informacion'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # PARA CUANDO SE OCUPA JALAR VARIOS RESULTADOS DEL QUERY EN SERIALIZER
        usuario_serializer = UsuarioSerializer(usuarios, many=True)
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)
