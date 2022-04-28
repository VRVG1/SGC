from urllib.request import Request
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import UsuarioSerializer, UpdateUsuarioSerializer, UserSerializer, CambioPassSerializer
from .models import Usuarios
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from persoAuth.permissions import OnlyAdminPermission, OnlyDocentePermission, AdminDocentePermission
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


# Create your views here.


class UsuarioView(generics.ListAPIView):
    """
    VISTA GENERAL DE USUARIOS
    Unicamente los administradores pueden visualizar todos los usuarios.
    Supongo...
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    '''
    Vista que permite ver todos los usuarios registrados en la BD
    (ADMIN)
    '''
    serializer_class = UsuarioSerializer
    queryset = Usuarios.objects.all()


class CreateUsuarioView(APIView):
    """
    VISTA PARA CREAR UN USUARIO DEL SISTEMA
    Unicamente los administradores pueden crear un usuario.
    Supongo...
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    '''
    Vista que permite registrar un usuario en la BD
    (ADMIN)
    '''
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
    Solo los usuarios de tipo administrador y docente pueden cambiar la
    contraseña del usuario.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AdminDocentePermission]

    '''
    Vista que permite cambiar la contraseña de un usuario
    (DOCENTE) **Por concretar el como hacer el cambio de contraseña**
    '''
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def borrar(request, pk=None):
    """
    BORRAR UN USUARIO DEL SISTEMA
    (HAY QUE VER SI BORRANDO USUARIO SE BORRA USER NO CREO PERO XD)
    Unicamente los usuarios de tipo administrador pueden borrar el usuario.
    """
    '''
    Vista que permite borrar un usuario de la BD
    (ADMIN)
    '''
    try:
        usuario = Usuarios.objects.get(PK=pk)
    except Usuarios.DoesNotExist:
        return Response({'ERROR': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        usuario.delete()
        return Response({'Mensaje': 'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def actualizar(request, pk=None):
    """
    ACTUALIZA UN USUARIO DEL SISTEMA
    Solo los usuarios de tipo administrador pueden realizar modificaciones
    en los usuarios.
    """
    '''
    Vista que permite modificar los datos de un usuario
    (ADMIN) **La vista que le permita al usuario cambiar sus propios datos falta aùn**
    '''
    try:
        usuario = Usuarios.objects.get(PK=pk)
    except Usuarios.DoesNotExist:
        return Response({'ERROR': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        usuario_serializer = UsuarioSerializer(usuario)
        return Response(usuario_serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer_class = UpdateUsuarioSerializer(usuario, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, OnlyAdminPermission])
def get(request, string):
    """
    OBTENER USUARIOS DEPENDIENDO DE LO BUSCADO (SOLO CON LO INGRESADO QUE COINCIDA CON EL INICIO DEL NOMBRE DEL USUARIO)
    Solo los usuarios de tipo administrador pueden consultar todos los usuarios
    existentes.
    """
    '''
    Vista que permite obtener usuario dependiendo de lo buscado (solo con lo ingresado que coincida con el inicio del nombre de usuario)
    (ADMIN)
    '''
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
