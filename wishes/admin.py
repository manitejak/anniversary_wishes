from django.contrib import admin
from .models import Wish,Comment
# Register your models here.

class WishesAdmin(admin.ModelAdmin):
    pass
    
    
admin.site.register(Wish)
admin.site.register(Comment)
