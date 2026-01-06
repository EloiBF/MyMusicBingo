import subprocess
import os
import sys
import time
import signal
import argparse

def run_local():
    """Run application locally (development mode)"""
    # Use the local virtual environment for python
    venv_python = os.path.join(os.getcwd(), ".venv", "Scripts", "python.exe")
    if not os.path.exists(venv_python):
        venv_python = "python"
        print("Warning: .venv not found, using system python.")

    print("🚀 Starting BingoMusicMaker locally...")
    
    # 1. Start Django Backend
    print("📦 Starting Backend (Django) on http://127.0.0.1:8000 ...")
    backend_proc = subprocess.Popen(
        [venv_python, "backend/manage.py", "runserver"],
        cwd=os.getcwd()
    )

    # 2. Start Vite Frontend
    print("🎨 Starting Frontend (Vite) on http://localhost:5173 ...")
    frontend_dir = os.path.join(os.getcwd(), "frontend")
    frontend_proc = subprocess.Popen(
        "npm run dev",
        cwd=frontend_dir,
        shell=True
    )

    print("\n✅ Both servers are starting up.")
    print("Press Ctrl+C to stop both servers.\n")

    try:
        while True:
            time.sleep(1)
            if backend_proc.poll() is not None:
                print("❌ Backend process terminated.")
                break
            if frontend_proc.poll() is not None:
                print("❌ Frontend process terminated.")
                break
                
    except KeyboardInterrupt:
        print("\n🛑 Stopping servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Bye!")

def run_app():
    parser = argparse.ArgumentParser(description='Run BingoMusicMaker in development mode')
    parser.add_argument('--local', '-l', action='store_true',
                       help='Run locally (development mode)')
    
    args = parser.parse_args()
    run_local()

if __name__ == "__main__":
    run_app()
