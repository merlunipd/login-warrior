"""
Script per compilare i documenti LaTex in PDF ed aggiornare il sito.

Dipendenze: python, latexmk.

Output:
- "index.html": pagina principale del sito;
- "website": directory contenente file utili al sito (e.g. css, immagini);
- "output_documenti": directory contenente i PDF compilati dai file latex tracciati.

Per funzionare correttamente lo script deve essere utilizzato nel seguente modo:
- Esecuzione: richiamare lo script dal terminale con il comando "python";
- Lo script deve essere contenuto in una directory del progetto;
- I file latex deveno essere compilabili in PDF;
- Lo script termina con un OK finale (come ultimo messaggio), se non è così
potrebbero esserci stati dei problemi durante l'esecuzione.

È possibile utilizzare la sezione "MOD" per modificare la configurazione, in particolare:
- "PATH_DOCUMENTI: lista documenti tracciati;
- "PATH_VERBALI: directory dei verbali (vengono automaticamente compilati 
tutti i verbali presenti nella cartella).

In caso di errore o interruzione dell'esecuzione, lo script potrebbe lasciare dei 
file temporanei relativi alla compilazione dei file latex.



Note:
- I percorsi sono composti utilizzando la funzione "os.path.join" per permettere 
l'esecuzione dello script su diversi sistemi operativi.
"""

import os
import shutil
from time import gmtime, strftime

# --- Configurazione ---

# MOD: Configurazione modificabile
PATH_DOCUMENTI = [
  os.path.join("src", "documenti", "candidatura", "capitolato", "capitolato.tex"),
  os.path.join("src", "documenti", "candidatura", "impegni", "impegni.tex"),
  os.path.join("src", "documenti", "esterni", "PdP", "PdP.tex"),
  os.path.join("src", "documenti", "esterni", "PdQ", "PdQ.tex"),
  os.path.join("src", "documenti", "esterni", "AdR", "AdR.tex"),
  os.path.join("src", "documenti", "interni", "NdP", "NdP.tex")
]
PATH_VERBALI = os.path.join("src", "documenti", "interni", "verbali")

# Configurazione di default
NAME_OUTPUT_DIRECTORY = "output_documenti"
NAME_BASE_DIRECTORY = "login-warrior"   # Nome directory radice del progetto
PATH_WEBSITE_DIRECTORY = os.path.join("automazione", "script", "update_documents")
PATH_BASE_DIRECTORY = ""  # Inizializzato in "set_path_base_directory"
PATH_OUTPUT = ""          # Inizializzato in "set_path_base_directory"
PATH_OUTPUT_TEMP = ""     # Inizializzato in "set_path_base_directory"

# --- Funzioni di Supporto ---

def get_output_file_path(path):
  list_path_elements = path.split(os.sep)
  if "candidatura" in list_path_elements:
    return os.path.join(PATH_OUTPUT_TEMP, "candidatura")
  if "esterni" in list_path_elements:
    return os.path.join(PATH_OUTPUT_TEMP, "esterni")
  if "interni" in list_path_elements:
    if "verbali" in list_path_elements:
      return os.path.join(PATH_OUTPUT_TEMP, "interni", "verbali")
    else:
      return os.path.join(PATH_OUTPUT_TEMP, "interni")

def compile_latex_and_move_pdf(name_file, path_directory):
  os.chdir(PATH_BASE_DIRECTORY)
  os.chdir(path_directory)
  os.system("latexmk -pdf " + name_file)
  os.system("latexmk -c ")
  output_file_name = os.path.splitext(name_file)[0] + ".pdf"
  output_file_path = get_output_file_path(path_directory)
  shutil.move(output_file_name, os.path.join(output_file_path, output_file_name))
  os.chdir(PATH_BASE_DIRECTORY)

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

def update_last_update_date(html_website):
  time_string = strftime("%Y/%m/%d %H:%M", gmtime())
  return html_website.replace("<placeholder_last_update/>", time_string)

