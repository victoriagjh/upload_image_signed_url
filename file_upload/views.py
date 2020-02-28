import datetime
import json

from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings
import requests

@csrf_exempt
def get_signed_url(request):
    if request.method == "GET":
        file_name = request.GET['file_name']
        content_type = request.GET['content_type']

        bucket = settings.STORAGE_CLIENT.get_bucket("upload-image-storage")

        blob = bucket.blob(file_name)

        url = blob.generate_signed_url(
            version='v4',
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(minutes=15),
            # Allow GET requests using this URL.
            method='PUT',
            content_type=content_type
        )
        return JsonResponse({'status': 0, 'signed_url': url, 'public_url': blob.public_url})

    return JsonResponse({'state' : "ERROR"})


@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        signed_url = request.POST['text']

        slug = request.FILES['file'].name

        headers = {'Content-type': request.FILES['file'].content_type, 'Slug': slug.encode('latin-1','ignore')}
        res = requests.put(signed_url,data=request.FILES['file'].read(), headers=headers)

        if res.status_code == 200:
            bucket = settings.STORAGE_CLIENT.get_bucket("upload-image-storage")
            blob = bucket.blob(request.FILES['file'].name)
            if blob.exists():
                return JsonResponse({'status': 0, 'content': blob.public_url})

    return JsonResponse({'state': "ERROR"})
