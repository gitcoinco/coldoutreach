# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

import generator.resume_saver as resume_saver

import generator.letter_generator as letter_generator

from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

import json

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

@csrf_exempt
def profile(request):
  context = {}
  if request.FILES['recruiter_file']:
    recruiter_file = request.FILES['recruiter_file']
    json_blob_recruiter = resume_saver.save(recruiter_file)
    context["recruiter_json"] = json_blob_recruiter.json
  if request.FILES['candidate_file']:
    candidate_file = request.FILES['candidate_file']
    json_blob_candidate = resume_saver.save(candidate_file)
    context["candidate_json"] = json_blob_candidate.json
  if context["recruiter_json"] and context["candidate_json"]:
    context["generated_text"] = letter_generator.generate(context["recruiter_json"], context["candidate_json"])
  return JsonResponse(context)

@csrf_exempt
def email(request):
  context = {}
  data = json.loads(request.body)
  if data['recruiter_json']:
    context["recruiter_json"] = data['recruiter_json']
  if data['candidate_json']:
    context["candidate_json"] = data['candidate_json']
  if context["recruiter_json"] and context["candidate_json"]:
    context["generated_text"] = letter_generator.generate(context["recruiter_json"], context["candidate_json"])
  return JsonResponse(context)