from django.urls import path
from .views import home, cesp
from .api import selecciona_empleado, cargar_expediente, buscar_expediente

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    path('cargar_expediente/', cargar_expediente, name = 'cargar_expediente'),
    path('selecciona_empleado/', selecciona_empleado, name = 'selecciona_empleado'),
    path('buscar_expediente/', buscar_expediente, name = 'buscar_expediente')
]
