#execute "bash install.sh" para instalar o necessário para rodar o site
python3 -m venv mkdocs-env
source mkdocs-env/bin/activate
pip install -r requirements.txt
