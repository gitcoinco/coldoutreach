# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from generator.models import LinkedInPDF

import uuid

import pdb

import generator.resume_parser as resume_parser

def index(request):
  pdb.set_trace()
  context = {}
  if request.method == 'POST' and request.FILES['myfile']:
      myfile = request.FILES['myfile']
      # my goal is to use the resume_parser command line tool
      # to parse the uploaded file and then return the JSON
      # string which is then returned to the user.

      fs = FileSystemStorage()
      extension = myfile.name.split('.')[-1]
      random_name = uuid.uuid4()
      filename ="%s.%s" % (random_name, extension)
      fs.save(filename, myfile)
      context["uploaded_file_json"] = resume_parser.convert(filename)
      pdf = LinkedInPDF(guid=random_name, json=context["uploaded_file_json"])
      pdf.save()

      # import subprocess
      # import sys
      # res = subprocess.run([sys.executable, "generator/resume_parser.py", "-i", filename])
      # context["uploaded_file_json"] = sys.stdout
  return render(request, 'generator/index.html', context)

def profile(request):
  context = {}
  return render(request, 'generator/profile.html', context)

def email(request):
  context = {}
  return render(request, 'generator/email.html', context)