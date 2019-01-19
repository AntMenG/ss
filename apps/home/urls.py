from django.urls import path
from apps.home.views import home, cesp, selecciona_empleado, cargar_expediente

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    path('cargar_expediente/', cargar_expediente, name = 'cargar_expediente'),
    path('selecciona_empleado/', selecciona_empleado, name = 'selecciona_empleado')
]
