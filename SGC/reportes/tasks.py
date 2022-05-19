from datetime import date
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import Reportes
from usuarios.models import Usuarios

# SE USARÀ DESPUES PARA TAREAS EN LAS QUE SE TENGA QUE VERIFICAR EL TIEMPO RESTANTE DE ENTREGA DE REPORTES


@shared_task(name='tareaconjunta')
def tareaconjunta():
    reportes = Reportes.objects.all()
    usuarios = Usuarios.objects.all()
    hoy = date.today()
    From = settings.DEFAULT_FROM_EMAIL
    To = []
    for i in usuarios:
        To.append(i.CorreoE)

    for t in To:
        for i in reportes:
            diferencia = i.Fecha_Entrega.day - hoy.day
            if diferencia <= 5:
                subject = 'Mensaje de recordatorio SGC: '+i.Nombre_Reporte
                message = 'Se le recuerda que solo quedan '+str(diferencia)+' dias para realizar la entrega del reporte: '+i.Nombre_Reporte+' cuya fecha limite de entrega es el dia: '+str(i.Fecha_Entrega) + \
                    '.\n\nSe recomienda atender a las indicaciones solicitadas y entregar lo antes posible.\n\nSi ya realizó la entrega del reporte: ' + \
                    i.Nombre_Reporte+' haga caso omiso de este mensaje.'
                send_mail(subject, message, From, [t], fail_silently=False)
