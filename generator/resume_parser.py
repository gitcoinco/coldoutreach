#!/usr/bin/env python

# dependency - pdfminer
# or pdfminer.six (for python3)

# Originally from https://github.com/hellpanderrr/linkedin-pdf-parsing
# License  - GNU 2.0, will probably relicense this up...

# originally a command-line tool, we're refactoring it to be some library of some kind, which is why it's all methods now

# -*- coding: utf8 -*-
import os
import re
import sqlite3
import argparse
import sys
import glob
# from collections import OrderedDict
from collections import Counter

import generator.technology_jargon as technology_jargon

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfpage import PDFTextExtractionNotAllowed
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.layout import LAParams
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTTextBox, LTTextLine, LTFigure, LTImage, LTTextLineHorizontal, LTChar, LTLine, \
    LTText
import json

# def parse_date(dates):
#     """Parses a string with the dates in it,
#     take string, returns a dictionary: {'from_month':'','from_year':'','to_month':'','to_year':''}
#     """
#     ret = {'from_month': '', 'from_year': '', 'to_month': '', 'to_year': ''}

#     dates = dates.strip().split('-')

#     if len(dates) == 2:
#         date_from = dates[0].strip().split(' ')
#         date_to = dates[1].strip().split(' ')
#         if len(date_from) == 1:
#             ret['from_month'] = ''
#             ret['from_year'] = date_from[0]
#         elif len(date_from) == 2:
#             ret['from_month'] = date_from[0]
#             ret['from_year'] = date_from[1]
#         if len(date_to) == 1:
#             ret['to_month'] = ''
#             ret['to_year'] = date_to[0]
#         elif len(date_to) == 2:
#             ret['to_month'] = date_to[0]
#             ret['to_year'] = date_to[1]

#     return ret

# def get_chars(line, with_anno=True):
#     # get chars from the LTTextline
#     ret = []
#     for char in line:
#         if with_anno:
#             ret.append(char)
#         elif not with_anno and type(char) != pdfminer.layout.LTAnno:
#             ret.append(char)
#     return ret

isiterable = lambda obj: isinstance(obj, str) or getattr(obj, '__iter__', False)

def get_objects(layout):
    # collecting all objects from the layout, 1 level depth
    objs = []
    for obj in layout:

        if isiterable(obj):
            for element in obj:
                objs.append(element)
        else:
            objs.append(obj)
    return objs

# def get_data(objs, name):
#     """Collects objects from a header with 'name' in it.
#     Takes list of LTObjects, returns list of LTObjects
#     """
#     FONTSIZE = 17  # heading's font size is 17.85
#     ed_st = ed_en = 0
#     for idx, obj in enumerate(objs):
#         if isinstance(obj, LTTextLineHorizontal) and name in obj.get_text() and get_chars(obj)[
#             0].size > FONTSIZE and not ed_st:
#             ed_st = idx
#         if isinstance(obj, LTLine) and ed_st and not ed_en:
#             ed_en = idx
#     return objs[ed_st + 1:ed_en]

# def get_name(objs):
#     """Collects persons' names, takes a list of LTObjects, returns a
#     list: [name,surname]
#     """
#     name = ''
#     for obj in objs:
#         if isinstance(obj, LTTextLine):
#             for char in obj:
#                 if isinstance(char, LTChar):
#                     if char.size > 23:
#                         name = obj.get_text()
#                         break
#     name = name.strip().split(' ')

#     return [name[0], len(name) > 1 and ' '.join(name[1:])]

# def get_experience_info(objs):
#     """Collects companies' names,titles and dates, takes list of LTObjects, returns a
#     list: [title,company,{'from_month':'','from_year':'','to_month':'','to_year':''},description]
#     """
#     FONTSIZE = 13.4  # fontsize of bold headers
#     ret = []
#     company = title = ''

#     row = {}
#     description = ""
#     for idx, obj in enumerate(objs):
#         company = title = ''
#         if idx > 0 and get_chars(objs[idx - 1])[0].size > FONTSIZE:
#             # we finished gathering info on the old job.
#             # save it in the ret array, and then create a new
#             # row array to store new info about the job
#             if (len(row) > 0):
#               row["Description"] = description
#               ret.append(row)
#               description = ""
#               row = {}
#             brackets = re.search('([(]+(.)*[)]+)', obj.get_text())
#             # print brackets
#             if brackets:
#                 header = objs[idx - 1].get_text().split(' at ')
#                 if len(header) == 2:
#                     company = header[1].strip()
#                     title = header[0].strip()
#                 row["Title"] = title
#                 row["Company"] = company
#                 row["Dates"] = parse_date(obj.get_text()[:brackets.start()])
#         else:
#           if (len(row) > 0 and get_chars(objs[idx ])[0].size < FONTSIZE):
#             description += obj.get_text().replace('\n', ' ')

#     # if we broke out here, then we need to save the final row
#     # before saving the ret value
#     row["Description"] = description
#     ret.append(row)
#     return ret

