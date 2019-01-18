from django.urls import path
from apps.home.views import home, cesp, upload, selecciona_empleado

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    path('upload/', upload, name = 'upload'),
    path('selecciona_empleado/', selecciona_empleado, name = 'selecciona_empleado')
]
