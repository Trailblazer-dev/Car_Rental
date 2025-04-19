from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import User, CarModel, Booking, PaymentModel
from .serializers import UserSerializer, CarModelSerializer, BookingSerializer, PaymentModelSerializer
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
class CarModelView(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    #permission_classes = [IsAuthenticated]
class BookingView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
class PaymentModelView(viewsets.ModelViewSet):
    queryset = PaymentModel.objects.all()
    serializer_class = PaymentModelSerializer
    permission_classes = [IsAuthenticated]
    

# Create your views here.
