from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.


class Counter(models.Model):
    count = models.IntegerField(
        default=0, help_text="actual count of counter", null=False, blank=True
    )
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return f"counter with count {self.count} and owner {self.owner}"
