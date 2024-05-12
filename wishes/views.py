from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Wish,Comment
import json
from django.forms.models import model_to_dict


# Create your views here.



def landing_page(request):
    return render(request, 'landing1.html', {})


def wish_list(request):
    comments = Wish.objects.all()
    formatted_data = []
    for item in comments:
        formatted_item = model_to_dict(item)
        formatted_item['date_posted'] = item.date_posted.strftime('%Y-%m-%d %H:%M:%S')  # Adjust format as needed
        formatted_data.append(formatted_item)
    comments = reversed(formatted_data)
    print(comments)
    return JsonResponse(list(comments), safe=False)


@csrf_exempt
def add_wish(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        # Save data to the database
        Wish.objects.create(title=title, content=content)
        return JsonResponse({'message': 'Data saved successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
