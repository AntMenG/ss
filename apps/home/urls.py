from django.urls import path
from .views import home, cesp
from .api import _selecciona_empleado, _cargar_expediente, _buscar_expediente, _ordenar_expediente

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    #Api path - - - - - - - - - - - - - - - - - - - -
    path('cargar_expediente/', _cargar_expediente, name = 'cargar_expediente'),
    path('selecciona_empleado/', _selecciona_empleado, name = 'selecciona_empleado'),
    path('buscar_expediente/', _buscar_expediente, name = 'buscar_expediente'),
    path('ordenar_expediente/', _ordenar_expediente, name = 'ordenar_expediente'),
]
