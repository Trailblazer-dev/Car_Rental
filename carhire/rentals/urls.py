from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserView, CarModelView, BookingView, PaymentModelView

router = DefaultRouter()
router.register(r'users', UserView)
router.register(r'cars', CarModelView)
router.register(r'bookings', BookingView)
router.register(r'payments', PaymentModelView)

urlpatterns = [
    path('api/', include(router.urls)),  # Prefix API routes with '/api/'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]