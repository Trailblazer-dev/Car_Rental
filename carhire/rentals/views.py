from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Car_Model, Booking, payment_model
from .serializers import UserSerializer, Car_ModelSerializer, BookingSerializer, payment_modelSerializer
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class Car_ModelView(viewsets.ModelViewSet):
    queryset = Car_Model.objects.all()
    serializer_class = Car_ModelSerializer
class BookingView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
class payment_modelView(viewsets.ModelViewSet):
    queryset = payment_model.objects.all()
    serializer_class = payment_modelSerializer
    

# Create your views here.
