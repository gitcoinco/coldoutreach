# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

import generator.resume_parser as resume_parser
import os
import json

# Create your tests here.

import pdb

class TestResumeParser(TestCase):

  def load_resume(self, resume_name):
    path_to_directory = "generator/fixtures/{resume_name}.pdf".format(resume_name=resume_name)
    file_path = os.path.abspath(path_to_directory)
    json_string = resume_parser.convert(file_path)
    json_file = json.loads(json_string)
    return json_file

  def get_jobs_array(self, resume_name):
    json_file = self.load_resume(resume_name)
    jobs_array = json_file["Jobs"]
    return jobs_array

  def get_education_array(self, resume_name):
    json_file = self.load_resume(resume_name)
    education_array = json_file["Education"]
    return education_array

  def test_name(self):
    json_file = self.load_resume("TariqAliProfile")
    expected_name = "Tariq"
    actual_name = json_file["Name"]
    self.assertEqual(expected_name, actual_name)

  def test_surname(self):
    json_file = self.load_resume("TariqAliProfile")
    expected_surname = "Ali"
    actual_surname = json_file["Surname"]
    self.assertEqual(expected_surname, actual_surname)

  def test_jobs_array_length(self):
    jobs_array = self.get_jobs_array("TariqAliProfile")
    expected_length = 11
    actual_length = len(jobs_array)
    self.assertEqual(expected_length, actual_length)

  def test_jobs_title(self):
    jobs_array = self.get_jobs_array("TariqAliProfile")
    example_job = jobs_array[0]
    expected_title = "Software Design Engineer (Contract)"
    actual_title = example_job["Title"]
    self.assertEqual(expected_title, actual_title)

  def test_jobs_description(self):
    jobs_array = self.get_jobs_array("TariqAliProfile")
    example_job = jobs_array[0]
    expected_description = "• Participated in a project to automate the interview scheduling process at a department, with an emphasis  on helping the team build an internal .NET (C#) web application. Wrote client-side and server-side  validation for user input,  wrote automated tests and manual test cases, and set up a build process. Conducted  some initial research into PowerApps and Microsoft Flow to help the rest of the team incorporate these  technologies into the automation project. • Participated in a project to help identify critical issues within an application, and presented this project to  other people within the organization. Wrote C# and C++ code to instrument telemetry, and used internal  tools to generate e-mail alerts based on that telemetry. Page 1 "
    actual_description = example_job["Description"]
    self.assertEqual(expected_description, actual_description)

  def test_jobs_dates(self):
    jobs_array = self.get_jobs_array("TariqAliProfile")
    example_job = jobs_array[0]
    expected_dates = { "from_month": "July", "from_year": "2017", "to_month": "November", "to_year": "2017" }
    actual_dates = example_job["Dates"]
    self.assertEqual(expected_dates, actual_dates)

  def test_jobs_company(self):
    jobs_array = self.get_jobs_array("TariqAliProfile")
    example_job = jobs_array[0]
    expected_company = "Microsoft"
    actual_company = example_job["Company"]
    self.assertEqual(expected_company, actual_company)

  def test_education_length(self):
    education_array = self.get_education_array("TariqAliProfile")
    expected_length = 3
    actual_length = len(education_array)
    self.assertEqual(expected_length, actual_length)

  def test_education_school_title(self):
    education_array = self.get_education_array("TariqAliProfile")
    example_school = education_array[0]
    expected_school_title = "Dev Bootcamp"
    actual_school_title = example_school["School"]
    self.assertEqual(expected_school_title, actual_school_title)

  def test_education_degree(self):
    education_array = self.get_education_array("TariqAliProfile")
    example_school = education_array[0]
    expected_degree = "Certification"
    actual_degree = example_school["Degree"]
    self.assertEqual(expected_degree, actual_degree)

  def test_education_major(self):
    education_array = self.get_education_array("TariqAliProfile")
    example_school = education_array[0]
    expected_majors = "Web Design  Ruby  Javascript  Git"
    actual_majors = example_school["Major"]
    self.assertEqual(expected_majors, actual_majors)

  def test_education_dates(self):
    education_array = self.get_education_array("TariqAliProfile")
    example_school = education_array[0]
    expected_dates = {'from_month': '', 'from_year': '2015', 'to_month': '', 'to_year': '2015'}
    actual_dates = example_school["Dates"]
    self.assertEqual(expected_dates, actual_dates)

  def test_education_activites(self):
    education_array = self.get_education_array("TariqAliProfile")
    example_school = education_array[0]
    expected_activities = "2015 Bumblebees Cohort"
    actual_activites = example_school["Activities"]
    self.assertEqual(expected_activities, actual_activites)

  def test_education_school_with_no_degree_or_major_get_parsed_correctly_when_followed_by_school_with_degree_and_major(self):
    education_array = self.get_education_array("DanBernierProfile")
    first_example_school = education_array[0]
    second_example_school = education_array[1]

    expected_first_degree = "BS"
    actual_first_degree = first_example_school["Degree"]
    self.assertEqual(expected_first_degree, actual_first_degree)

    expected_first_major = "Computer Science"
    actual_first_major = first_example_school["Major"]
    self.assertEqual(expected_first_major, actual_first_major)

    expected_second_degree = ""
    actual_second_degree = second_example_school["Degree"]
    self.assertEqual(expected_second_degree, actual_second_degree)

    expected_second_major = ""
    actual_second_major = second_example_school["Major"]
    self.assertEqual(expected_second_major, actual_second_major)
