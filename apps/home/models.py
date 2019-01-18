from django.db import models

# Create your models here.
class Empleado(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=70)
    edad = models.IntegerField()
    telefono = models.CharField(max_length=12)
    curp = models.CharField(max_length=20)
    rfc = models.CharField(max_length=20)

class Archivo(models.Model):
    tipo = models.CharField(max_length=50)
    size = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    empleado = models.ForeignKey(Empleado, null=True, blank=True, on_delete=models.CASCADE)