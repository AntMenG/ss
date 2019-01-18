from django.urls import path
from apps.home.views import home, cesp, upload

urlpatterns = [
    path('', home, name = 'home'),
    path('cesp/', cesp, name = 'cesp'),
    path('upload/', upload, name = 'upload')
]
