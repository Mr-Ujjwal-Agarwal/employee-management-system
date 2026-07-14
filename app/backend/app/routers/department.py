from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.dependencies import get_database
from app.services.department_service import DepartmentService

router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


@router.post("/", response_model=schemas.DepartmentResponse)
def create_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_database)
):
    return DepartmentService.create_department(
        db,
        department
    )


@router.get("/", response_model=list[schemas.DepartmentResponse])
def get_departments(
    db: Session = Depends(get_database)
):
    return DepartmentService.get_departments(db)


@router.get("/{department_id}", response_model=schemas.DepartmentResponse)
def get_department(
    department_id: int,
    db: Session = Depends(get_database)
):

    department = DepartmentService.get_department(
        db,
        department_id
    )

    if not department:

        raise HTTPException(
            status_code=404,
            detail="Department not found"
        )

    return department


@router.put("/{department_id}", response_model=schemas.DepartmentResponse)
def update_department(
    department_id: int,
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_database)
):

    updated_department = DepartmentService.update_department(
        db,
        department_id,
        department
    )

    if not updated_department:

        raise HTTPException(
            status_code=404,
            detail="Department not found"
        )

    return updated_department


@router.delete("/{department_id}")
def delete_department(
    department_id: int,
    db: Session = Depends(get_database)
):

    deleted_department = DepartmentService.delete_department(
        db,
        department_id
    )

    if not deleted_department:

        raise HTTPException(
            status_code=404,
            detail="Department not found"
        )

    return {
        "success": True,
        "message": "Department deleted successfully"
    }