# from django.shortcuts import render
from django.http import HttpResponse
from django.core import management
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from persoAuth.permissions import OnlyAdminPermission

from wsgiref.util import FileWrapper
from zipfile import ZipFile
from pathlib import Path


class MakeBackup(generics.ListAPIView):
    '''
    Vista que crea el backup tanto de la base de datos como de los archivos
    media.
    (ADMIN)
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    def get(self, request, format=None):
        backup_filename = 'BackupSGC.zip'

        # No se si se debe crear un serializer
        print('Creando respaldo de la base de datos...')
        management.call_command('dbbackup', clean=True)
        print('Respaldo de la base de datos realizado con exito.')
        print('Creando respaldo de los archivos media...')
        management.call_command('mediabackup', clean=True)
        print('Respaldo de los archivos media realizado con exito.')

        print('Comprimiendo archivos de respaldo...')

        with ZipFile(f'var/respaldo/{backup_filename}', 'w') as backup_zip:
            with Path('var/backups/') as backup_path:
                for file in backup_path.iterdir():
                    if file.is_file():
                        backup_zip.write(file.__str__(), arcname=file.name)

                print('Archivos de respaldo comprimidos con exito.')

        with open(f'var/respaldo/{backup_filename}', 'rb') as backup_zip:
            response = HttpResponse(FileWrapper(backup_zip),
                                    content_type='application/zip')
            response['Content-Disposition'] = f'attachment; filename="{backup_filename}"'
            response['Access-Control-Expose-Headers'] = 'Content-Disposition'
            print('Enviando archivo de respaldo...')
            return response


class RestoreData(generics.ListAPIView):
    '''
    Vista que permite restaurar la base de datos junto con sus archivos de
    media.
    (ADMIN)
    '''

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, OnlyAdminPermission]

    def post(self, request, format=None):
        print(request.FILES)
        response = HttpResponse('Recibido', content_type="text/plain",
                                status=200)
        return response
