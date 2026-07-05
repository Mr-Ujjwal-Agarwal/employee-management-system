from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_database
from app import models

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_database)
):

    total_employees = db.query(models.Employee).count()

    active_employees = (
        db.query(models.Employee)
        .filter(models.Employee.status == "Active")
        .count()
    )

    inactive_employees = (
        db.query(models.Employee)
        .filter(models.Employee.status == "Inactive")
        .count()
    )

    total_departments = db.query(models.Department).count()

    return {
        "totalEmployees": total_employees,
        "activeEmployees": active_employees,
        "inactiveEmployees": inactive_employees,
        "totalDepartments": total_departments
    }