from django.urls import path
from .views import Log_in, Log_out, Register, Info


urlpatterns = [
    path("", Info.as_view()),
    path("register/", Register.as_view()),
    path("logout/", Log_out.as_view()),
    path("login/", Log_in.as_view()),
]
