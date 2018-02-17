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
    expected_counter = Counter({'Ruby': 8, 'Rails': 5, 'WordPress': 3, 'Bootstrap': 2, 'JavaScript': 1, 'jQuery': 1, '.NET': 1, 'C#': 1, 'RSpec': 1, 'Sinatra': 1, 'C++': 1, 'Angular': 1, 'Javascript': 1, 'Ethereum': 1, 'blockchain': 1})
    actual_counter = self.generate_counter("TariqAliProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_second_tariq_ali_profile(self):
    expected_counter = Counter({'Ruby': 15, 'Rails': 5, 'WordPress': 3, 'Angular': 3, 'Sinatra': 2, 'jQuery': 2, 'JavaScript': 2, 'C++': 2, 'Twitter': 2, 'Javascript': 2, 'Bootstrap': 2, 'GitHub': 1, '.NET': 1, 'RSpec': 1, 'blockchain': 1, 'Ethereum': 1, 'Capistrano': 1, 'AWS': 1, 'C#': 1, 'React': 1})
    actual_counter = self.generate_counter("Tariq_Ali")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_dan_bernier_profile(self):
    expected_counter = Counter({'Ruby': 7, 'Processing': 4, 'C#': 3, 'Rails': 2, 'Javascript': 1, '.NET': 1, 'JavaScript': 1, 'Scheme': 1})
    actual_counter = self.generate_counter("DanBernierProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_dylan_hirschkorn_profile(self):
    expected_counter = Counter({'Dylan': 3, 'Visual Basic': 3, 'BASIC': 3, 'C#': 2, 'Swift': 1})
    # This is a bug, Dylan only mentioned "Visual Basic", not "Basic" on his resume. However, I do not know of a good way of fixing this specific edge case. Also, Dylan is the name of a programming language, which is why Dylan shows up in the counter.
    actual_counter = self.generate_counter("DylanHirschkornProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_sean_dugan_murphy_profile(self):
    expected_counter = Counter({'Swift': 11, 'Twitter': 3, 'Objective-C': 3, 'Facebook': 3, 'GitHub': 2, 'YouTube': 2, 'CSS': 1, 'C#': 1})
    actual_counter = self.generate_counter("SeanDuganMurphyProfile")
    self.assertEqual(expected_counter, actual_counter)

  def test_parse_christopher_salat_ceev(self):
    # Note that Christopher Salat does not actually know either PHP or Scratch. He links to several websites that end with the .php extension and he serves as a Scratch DJ. This indicates a problem with relying solely on keywords detached from the context.
    expected_counter = Counter({'YouTube': 5, 'PHP': 2, 'Scratch': 1})
    actual_counter = self.generate_counter("Christopher_Salat_Ceev")
    self.assertEqual(expected_counter, actual_counter)