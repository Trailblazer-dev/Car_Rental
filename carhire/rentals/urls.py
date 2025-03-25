from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserView, Car_ModelView, BookingView, payment_modelView
router = DefaultRouter()
router.register(r'user', UserView)
router.register(r'car_model', Car_ModelView)
router.register(r'booking', BookingView)
router.register(r'payment_model', payment_modelView)
urlpatterns = [
    path('', include(router.urls)),
]