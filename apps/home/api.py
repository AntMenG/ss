from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
from apps.home.models import Empleado, Archivo

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
                if done > 0:
                    empleado.expediente = True
                    empleado.save()
                    return JsonResponse({
                        'status' : 'done',
                        'text' : 'Finalizado: ' + str(done) + ' correctos ' + str(err) + ' incorrectos'
                    })
            else:
                return JsonResponse({
                    'status' : 'err',
                    'text' : 'Debes enviar archivos'
                })
        else:
            return JsonResponse({
                'status' : 'err',
                'text' : 'El empleado no existe'
            })
    elif request.method == 'GET':
        return redirect('home')

def buscar_expediente (request):
    if request.method == 'POST':
        result = []
        expediente = Archivo.objects.filter(
            empleado_id = request.POST.get('id')
        ).values('id', 'tipo', 'document', 'empleado_id')
        if expediente:
            for i in expediente:
                result.append(i)
            return JsonResponse({
                'status' : 'done',
                'text' : 'Arrastra las imágenes de la izquierda \
                            a la casilla que correspondan. \
                            También puedes dar doble click \
                            a las imagenes para maximizarlas',
                'data' : result
            })
        else:
            return JsonResponse({
                'status' : 'err',
                'text' : 'El empleado no tiene expediente'
            })
    elif request.method == 'GET':
        return redirect('home')

def ordenar_expediente (request):
    if request.method == 'POST':
        done = 0
        error = 0
        data = request.POST
        longitud = int(data.get('len'))
        for i in range(0,longitud):
            index = 'data[' + str(i) + ']'
            archivo_id = data.get(index + '[id]')
            empleado_id = data.get(index + '[empleado_id]')
            tipo = data.get(index + '[tipo]')
            try:
                update = Archivo.objects.get(
                    id = archivo_id,
                    empleado_id = empleado_id
                )
                if update:
                    update.tipo = tipo
                    update.save()
                    done += 1
                else:
                    error += 1
            except:
                print('Error en base de datos')
                error += 1
        if done > 0 and error == 0:
            return JsonResponse({
                'status' : 'done',
                'text' : 'Expediente ordenado con éxito'
            })
        elif done > 0 and error > 0:
            return JsonResponse({
                'status' : 'err',
                'text' : 'Proceso con ' + str(error) + 'error/es'
            })
        else:
            return JsonResponse({
                'status' : 'err',
                'text' : 'Error al ordenar'
            })
    elif request.method == 'GET':
        return redirect('home')