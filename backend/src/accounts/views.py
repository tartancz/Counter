from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(["GET"])
def get_all_user(request):
    if request.user.is_authenticated:
        user = request.user
        queryset = get_user_model().objects.exclude(id=user.id)
    else:
        queryset = get_user_model().objects.all()
    if search := request.GET.get("search"):
        queryset = queryset.filter(username__startswith=search)
    queryset = queryset.filter(emailaddress__verified=True)
    data = UserSerializer(instance=queryset, many=True).data

    return Response(data)
