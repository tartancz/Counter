import pytest
from rest_framework.reverse import reverse
from counter.models import Counter
from counter.serializers import CounterSerializer, ForeignCounterSerializer
# manipulating with own counters


def test_create_counter(api_client, verified_user):
    api_client.force_authenticate(verified_user)
    r = api_client.post(reverse("counter-list"))
    assert r.status_code == 201
    assert Counter.objects.filter(owner=verified_user).count() == 1
    assert Counter.objects.filter(owner=verified_user).first().count == 0


@pytest.mark.parametrize("count", ((50), (0), (999965)))
def test_create_counter_with_value(api_client, verified_user, count):
    api_client.force_authenticate(verified_user)
    r = api_client.post(reverse("counter-list"), data={"count": count})
    response_json = r.json()
    assert r.status_code == 201
    assert Counter.objects.filter(owner=verified_user).count() == 1
    assert Counter.objects.get(id=response_json["id"]).count == count


def test_update_with_negative_value(api_client, verified_user):
    api_client.force_authenticate(verified_user)
    r = api_client.post(reverse("counter-list"), data={"count": -20})
    response_json = r.json()
    assert r.status_code == 400
    assert "Ensure this value is greater than or equal to 0." in response_json["count"]
    assert Counter.objects.filter(owner=verified_user).all().count() == 0


def test_update_counter(api_client, homer31):
    api_client.force_authenticate(homer31)
    id_counter = homer31.counter_set.first().id
    data = {
        "count": 999,
    }
    r = api_client.patch(reverse("counter-detail", args=[id_counter]), data=data)
    assert r.status_code == 200
    assert Counter.objects.get(id=id_counter).count == 999


def test_delete_counter(api_client, homer31):
    api_client.force_authenticate(homer31)
    id_counter = homer31.counter_set.first().id
    r = api_client.delete(reverse("counter-detail", args=[id_counter]))
    assert r.status_code == 204
    assert Counter.objects.filter(id=id_counter).exists() == False


# manipulating with others counters


def test_update_others_counter(api_client, homer31, homer15):
    api_client.force_authenticate(homer31)
    id_counter = homer15.counter_set.first().id
    data = {
        "count": 999,
    }
    r = api_client.patch(reverse("counter-detail", args=[id_counter]), data=data)
    assert r.status_code == 404
    assert Counter.objects.get(id=id_counter).count != 999


def test_delete_others_counter(api_client, homer31, homer15):
    api_client.force_authenticate(homer31)
    id_counter = homer15.counter_set.first().id
    r = api_client.delete(reverse("counter-detail", args=[id_counter]))
    assert r.status_code == 404
    assert Counter.objects.filter(id=id_counter).exists() == True

def test_get_all_my_counters_authenticated(api_client, homer31):
    api_client.force_authenticate(homer31)
    r = api_client.get(reverse("counter-my-counters"))
    queryset = Counter.objects.filter(owner=homer31)
    assert r.status_code == 200
    assert r.data == CounterSerializer(queryset, many=True).data
    assert len(r.data) == queryset.count()

def test_get_all_my_counters(api_client, homer31):
    r = api_client.get(reverse("counter-my-counters"))
    assert r.status_code == 401

def test_get_foreign_counters(api_client, homer31):
    r = api_client.get(reverse("foreign-counter", args=(homer31.username,)))
    queryset = Counter.objects.filter(owner=homer31)
    assert r.status_code == 200
    assert r.data == ForeignCounterSerializer(queryset, many=True).data
    assert len(r.data) == queryset.count()
