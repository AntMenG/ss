from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.
def home (request):
    context = {
        'title' : 'SS | Home'
    }
    return render(request, 'home/home.html', context)