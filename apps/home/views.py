from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.files.storage import FileSystemStorage
from apps.home.models import Empleado
#fs=FileSystemStorage()
#fs.save(f.name, f)

# Create your views here.
def home (request):
    empleado = Empleado.objects.all().order_by('id')
    context = {
        'title' : 'SS | Carga de Expedientes',
        'target' : 'CARGAR EXPEDIENTE',
        'empleados' : empleado
    }
    return render(request, 'home/home.html', context)

def cesp (request):
    empleado = Empleado.objects.all().order_by('id')
    context = {
        'title' : 'SS | Clasificacion de Expedientes',
        'target' : 'ORDENAR EXPEDIENTE',
        'empleados' : empleado
    }
    return render(request, 'home/cesp.html', context)