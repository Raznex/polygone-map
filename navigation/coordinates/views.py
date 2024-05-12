from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import CoordinatesModel
from .serializers import CoordinatesSerializer


class CoordinatesViewSet(viewsets.ModelViewSet):
    queryset = CoordinatesModel.objects.all()
    serializer_class = CoordinatesSerializer

    def list(self, request, *args, **kwargs):
        name = request.query_params.get('name')
        if name:
            obj = self.get_queryset().filter(name=name).first()
            if obj:
                serializer = self.get_serializer(obj)
                return Response(serializer.data)
            else:
                return Response({"error": f"Object with name '{name}' does not exist."},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            return super().list(request, *args, **kwargs)


    def create(self, request, *args, **kwargs):
        # Получаем данные из запроса
        data = request.data

        # Проверяем, нужно ли корректировать координаты
        modified_polygon, meridian_crossed = self.check_and_correct_polygon(data.get('polygon', []))

        # Обновляем данные в запросе, если была произведена коррекция
        if modified_polygon:
            data['polygon'] = modified_polygon
            data['meridian'] = meridian_crossed

        # Передаем данные в сериализатор для валидации и создания объекта
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @staticmethod
    def check_and_correct_polygon(polygon_data):
        """
        Проверяет координаты полигона на пересечение антимеридиана.
        Если обнаружено пересечение, производит коррекцию координат и возвращает модифицированный полигон.
        """
        meridian_crossed = False
        coordinates = polygon_data.get('coordinates')[0]

        # Проверяем каждую координату в полигоне
        for i, coord in enumerate(coordinates):
            # Если координата больше 180, значит она за антимеридианом
            if float(coord[1]) > 180:
                converted_number = round((coord[1] - 360), 3)
                # Корректируем координату
                coordinates[i] = [coord[0], converted_number]
                meridian_crossed = True

        if meridian_crossed:
            return polygon_data, meridian_crossed
        else:
            return None, meridian_crossed