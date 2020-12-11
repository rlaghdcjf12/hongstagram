from django.conf.urls import url
from .views import LoginViewSet

login_list = LoginViewSet.as_view({"get": "list", "post": "create"})

urlpatterns = [
    url("^login/$", login_list, name="login_list"),
]