# def is_school_header(obj):
#     FONTSIZE = 13.4  # fontsize of bold headers
#     has_header = get_chars(obj)[0].size > FONTSIZE
#     mentions_activities_and_societies = (re.match("^Activities and Societies:", obj.get_text()))
#     is_valid_header = not mentions_activities_and_societies
#     return (has_header and is_valid_header)

# def get_credential_info(credential_object):
#     if credential_object is not None:
#         credential_array = credential_object.split(",")
#         if len(credential_array) >= 3:
#             degree = credential_array[0].strip()
#             major = ' '.join(credential_array[1:-1]).strip()
#             dates = parse_date(credential_array[-1])
#         elif len(credential_array) == 2:
#             degree = ""
#             major = credential_array[0]
#             dates = parse_date(credential_array[1])
#         elif len(credential_array) == 1:
#             degree = major = ""
#             dates = parse_date(credential_array[0])

#     else:
#         degree = major = ""
#         dates = {'from_month': '', 'from_year': '', 'to_month': '', 'to_year': ''}

#     return [degree, major, dates]

# def get_activities_info(activities_text):
#     if re.match("^Activities and Societies:", activities_text):
#         activities_array = activities_text.split(':')
#         activites = activities_array[1].strip()
#     else:
#         activites = ''

#     return activites

# def get_info_about_school(obj, objs, idx):
#     try:
#         credential_object = objs[idx + 1].get_text()
#     except Exception as e:
#         print(e)
#         credential_object = ''
#     try:
#         activities_text = objs[idx + 2].get_text()
#     except Exception as e:
#         print(e)
#         activities_text = ''

#     school = obj.get_text().strip()
#     degree, major, dates = get_credential_info(credential_object)
#     activites = get_activities_info(activities_text)

#     dictionary = { "School": school, "Degree": degree, "Major": major, "Dates": dates, "Activities": activites }
#     return dictionary

# def get_education_info(objs):
#     """Collects schools,majors,dates, takes a list of LTObjects, returns a
#     list: [school,degree,major,{'from_month':'','from_year':'','to_month':'','to_year':''}]
#     BUG - get_education_info does not properly account for "Activites and Societies"
#     """
#     # collect schools and dates
#     ret = []
#     for idx, obj in enumerate(objs):
#         if is_school_header(obj):
#             school = get_info_about_school(obj, objs, idx)
#             ret.append(school)
#     return ret

def extract_text(objs):
    text = ""
    for obj in objs:
        if "get_text" in dir(obj):
            text += obj.get_text()
    cleansed_text =  text.replace('\n', ' ')
    array = cleansed_text.split(" ")
    return array

def is_valid_technology_word(word, keywords):
    return word.lower() in keywords

def convert(input_file):
    f = input_file
    fp = open(f, 'rb')
    # Create a PDF parser object associated with the file object.
    parser = PDFParser(fp)
    # Create a PDF document object that stores the document structure.
    document = PDFDocument(parser)
    # Check if the document allows text extraction. If not, abort.
    if not document.is_extractable:
        raise PDFTextExtractionNotAllowed
    # Create a PDF resource manager object that stores shared resources.
    rsrcmgr = PDFResourceManager()
    # Create a PDF device object.
    laparams = LAParams()
    # Create a PDF page aggregator object.
    device = PDFPageAggregator(rsrcmgr, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    objs = []
    for page in PDFPage.create_pages(document):
        interpreter.process_page(page)
        # receive the LTPage object for the page.
        layout = device.get_result()
        # collecting objects from the all pages, sorting them by their Y coordinate
        objs.append(sorted(get_objects(layout), key=lambda x: x.y0, reverse=True))
    objs = sum(objs, [])  # flattening to 1D array
    # getting objects from the corresponding sections

    resume_as_text = extract_text(objs)

    counter = Counter()
    for word in resume_as_text:
        if is_valid_technology_word(word, technology_jargon.keywords):
            counter[word.lower().strip()] += 1

    return json.dumps(counter)

    # So there's two approaches to handling the counter,
    # First, a whitelist approach of every single technology word out there,
    # but that's not sustainable because there's always going to be new
    # tech out there. The generated text will probably sound better though.

    # The other approach is to filter out stopwords, but then there's always other weirder words out there. Why don't I return back to that, but have a limit to how small the word can be? 3 or more characters? Could that look fairly reasonable?

    # To find common keywords, use "set_a & set_b". Counters/multisets support intersections.
    # The intersection looks super ugly though, and it looks like for it to work, I'll need to extend the stop_words_set to exclude other common words, like page, months, (months), years, etc. Still, I can see certain jargon come up top, so maybe I just use the most frequent jargon and we'd be good.
    # Less dependency on a hardcoded list of words, but more dependency on the stopword list.

    # I'll stick with the hardcoded list, as much as I hate being dependent on it,


# if __name__ == "__main__":
#     parser = argparse.ArgumentParser()
#     parser.add_argument('-i', '--input', required=True, help="PDF FILE OF AWESOME")
#     args = parser.parse_args()
#     if not args.input:
#         exit("Please specify an existing file using the -i parameter.")
#     input_file = os.path.abspath(args.input)
#     json = convert(input_file)
#     print(json)