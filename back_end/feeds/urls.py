from django.conf.urls import url
from .views import FeedViewSet, ProfileFeedDetailAPI

feed_list = FeedViewSet.as_view({"get": "list", "post": "create"})

feed_detail = FeedViewSet.as_view(
    # {"get": "retrieve", "patch": "partial_update", "delete": "destroy"}
    {"get" : "retrieve"}
)

profile_feed_detail = ProfileFeedDetailAPI.as_view()

urlpatterns = [
    url("^feeds/$", feed_list, name="feed-list"),
    url("^feeds/(?P<pk>[0-9]+)/$", feed_detail, name="feed-detail"),
    url("^profile/feeds/(?P<pk>[0-9]+)/$", profile_feed_detail, name="profile-feed_detail"),
]