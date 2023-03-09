import pytest


@pytest.fixture(scope="session")
def load_fixtures(django_db_setup, django_db_blocker):
    from django.core.management import call_command

    with django_db_blocker.unblock():
        call_command("loaddata", r"tests/fixtures/json/user_fixtures.json")
        call_command("loaddata", r"tests/fixtures/json/emailaddress_fixtures.json")
        call_command("loaddata", r"tests/fixtures/json/counter_fixtures.json")


@pytest.fixture(autouse=True)
def database_access(db):
    pass


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()
