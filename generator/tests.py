# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

from collections import Counter

import generator.resume_parser as resume_parser
import os
import json

class TestResumeParser(TestCase):
  def load_resume(self, resume_name):
    path_to_directory = "generator/fixtures/{resume_name}.pdf".format(resume_name=resume_name)
    file_path = os.path.abspath(path_to_directory)
    json_string = resume_parser.convert(file_path)
    json_file = json.loads(json_string)
    return json_file

  def convert_to_counter(self, json_file):
    return Counter(json_file)

  def generate_counter(self, resume_name):
    json_file = self.load_resume(resume_name)
    return self.convert_to_counter(json_file)

  def test_parse_tariq_ali_profile(self):
    expected_counter = Counter({'ruby': 8, 'rails': 5, 'wordpress': 3, 'javascript': 2, 'bootstrap': 2, 'rspec': 1, 'jquery': 1, 'ethereum': 1, 'angular': 1, 'sinatra': 1, 'c#': 1, 'c++': 1, '.net': 1, 'blockchain': 1})
    actual_counter = self.generate_counter("TariqAliProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_second_tariq_ali_profile(self):
    expected_counter = Counter({'ruby': 15, 'rails': 5, 'javascript': 4, 'wordpress': 3, 'angular': 3, 'jquery': 2, 'bootstrap': 2, 'c++': 2, 'twitter': 2, 'sinatra': 2, 'aws': 1, 'capistrano': 1, 'c#': 1, '.net': 1, 'blockchain': 1, 'react': 1, 'github': 1, 'rspec': 1, 'ethereum': 1})
    actual_counter = self.generate_counter("Tariq_Ali")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_dan_bernier_profile(self):
    expected_counter = Counter({'ruby': 7, 'processing': 4, 'c#': 3, 'rails': 2, 'javascript': 2, 'scheme': 1, '.net': 1})
    actual_counter = self.generate_counter("DanBernierProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_dylan_hirschkorn_profile(self):
    expected_counter = Counter({'basic': 3, 'dylan': 3, 'visual basic': 3, 'c#': 2, 'swift': 1})
    # This is a bug, Dylan only mentioned "Visual Basic", not "Basic" on his resume. However, I do not know of a good way of fixing this specific edge case. Also, Dylan is the name of a programming language, which is why Dylan shows up in the counter.
    actual_counter = self.generate_counter("DylanHirschkornProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_sean_dugan_murphy_profile(self):
    expected_counter = Counter({'swift': 11, 'twitter': 3, 'objective-c': 3, 'facebook': 3, 'github': 2, 'youtube': 2, 'css': 1, 'c#': 1})
    actual_counter = self.generate_counter("SeanDuganMurphyProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_christopher_salat_ceev(self):
    expected_counter = Counter({'youtube': 5, 'php': 2, 'scratch': 1})
    actual_counter = self.generate_counter("Christopher_Salat_Ceev")
    self.assertEqual(expected_counter, actual_counter)