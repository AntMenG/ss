from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.files.storage import FileSystemStorage
from apps.home.models import Empleado, Archivo
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

def selecciona_empleado (request):
    if request.method == 'POST':
        data = request.POST.copy()
        results = Empleado.objects.filter(
            id = int(data.get('id'))
        ).values()
        return JsonResponse(list(results)[0])
    elif request.method == 'GET':
        return redirect('home')

def cargar_expediente (request):
    if request.method == 'POST':
        empleado = Empleado.objects.get(
            id = request.POST.get('empleado_id')
        )
        if empleado:
            c_type = ['image/png','image/jpeg']
            files = request.FILES.getlist('document')
            if files:
                done = 0
                err = 0
                for f in files:
                    if f.content_type in c_type:
                        try:
                            archivo = Archivo(
                                tipo = 'Desconocido',
                                size = str(f.size),
                                document = f,
                                empleado_id = empleado.id
                            )
                            archivo.save()
                            done += 1
                        except:
                            err += 1
                            print('Error en bd')
                    else:
                        print('Archivo no admitido')
                return JsonResponse({
                    'status' : 'done',
                    'text' : 'Finalizado: ' + str(done) + ' correctos ' + str(err) + ' incorrectos'
                })
        else:
            return JsonResponse({
                'status' : 'err',
                'text' : 'El empleado no existe'
            })
    elif request.method == 'GET':
        return redirect('home')