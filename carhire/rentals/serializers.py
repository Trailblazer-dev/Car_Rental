from rest_framework import serializers
from .models import User, Car_Model, Booking, payment_model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class Car_ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car_Model
        fields = '__all__'        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking     
        fields = '__all__'
class payment_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = payment_model   
        fields = '__all__'
                        
