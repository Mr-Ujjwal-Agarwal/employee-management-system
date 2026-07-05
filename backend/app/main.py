from fastapi import FastAPI

from app.config import APP_NAME, APP_VERSION
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
import app.models

from app.routers import (
    employee,
    department,
    health,
    dashboard
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="Employee Management System API"
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(department.router)
app.include_router(employee.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {
        "success": True,
        "message": f"{APP_NAME} API is running 🚀"
    }