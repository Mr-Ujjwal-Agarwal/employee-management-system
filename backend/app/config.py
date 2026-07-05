import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Application Configuration
APP_NAME = os.getenv("APP_NAME", "Employee Management System")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

# Database Configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "employee_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)