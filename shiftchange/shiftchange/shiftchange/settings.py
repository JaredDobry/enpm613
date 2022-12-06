from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

SQLALCHEMY_DATABASE_URI='postgresql+psycopg2://postgres:root@127.0.0.1:5432/testconnect2'

SQLALCHEMY_COMMIT_ON_TEARDOWN = False
SQLALCHEMY_TRACK_MODIFICATIONS = False