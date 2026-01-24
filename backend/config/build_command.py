# config/build_command.py
import os
import sys
import django
from django.core.management import call_command

# Add the project root (backend directory) to sys.path so 'config' can be found
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# Configura Django si executem el script directament
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

def apply_build():
    """
    Aplica migracions pendents i crea superusuari si cal.
    """

    print("🔹 Iniciant build de Django...")

    # 1️⃣ Genera migracions noves
    print("🔹 Generant migracions...")
    call_command('makemigrations', interactive=False)

    # 2️⃣ Aplica totes les migracions pendents
    print("🔹 Aplicant migracions...")
    call_command('migrate', interactive=False, run_syncdb=True)

    # 3️⃣ Crea superusuari si les variables d'entorn estan definides
    su_name = os.environ.get('SUPERUSER_NAME')
    su_email = os.environ.get('SUPERUSER_EMAIL')
    su_pass = os.environ.get('SUPERUSER_PASSWORD')

    if su_name and su_email and su_pass:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if not User.objects.filter(username=su_name).exists():
            User.objects.create_superuser(su_name, su_email, su_pass)
            print(f"✅ Superusuari {su_name} creat")
        else:
            print(f"⚠️ Superusuari {su_name} ja existia")
    else:
        print("⚠️ Variables de superusuari no definides, saltant creació...")

    print("🔹 Build complet!")

if __name__ == "__main__":
    try:
        apply_build()
    except Exception as e:
        print("❌ Error durant el build:", e)
        sys.exit(1)
