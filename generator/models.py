# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

import uuid

# Create your models here.
class LinkedInPDF(models.Model):
    guid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    json = models.TextField()