#!/bin/bash
# Start the Python backend server
cd src/python-backend
uvicorn app:app --reload --host 0.0.0.0 --port 8001
