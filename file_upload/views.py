import datetime

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings
import datetime

@csrf_exempt
def get_signed_url(request):
    if request.method == "GET":
        file_name = request.GET['file_name']
        content_type = request.GET['content_type']

        bucket = settings.STORAGE_CLIENT.get_bucket("upload-image-storage")
        print(datetime.datetime.now().date())
        print(str(datetime.datetime.now().date()))

        blob = bucket.blob(str(datetime.datetime.now().date())+"/"+file_name)

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
