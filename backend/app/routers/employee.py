from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.dependencies import get_database
from app.services.employee_service import EmployeeService

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post("/", response_model=schemas.EmployeeResponse)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_database)
):
    return EmployeeService.create_employee(db, employee)


@router.get("/", response_model=list[schemas.EmployeeResponse])
def get_employees(
    db: Session = Depends(get_database)
):
    return EmployeeService.get_all_employees(db)


@router.get("/{employee_id}", response_model=schemas.EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_database)
):
    employee = EmployeeService.get_employee(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.put("/{employee_id}", response_model=schemas.EmployeeResponse)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_database)
):
    updated_employee = EmployeeService.update_employee(
        db,
        employee_id,
        employee
    )

    if not updated_employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return updated_employee


@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_database)
):
    employee = EmployeeService.delete_employee(
        db,
        employee_id
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "success": True,
        "message": "Employee deleted successfully"
    }