import factory
from faker import Faker
from pytest_factoryboy import register
from allauth.account.models import EmailAddress

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password


fake = Faker()


class _EmailAddressFactory(factory.django.DjangoModelFactory):
    primary = True

    class Meta:
        model = EmailAddress
        django_get_or_create = ("email",)


@register
class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Sequence(lambda n: f"Homer{n}")
    first_name = factory.Sequence(lambda n: f"Homer{n}")
    last_name = factory.Sequence(lambda n: f"Simpson{n}")
    email = factory.Sequence(lambda n: f"HomerSimpson{n}@simpson.com")
    password = factory.LazyFunction(lambda: make_password("hesloheslo"))

    class Meta:
        model = get_user_model()
        django_get_or_create = ("username",)

    @factory.post_generation
    def verified(self, create, extracted):
        """
        arg verified on ini to make verified or unverified user
        default False
        example: UserFactory(verified=True)
        """
        ver = extracted or False
        _EmailAddressFactory(user=self, email=self.email, verified=ver)
