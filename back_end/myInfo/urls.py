from django.conf.urls import url
from .views import MyInfoViewSet

myInfo_list = MyInfoViewSet.as_view({"get": "list", "post": "create"})

myInfo_detail = MyInfoViewSet.as_view(
    {"get": "retrieve", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    url("^myInfo/$", myInfo_list, name="myInfo-list"),
    url("^myInfo/(?P<pk>[0-9]+)/$", myInfo_detail, name="myInfo-detail"),
]