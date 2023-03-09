import pytest
from rest_framework.reverse import reverse
from counter.models import Counter
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer

def test_get_all_users_authenticated(api_client, verified_user):
    api_client.force_authenticate(verified_user)
    r = api_client.get(reverse("all-users"))
    queryset = get_user_model().objects.exclude(id=verified_user.id).filter(emailaddress__verified=True)
    assert r.status_code == 200
    assert queryset.count() == len(r.data)
    assert UserSerializer(queryset, many=True).data == r.data

def test_get_all_users(api_client, verified_user):
    r = api_client.get(reverse("all-users"))
    queryset = get_user_model().objects.filter(emailaddress__verified=True)
    assert r.status_code == 200
    assert queryset.count() == len(r.data)
    assert UserSerializer(queryset, many=True).data == r.data

def test_get_all_users_authenticated_with_search(api_client, verified_user):
    api_client.force_authenticate(verified_user)
    search_para = "nothomer1"
    r = api_client.get(f"{reverse('all-users')}?search={search_para}")
    queryset = get_user_model().objects.exclude(id=verified_user.id).filter(emailaddress__verified=True).filter(username__startswith=search_para)
    assert r.status_code == 200
    assert queryset.count() == len(r.data)
    assert UserSerializer(queryset, many=True).data == r.data

def test_get_all_users_with_search(api_client, verified_user):
    search_para = "nothomer1"
    r = api_client.get(f"{reverse('all-users')}?search={search_para}")
    queryset = get_user_model().objects.filter(emailaddress__verified=True).filter(username__startswith=search_para)
    assert r.status_code == 200
    assert queryset.count() == len(r.data)
    assert UserSerializer(queryset, many=True).data == r.data