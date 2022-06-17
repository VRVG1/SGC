from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from persoAuth.permissions import AdminEspectadorPermission

import os


class MakeDatasheet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    Permission_classes = [IsAuthenticated, AdminEspectadorPermission]

    def get(self, request, format=None):

        print(f'\n\n\n{os.getcwd()}\n\n\n')

        try:
            os.makedirs('./var/exportar')
            print('Se crearon los directorios ./var/ y ./var/respaldo/')
        except FileExistsError:
            print('Ya existen los directorios')
