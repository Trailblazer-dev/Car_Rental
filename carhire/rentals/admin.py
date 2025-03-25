from django.contrib import admin
from .models import User, Car_Model, Booking, payment_model
admin.site.register(User)
admin.site.register(Car_Model)
admin.site.register(Booking)
admin.site.register(payment_model)
# Register your models here.
