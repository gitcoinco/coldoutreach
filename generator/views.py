# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

import generator.resume_saver as resume_saver

import generator.letter_generator as letter_generator

def index(request):
  context = {}
  if request.method == 'POST':
      if request.FILES['recruiter_file']:
        recruiter_file = request.FILES['recruiter_file']
        json_blob_recruiter = resume_saver.save(recruiter_file)
        context["uploaded_file_json"] = json_blob_recruiter.json
      if request.FILES['candidate_file']:
        candidate_file = request.FILES['candidate_file']
        json_blob_candidate = resume_saver.save(candidate_file)
        context["uploaded_file_json_2"] = json_blob_candidate.json
      if context["uploaded_file_json"] and context["uploaded_file_json_2"]:
        context["generated_text"] = letter_generator.generate(context["uploaded_file_json"], context["uploaded_file_json_2"])


  return render(request, 'generator/index.html', context)

def profile(request):
  context = {}
  return render(request, 'generator/profile.html', context)

def email(request):
  context = {}
  return render(request, 'generator/email.html', context)