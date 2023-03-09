from rest_framework import serializers

from .models import Counter


class CounterSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(min_value=0, required=False)
    created_at = serializers.ReadOnlyField()
    modified_at = serializers.ReadOnlyField()

    class Meta:
        model = Counter
        fields = ["id", "count", "created_at", "modified_at"]

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        validated_data["owner"] = user
        return super().create(validated_data)


class ForeignCounterSerializer(serializers.ModelSerializer):
    count = serializers.ReadOnlyField()

    class Meta:
        model = Counter
        fields = ["id", "count"]
