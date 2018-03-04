#!/usr/bin/env python

# dependency - pdfminer
# or pdfminer.six (for python3)

# Originally from https://github.com/hellpanderrr/linkedin-pdf-parsing
# But its codebase was changed heavily
# License  - GNU 2.0, will probably relicense this up...

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

import re

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

def convert_pdf_to_objects(input_file):
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
    return objs

def extract_text(objs):
    text = ""
    for obj in objs:
        if "get_text" in dir(obj):
            text += obj.get_text()
    cleansed_text = text.replace('\n', ' ')
    return cleansed_text

def count_of_technology_words(word, resume_as_text):
    escaped_word = re.escape(word)
    regex_pattern = r'(^|\s|[.]){word}($|\s|[.])'.format(word=escaped_word)
    array = re.findall(regex_pattern, resume_as_text, re.IGNORECASE)
    return len(array)

def get_counter(resume_as_text):
    counter = Counter()

    for word in technology_jargon.keywords:
        count = count_of_technology_words(word, resume_as_text)
        if count > 0:
            counter[word] += count

    return counter

def extract_data(resume_as_text, regex_pattern):
    match_object = re.search(regex_pattern, resume_as_text)
    if match_object:
        return match_object.group(0)
    else:
        return ""

def get_name(resume_as_text):
    # Normally, a candidate's name has two words, both of which starts with capital letters
    normal_name_regex_pattern = r'([A-Z][a-z]*)(\s[A-Z][a-z]*)'
    normal_name = extract_data(resume_as_text, normal_name_regex_pattern)

    # One resume in the test set displays the name of the candidate in all-caps, which is really annoying. So we have this code to handle the edge case.
    edge_case_regex_pattern = r'([A-Za-z]*)(\s[A-Za-z]*)'
    edge_case_name = extract_data(resume_as_text, edge_case_regex_pattern)

    if len(edge_case_name) > len(normal_name):
        return edge_case_name.title()
    else:
        return normal_name.title()

def get_email(resume_as_text):
    email_regex_pattern = r'([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})'
    email = extract_data(resume_as_text, email_regex_pattern)
    return email

def convert(input_file):
    objs = convert_pdf_to_objects(input_file)

    resume_as_text = extract_text(objs)

    name = get_name(resume_as_text)
    email = get_email(resume_as_text)
    counter = get_counter(resume_as_text)

    dictionary = { "counter": counter, "name": name, "email": email}

    return json.dumps(dictionary)
