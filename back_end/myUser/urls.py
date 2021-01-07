from django.conf.urls import url
from .views import RegistrationAPI, LoginAPI, UserAPI, MyInfoViewSet

myInfo = MyInfoViewSet.as_view(
    {"get": "retrieve", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^myInfo/(?P<pk>[0-9]+)/$", myInfo, name="feed-detail"),
]