from rest_framework import serializers
from .models import User, CarModel, Booking, PaymentModel
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = '__all__'        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking     
        fields = '__all__'
class PaymentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentModel   
        fields = '__all__'
                        
