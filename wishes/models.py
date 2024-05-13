from django.db import models
from django.utils import timezone

# Create your models here.

class Wish(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Comment(models.Model):
    wish = models.ForeignKey(Wish,on_delete=models.CASCADE)
    author = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)



