""" Script per compilare i documenti LaTex in PDF

Dipendenze: python, latexmk

Per funzionare correttamente lo script deve essere utilizzato nel seguente modo:
- Esecuzione: richiamare lo script dal terminale con il comando "python";
- Lo script deve essere contenuto in una directory del progetto;
- Lo script termina con un OK finale (come ultimo messaggio), se non è così
potrebbero esserci stati dei problemi durante l'esecuzione.

È possibile utilizzare la sezione "MOD" per modificare la configurazione, in particolare:
- "PATH_DOCUMENTI: lista documenti tracciati;
- "PATH_VERBALI: directory dei verbali (vengono automaticamente compilati 
tutti i verbali presenti nella cartella);
- "NAME_OUTPUT_DIRECTORY": nome della directory di output, creata nella directory radice 
del progetto.

I percorsi sono composti utilizzando la funzione "os.path.join" per permettere 
l'esecuzione dello script su diversi sistemi operativi.

"""

import os
import shutil

# --- Configurazione ---

# MOD: Configurazione modificabile
PATH_DOCUMENTI = [
  os.path.join("src", "documenti", "candidatura", "capitolato", "capitolato.tex"),
  os.path.join("src", "documenti", "candidatura", "impegni", "impegni.tex"),
  os.path.join("src", "documenti", "esterni", "PdP", "PdP.tex"),
  os.path.join("src", "documenti", "esterni", "PdQ", "PdQ.tex"),
  os.path.join("src", "documenti", "interni", "NdP", "NdP.tex")
]
PATH_VERBALI = os.path.join("src", "documenti", "interni", "verbali")
NAME_OUTPUT_DIRECTORY = "output_documenti"

# Configurazione di default
NAME_BASE_DIRECTORY = "login-warrior"   # Nome directory radice del progetto
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
  global PATH_BASE_DIRECTORY, PATH_OUTPUT, PATH_OUTPUT_TEMP
  PATH_BASE_DIRECTORY = os.sep.join(file_path_list)
  PATH_OUTPUT = os.path.join(PATH_BASE_DIRECTORY, NAME_OUTPUT_DIRECTORY)
  PATH_OUTPUT_TEMP = os.path.join(PATH_BASE_DIRECTORY, "temp_" + NAME_OUTPUT_DIRECTORY)
  os.chdir(PATH_BASE_DIRECTORY)

def create_new_output_directory():
  if not os.path.exists(PATH_OUTPUT_TEMP):
    os.mkdir(PATH_OUTPUT_TEMP)
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "candidatura"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "esterni"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "interni"))
    os.mkdir(os.path.join(PATH_OUTPUT_TEMP, "interni", "verbali"))

def replace_old_output_directory():
  if os.path.exists(PATH_OUTPUT):
    shutil.rmtree(PATH_OUTPUT)
  os.rename(PATH_OUTPUT_TEMP, PATH_OUTPUT)

def latex_to_pdf():
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

def ok_message():
  print("[" + os.path.basename(__file__) + "] OK")

# --- Main ---

def main():
  set_path_base_directory()
  create_new_output_directory()
  latex_to_pdf()
  replace_old_output_directory()
  ok_message()

if __name__ == '__main__':
  main()
