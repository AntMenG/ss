from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.files.storage import FileSystemStorage
from apps.home.models import Empleado, Archivo

# Create your views here.
def home (request):
    empleado = Empleado.objects.all().order_by('id')
    context = {
        'title' : 'SS | Carga de Expedientes',
        'target' : 'CARGAR EXPEDIENTE',
        'empleados' : empleado
    }
    if request.method == 'POST':
        c_type = ['image/png','image/jpeg']
        try:
            files = request.FILES.getlist('document')
            for f in files:
                if f.content_type in c_type:
                    fs=FileSystemStorage()
                    fs.save(f.name, f)
                    print(f.name)
                    print(f.size)
                    print(f.content_type)
                else:
                    print('Archivo no admitido')
        except:
            print("No se envió un archivo")
    return render(request, 'home/home.html', context)

def cesp (request):
    empleado = Empleado.objects.all().order_by('id')
    context = {
        'title' : 'SS | Clasificacion de Expedientes',
        'target' : 'ORDENAR EXPEDIENTE',
        'empleados' : empleado
    }
    return render(request, 'home/cesp.html', context)

def selecciona_empleado (request):
    if request.method == 'POST':
        data = request.POST.copy()
        results = Empleado.objects.filter(
            id = int(data.get('id'))
        ).values()
        return JsonResponse(list(results)[0])
    elif request.method == 'GET':
        return redirect('home')
