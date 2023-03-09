from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Counter
from .serializers import CounterSerializer, ForeignCounterSerializer


# Create your views here.


class CounterViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Counter.objects.filter(owner=user)

    @action(methods=["get"], detail=False, name="my-counter")
    def my_counters(self, request):
        user = request.user
        queryset = Counter.objects.filter(owner=user)
        data = CounterSerializer(instance=queryset, many=True).data
        return Response(data)


@api_view(["GET"])
def foreign_counter(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    queryset = Counter.objects.filter(owner=user)
    data = ForeignCounterSerializer(instance=queryset, many=True).data
    return Response(data)
