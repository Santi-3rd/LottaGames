from django.urls import path
from .views import Log_in, Log_out, Register, Info, UserName, UpdateUserName, UpdateEmail, UpdatePassword


urlpatterns = [
    path("", Info.as_view()),
    path("<int:user_id>/", UserName.as_view()),
    path("register/", Register.as_view()),
    path("logout/", Log_out.as_view()),
    path("login/", Log_in.as_view()),
    path("update_username/", UpdateUserName.as_view(), name='update_username'),
    path("update_email/", UpdateEmail.as_view(), name='update_email'),
    path("update_password/", UpdatePassword.as_view(), name='update_password'),
]
