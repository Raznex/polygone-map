from django.contrib.gis.db import models


class CoordinatesModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    polygon = models.PolygonField()
    meridian = models.BooleanField(default=False)
