import datetime
import json

from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from google.cloud import storage

@csrf_exempt
def get_signed_url(request):
    if request.method == "GET":
        file_name = request.GET['file_name']
        print(file_name)

        storage_client = storage.Client.from_service_account_json('/Users/gwonjoohee/Downloads/upload-image-signed-url-68f7095e09a3.json')
        bucket = storage_client.get_bucket("image_upload_storage")
        print(bucket.name)

        blob = bucket.blob(file_name)
        print(blob)

        url = blob.generate_signed_url(
            version='v4',
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(minutes=15),
            # Allow GET requests using this URL.
            method='GET')

        print('Generated GET signed URL:')
        print(url)
        print('You can use this URL with any user agent, for example:')
        print('curl \'{}\''.format(url))


    return JsonResponse({'status': 0, 'data': "hello"})

@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        print(request.FILES['file'])
        print(request.FILES['file'].name)
        print(request.FILES['file'].content_type)
        print("SIZE : ",request.FILES['file'].size)

        # path = '/%s/%s' % ('upload-image-storage',file_name)
        # print(path)

        # print(content_type, file)
        # response = cloud_storage_UrlSigner.Put(path=path, content_type="image", data=file)
        # print("RESPONSE : ", response)
    # response = CloudStorageURLSigner.Get('/bucket/'+)

    # print(response)
    # print(environ.API_KEY)
    # print(default_storage)
    return JsonResponse({'status': 0, 'data': "hihi"})
