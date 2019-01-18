from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage

# Create your views here.
def home (request):
    context = {
        'title' : 'SS | Carga de Expedientes',
        'target' : 'CARGAR EXPEDIENTE'
    }
    return render(request, 'home/home.html', context)

def cesp (request):
    context = {
        'title' : 'SS | Clasificacion de Expedientes',
        'target' : 'ORDENAR EXPEDIENTE'
    }
    return render(request, 'home/cesp.html', context)

def upload(request):
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
    return render(request, 'upload.html')