from django.shortcuts import render
from .models import Reportes, Generan
from .serializers import ReportesSerializer, GeneranSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response


# Create your views here.

class ReportesView(generics.ListAPIView):
    serializer_class = ReportesSerializer
    queryset = Reportes.objects.all()


class CreateReportesView(APIView):
    serializer_class = ReportesSerializer
    generan = GeneranSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
