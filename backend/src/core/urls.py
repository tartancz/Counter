from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from accounts.views import get_all_user
from counter.views import CounterViewSet, foreign_counter

router = DefaultRouter()
router.register("counter", CounterViewSet, "counter")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("accounts.urls")),
    path("", include(router.urls)),
    path("all_users/", get_all_user, name="all-users"),
    path("foreign_counter/<username>/", foreign_counter, name="foreign-counter"),
]
