from django.conf.urls import url
from .views import FeedViewSet

feed_list = FeedViewSet.as_view({"get": "list", "post": "create"})

feed_detail = FeedViewSet.as_view(
    {"get": "retrieve", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    url("^feeds/$", feed_list, name="feed-list"),
    url("^feeds/(?P<pk>[0-9]+)/$", feed_detail, name="feed-detail"),
]