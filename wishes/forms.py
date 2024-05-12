# forms.py
from django import forms
from .models import Wish

class PostForm(forms.ModelForm):
    class Meta:
        model = Wish
        fields = ['title', 'content']
