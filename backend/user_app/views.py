from django.shortcuts import render
from .models import App_user
from django.contrib.auth import authenticate, update_session_auth_hash
from django.contrib.auth.hashers import check_password
from django.contrib.auth.forms import PasswordChangeForm
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from django.http import HttpResponse

# Create your views here.


class Log_in(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": {"email": user.email}, "token": token.key})
        else:
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class Register(APIView):
    def post(self, request):
        request.data["username"] = request.data["name"]
        user = App_user.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": {"email": user.email, "name": user.name}, "token": token.key}, status=HTTP_201_CREATED
        )
    

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email, "name":request.user.name})
    
class UserName(APIView):
    def get(self, request, user_id=None):
        if user_id is not None:
            try:
                user = App_user.objects.get(id=user_id)
                name = user.name
                return Response({"name": name}, status=HTTP_200_OK)
            except App_user.DoesNotExist:
                return Response("User not found", status=HTTP_400_BAD_REQUEST)
        else:
            return Response("User ID not provided", status=HTTP_400_BAD_REQUEST)
    
class UpdateUserName(APIView):
    def put(self, request):
        new_name = request.data.get('name')
        if not new_name:
            return Response({"error": "Please provide a ew name"}, status=HTTP_400_BAD_REQUEST)
        
        user = request.user

        if App_user.objects.filter(name=new_name).exclude(id=user.id).exists():
            return Response({"error": "Name already exists. Please choose another name."}, status=HTTP_400_BAD_REQUEST)
        
        user.username = new_name
        user.name = new_name
        user.save()

        return Response({"name": request.user.name})

class UpdateEmail(APIView):
    def put(self, request):

        old_email = request.data.get('oldEmail')
        new_email = request.data.get('newEmail')
        user = request.user

        if old_email != user.email:
            return Response({"error": "Please provide old email"}, status=HTTP_400_BAD_REQUEST)
        
        if old_email == new_email:
                return Response({"error": "Please provide a new email"}, status=HTTP_400_BAD_REQUEST)
        
        try:
            validate_email(new_email)
        except ValidationError as e:
            return Response({"error": "Please provide a valid email"}, status=HTTP_400_BAD_REQUEST)
        else:
            user.email = new_email
            user.save()

        return Response({"email": request.user.email})

class UpdatePassword(APIView):
    def put(self, request):

        old_password = request.data.get('oldPassword')
        new_password = request.data.get('newPassword')
        user = request.user
        print("old:" + old_password, "new:" + new_password)

        if not check_password(old_password, user.password):
            return Response({"error": "Please provide the correct old password"}, status=HTTP_400_BAD_REQUEST)
        
        if old_password == new_password or not new_password:
            return Response({"error": "Please provide a new password"}, status=HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)
        
        return Response({"message": "Password changed successfully"})
    
class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
