from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, JsonResponse


def get_signed_url(request):
    return JsonResponse({'status': 0, 'data': "hello"})

def upload_file(request):
    return JsonResponse({'status': 0, 'data': "hihi"})
