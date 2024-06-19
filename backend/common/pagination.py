from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = "page_size"  # Permite a los usuarios especificar el tamaño de la página
    max_page_size = 100  # Puedes ajustar esto según tus necesidades

    def get_paginated_response(self, data):
        return Response(
            {
                "links": {"next": self.get_next_link(), "previous": self.get_previous_link()},
                "count": self.page.paginator.count,
                "page_size": self.page_size,
                "results": data,
            }
        )
