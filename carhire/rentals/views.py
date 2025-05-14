from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import User, CarModel, Booking, PaymentModel
from .serializers import UserSerializer, CarModelSerializer, BookingSerializer, PaymentModelSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class CarModelView(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    
    def get_permissions(self):
        """
        Allow anyone to view cars, but require authentication for other actions
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class BookingView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

class PaymentModelView(viewsets.ModelViewSet):
    queryset = PaymentModel.objects.all()
    serializer_class = PaymentModelSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Create a new user and return success/error message
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        password = request.data.get('password')
        user = serializer.save()
        user.is_renter = True  # Default to renter role
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
