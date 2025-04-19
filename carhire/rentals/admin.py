from django.contrib import admin
from .models import User, CarModel, Booking, PaymentModel
admin.site.register(User)
admin.site.register(CarModel)
admin.site.register(Booking)
admin.site.register(PaymentModel)
# Register your models here.