# --- Funzioni Primarie ---

def set_path_base_directory():
  """
  Termina la configurazione di: 
  - PATH_BASE_DIRECTORY: percorso della directory principale, specificata in NAME_BASE_DIRECTORY; 
  - PATH_OUTPUT: percorso della directory di output dei PDF;
  - PATH_OUTPUT_TEMP: percorso della directory di output dei PDF temporanea.
  Inoltre imposta la directory corrente a PATH_BASE_DIRECTORY, per permettere consistenza
  con i comandi invocati successivamente.
  """
  file_path = os.path.realpath(__file__)
  file_path_list = file_path.split(os.sep)
  found_path = False
  while not found_path:
    if file_path_list[-1] == NAME_BASE_DIRECTORY:
      found_path = True
    else:
      file_path_list.pop()
  global PATH_BASE_DIRECTORY, PATH_OUTPUT, PATH_OUTPUT_TEMP
  PATH_BASE_DIRECTORY = os.sep.join(file_path_list)
  PATH_OUTPUT = os.path.join(PATH_BASE_DIRECTORY, NAME_OUTPUT_DIRECTORY)
  PATH_OUTPUT_TEMP = os.path.join(PATH_BASE_DIRECTORY, "temp_" + NAME_OUTPUT_DIRECTORY)
  os.chdir(PATH_BASE_DIRECTORY)

def clean_start():
  """
  Rimuove, se esistenti, i file relativi al sito: 'index.html', 'website/'
  """
  if os.path.exists("index.html"):
    os.remove("index.html")
  if os.path.exists("website"):
    shutil.rmtree("website")

def create_new_output_directory():
  """
  Crea una directory temporane in cui mettere i PDF generati.
  """
  if not os.path.exists(PATH_OUTPUT_TEMP):
    os.mkdir(PATH_OUTPUT_TEMP)
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "candidatura"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "esterni"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "interni"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "interni", "verbali"))

def latex_to_pdf():
  """
  Compila i documenti latex e li sposta nella directory di output.
  """
  for path_file in PATH_DOCUMENTI:
    if os.path.exists(path_file):
      path_directory, name_file = os.path.split(path_file)
      compile_latex_and_move_pdf(name_file, path_directory)
  if os.path.exists(PATH_VERBALI):
    list_directory_verbale = os.listdir(PATH_VERBALI)
    list_directory_verbale.remove("shared")
    for directory_verbale in list_directory_verbale:
      path_directory = os.path.join(PATH_VERBALI, directory_verbale)
      name_file = directory_verbale + ".tex"
      compile_latex_and_move_pdf(name_file, path_directory)

def replace_old_output_directory():
  """
  Sostituisce la directory con i file PDF generati recentemente con quella già esistente, 
  se presente.
  """
  if os.path.exists(PATH_OUTPUT):
    shutil.rmtree(PATH_OUTPUT)
  os.rename(PATH_OUTPUT_TEMP, PATH_OUTPUT)

def generate_website():
  """
  Genera il sito, aggiornando la sezione verbali e aggiornando la data di "last update".
  """
  html_template_website = get_website_html()
  html_updated_website = update_verbali(html_template_website)
  html_updated_website = update_last_update_date(html_updated_website)
  try:
    file = open("index.html", "w")
    file.write(html_updated_website)
    shutil.copytree(os.path.join(PATH_WEBSITE_DIRECTORY, "website"), "website")
  finally:
    file.close()

def ok_message():
  """
  Stampa un messaggio per segnalare la corretta terminazione dello script.
  """
  print("\n[" + os.path.basename(__file__) + "] OK\n")

# --- Main ---

def main():
  set_path_base_directory()
  clean_start()

  create_new_output_directory()
  latex_to_pdf()
  replace_old_output_directory()
  generate_website()

  ok_message()

if __name__ == '__main__':
  main()