from django.db import models
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    is_owner = models.BooleanField(default=False)
    is_renter = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now
    =True)
    def __str__(self):
        return self.username
    
class Car_Model(models.Model):
    car_owner = models.ForeignKey(User, on_delete=models.CASCADE
    )
    car_model = models.CharField(max_length=100)
    car_make = models.CharField(max_length=100)
    car_year = models.IntegerField()
    price_per_day = models.IntegerField()
    availability = models.BooleanField(default=True)
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='car_images')
    def __str__(self):
        return self.car_model
    
class Booking(models.Model):
    car = models.ForeignKey(Car_Model, on_delete=models.CASCADE)
    renter = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    total_cost = models.IntegerField()
    booking_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)
    def __str__(self):
        return self.car.car_model + ' - ' + self.renter.username
    
class payment_model(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now=True)
    amount = models.IntegerField()
    payment_method = models.CharField(max_length=100)
    payment_status = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100)
    def __str__(self):
        return self.booking.car.car_model + ' - ' + self.booking.renter.username    
        
# Create your models here.
