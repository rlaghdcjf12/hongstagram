from django.conf.urls import url
from .views import FeedViewSet, GetFeedOwnerAPI, FeedAddAPI, LoadMoreFeeds, GetFeedPageAPI

feed_list = FeedViewSet.as_view(
    {"get": "list"}
)

feed_detail = FeedViewSet.as_view(
    {"get" : "retrieve", "delete": "destroy"}
)
    # {"get": "retrieve", "patch": "partial_update", "delete": "destroy"}


urlpatterns = [
    url("^feeds/$", feed_list),
    url("^feeds/(?P<pk>[0-9]+)/$", GetFeedPageAPI.as_view()),
    url("^feeds/owner/(?P<pk>[0-9]+)/$", GetFeedOwnerAPI.as_view()),
    url("^feeds/add/$", FeedAddAPI.as_view()),
    url("^feeds/next/(?P<id>[0-9]+)/$", LoadMoreFeeds.as_view()),
]