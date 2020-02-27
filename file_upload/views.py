import datetime
import json

from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from google.cloud import storage
import requests
from idna import unicode

storage_client = storage.Client.from_service_account_json(
    '/Users/gwonjoohee/Downloads/upload-image-signed-url-68f7095e09a3.json')

@csrf_exempt
def get_signed_url(request):
    if request.method == "GET":
        file_name = request.GET['file_name']
        content_type = request.GET['content_type']

        bucket = storage_client.get_bucket("upload-image-storage")

        blob = bucket.blob(file_name)

        url = blob.generate_signed_url(
            version='v4',
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(minutes=15),
            # Allow GET requests using this URL.
            method='PUT',
            content_type=content_type
        )
        return JsonResponse({'status': 0, 'signed_url': url})

    return JsonResponse({'state' : "ERROR"})


@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        signed_url = request.POST['text']
        #TODO: File Validation하고 업로드해야함.

        #TODO: 한글 파일명이면 업로드 실패하는
        # print(type(request.FILES['file'].name))
        # slug = unicode(request.FILES['file'].name, "utf-8")

        headers = {'Content-type': request.FILES['file'].content_type, 'Slug': request.FILES['file'].name}
        res = requests.put(signed_url,data=request.FILES['file'].read(), headers=headers)

        if res.status_code == 200:
            bucket = storage_client.get_bucket("upload-image-storage")
            blob = bucket.blob(request.FILES['file'].name)
            return JsonResponse({'status': 0, 'content': blob.public_url})

    return JsonResponse({'state': "ERROR"})
