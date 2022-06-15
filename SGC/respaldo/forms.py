from django import forms


class UploadFileForm(forms.Form):
    restorefile = forms.FileField()
