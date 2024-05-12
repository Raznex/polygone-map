from rest_framework_gis import serializers
from .models import CoordinatesModel


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoordinatesModel
        fields = ('id', 'name', 'polygon', 'meridian')
