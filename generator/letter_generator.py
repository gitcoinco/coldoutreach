import json
from collections import Counter
import tracery
from tracery.modifiers import base_english

def create_letter(keyword):
  rules = {
      'origin': '#introduction# #talk_about_talent# #lead_into_job_description#',
      'introduction': ['Found your #website# via Google and enjoyed #reading# it.', 'Stumbled uponed upon your #website#, and loved #reading# it.', 'Found your #website# via a keyword search.'],
      'website': ['website', 'blog', 'profile', 'resume'],
      'reading': ['reading', 'looking at'],
      'talk_about_talent': ['You look like you #know# #keyword_praise#.'],
      'know': ['know', 'understand'],
      'keyword_praise': ['your KEYWORD-fu', 'KEYWORD deeply', 'KEYWORD down to a science'],
      'lead_into_job_description': ['I have #interesting.a# project for you to look at.', "My company is looking for #interesting# people like you."],
      'interesting': ['interesting', 'cool', 'awesome', 'neat'],
  }
  grammar = tracery.Grammar(rules)
  grammar.add_modifiers(base_english)
  letter = grammar.flatten("#origin#").replace("KEYWORD", keyword)
  return letter

def convert_json_string_to_set(json_string):
  json_file = json.loads(json_string)
  return Counter(json_file)

def generate(recruiter_json, candidate_json):
  recruiter_counter = convert_json_string_to_set(recruiter_json)
  candidate_counter = convert_json_string_to_set(candidate_json)
  combined_set = recruiter_counter & candidate_counter
  greatest_keyword = combined_set.most_common(1)
  if (len(greatest_keyword) > 0):
    greatest_keyword = greatest_keyword[0][0]
  else:
    greatest_keyword = "software"
  generated_letter = create_letter(greatest_keyword.capitalize())
  return generated_letter