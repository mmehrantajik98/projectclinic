from django.urls import path
from . import views

urlpatterns = [
    path("post_info/", views.Post_Info, name="post info"),
    path("get_info/", views.Get_Info, name="get info"),
    path("delete_info/<int:id>/", views.Delete_Info, name="delete info"),
    path("update_info/<int:id>/", views.Update_Info, name="update info"),
    path("search_info/", views.Search_Info, name="search info"),
    path("get_submit_info/", views.Get_Submit_Info, name="get submit info"),
    path("postUsers/", views.Sign, name="sign up users"),
    path("getUsers/", views.getUsers, name="get users"),
    path("check_Auth/", views.protectedAuth, name="Protected Authenticate"),
    path("get_name/", views.getNames, name="get names submit personals"),
    path("Post_to_Consent/", views.Post_to_Consent, name="post to consent"),
    path("Post_to_Abcent/", views.Post_to_Abcent, name="post if abcent"),
    path("getAbcent/", views.getAbcent, name="get abcent patient"),
    path("Logout/", views.Logout, name="logout and del cookies"),
    path("login/", views.CreateTokenCookie.as_view(), name="login users"),
    path("delete_service/<int:person_id>/", views.Delete_Servies, name="Delete Servies"),
    path("get_Photos/<int:person_id>/", views.Get_Photos, name="get photos"),
    path("post_image/<int:person_id>/", views.Post_images, name="post image"),
    path("confirm_info/<int:id>/", views.Confirm_Info, name="confirm info"),
    path("update_service/<int:id>/", views.Service_add_Info, name="add service"),
    path("delete_photo/<int:id>/<str:photo>/", views.del_photo, name="add service"),
    path("patch_photo/<int:id>/<str:photo>/", views.Update_Photo, name="add service"),
]