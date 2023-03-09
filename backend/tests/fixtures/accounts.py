import pytest

from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth.models import User


@pytest.fixture
def verified_user(user_factory, load_fixtures) -> User:
    return user_factory(verified=True)


@pytest.fixture
def unverified_user(user_factory, load_fixtures) -> User:
    return user_factory()


@pytest.fixture()
def homer31(load_fixtures) -> User:
    return get_user_model().objects.get(pk=32)


@pytest.fixture()
def homer15(load_fixtures) -> User:
    return get_user_model().objects.get(pk=16)
