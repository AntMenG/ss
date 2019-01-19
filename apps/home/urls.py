from django.urls import path
from apps.home.views import home, cesp, selecciona_empleado

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    path('selecciona_empleado/', selecciona_empleado, name = 'selecciona_empleado')
]
