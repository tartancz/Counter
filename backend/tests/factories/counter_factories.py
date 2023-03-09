import factory
from pytest_factoryboy import register

from .accounts_factories import UserFactory
from counter.models import Counter


@register
class CounterFactory(factory.django.DjangoModelFactory):
    owner = factory.SubFactory(UserFactory)

    class Meta:
        model = Counter
