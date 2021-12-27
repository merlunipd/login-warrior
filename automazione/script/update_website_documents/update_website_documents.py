""" Script per compilare i documenti LaTex in PDF ed aggiornare il sito

Dipendenze: python, latexmk

Per funzionare correttamente lo script deve essere utilizzato nel seguente modo:
- Esecuzione: richiamare lo script dal terminale con il comando "python";
- Lo script deve essere contenuto in una directory del progetto;
- Lo script termina con un OK finale (come ultimo messaggio), se non è così
potrebbero esserci stati dei problemi durante l'esecuzione.

"""

import sys
import os
import shutil
# Import script "compile_latex_documents.py"
path_compile_latex_documents = os.path.join(
  os.sep.join(
    os.path.realpath(__file__).split(os.sep)[0:-1]
  )
  , "..", "compile_latex_documents"
)
sys.path.append(path_compile_latex_documents)
import compile_latex_documents

# --- Configurazione ---

NAME_BASE_DIRECTORY = "login-warrior"   # Nome directory radice del progetto
PATH_WEBSITE_DIRECTORY = os.path.join("automazione", "script", "update_website_documents")
PATH_BASE_DIRECTORY = ""  # Inizializzato in "set_path_base_directory"

# --- Funzioni di Supporto ---

def get_website_html():
  try:
    file = open(os.path.join(PATH_WEBSITE_DIRECTORY, "index.html"), "r")
    file_content = file.read()
    return file_content
  finally:
    file.close()

def parse_month(number_month):
  months_map = {
    "01": "Gennaio",
    "02": "Febbraio",
    "03": "Marzo",
    "04": "Aprile",
    "05": "Maggio",
    "06": "Giugno",
    "07": "Luglio",
    "08": "Agosto",
    "09": "Settembre",
    "10": "Ottobre",
    "11": "Novembre",
    "12": "Dicembre",
  }
  if number_month in months_map:
    return months_map[number_month]

def parse_verbale_title(file_name):
  file_name_no_extension = os.path.splitext(file_name)[0]
  file_name_components = file_name_no_extension.split("_")
  year = file_name_components[0]
  month = parse_month(file_name_components[1])
  day = file_name_components[2]
  return day + " " + month + " " + year

def update_verbali(file_content):
  html_verbali = ""
  try:
    file = open(os.path.join(PATH_WEBSITE_DIRECTORY, "partials", "verbale.html"), "r")
    html_template_verbale = file.read()
    file_verbali_list = os.listdir(os.path.join("output_documenti", "interni", "verbali"))
    for file_verbale in file_verbali_list:
      html_verbali += html_template_verbale.replace(
        "<placeholder_link_verbale/>", "output_documenti/interni/verbali/" + file_verbale
      ).replace(
        "<placeholder_titolo_verbale/>", parse_verbale_title(file_verbale)
      ) + "\n"
    return file_content.replace("<placeholder_verbali/>", html_verbali)
  finally:
    file.close()

# --- Funzioni Primarie ---

def set_path_base_directory():
  file_path = os.path.realpath(__file__)
  file_path_list = file_path.split(os.sep)
  found_path = False
  while not found_path:
    if file_path_list[-1] == NAME_BASE_DIRECTORY:
      found_path = True
    else:
      file_path_list.pop()
  global PATH_BASE_DIRECTORY
  PATH_BASE_DIRECTORY = os.sep.join(file_path_list)
  os.chdir(PATH_BASE_DIRECTORY)

def clean_start():
  if os.path.exists("index.html"):
    os.remove("index.html")
  if os.path.exists("website"):
    shutil.rmtree("website")

def generate_website():
  html_template_website = get_website_html()
  html_updated_website = update_verbali(html_template_website)
  try:
    file = open("index.html", "w")
    file.write(html_updated_website)
    shutil.copytree(os.path.join(PATH_WEBSITE_DIRECTORY, "website"), "website")
  finally:
    file.close()

def clean_end():
  path_pycache = os.path.join("automazione", "script", "compile_latex_documents", "__pycache__")
  if os.path.exists(path_pycache):
    shutil.rmtree(path_pycache)

def ok_message():
  print("[" + os.path.basename(__file__) + "] OK")

# --- Main ---

def main():
  set_path_base_directory()
  clean_start()
  compile_latex_documents.main()
  generate_website()
  clean_end()
  ok_message()

if __name__ == '__main__':
  main()
