from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30, unique=True, blank=True, null=True)
    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['username']