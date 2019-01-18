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
        try:
            #uploaded_file = request.FILES['document']
            files = request.FILES.getlist('document')
            for f in files:
                fs=FileSystemStorage()
                fs.save(f.name, f)
                print(f.name)
                print(f.size)
        except:
            print("No se envió un archivo")
    return render(request, 'upload.html')