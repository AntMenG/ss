from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage

# Create your views here.
def home (request):
    context = {
        'title' : 'SS | Carga de Expedientes',
        'target' : 'Cargar Expediente'
    }
    return render(request, 'home/home.html', context)

def cesp (request):
    context = {
        'title' : 'SS | Clasificacion de Expedientes',
        'target' : 'Organizar Expediente'
    }
    return render(request, 'home/cesp.html', context)

def upload(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES['document']
            fs=FileSystemStorage()
            fs.save(uploaded_file.name, uploaded_file)
            print(uploaded_file.name)
            print(uploaded_file.size)
        except:
            print("No se envió un archivo")
    return render(request, 'upload.html')