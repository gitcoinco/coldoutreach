# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

def index(request):
  context = {}
  return render(request, 'generator/index.html', context)

def profile(request):
  context = {}
  return render(request, 'generator/profile.html', context)

def email(request):
  context = {}
  return render(request, 'generator/email.html', context)