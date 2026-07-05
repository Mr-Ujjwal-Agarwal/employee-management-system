from sqlalchemy.orm import Session

from app import crud
from app import schemas


class DepartmentService:

    @staticmethod
    def create_department(
        db: Session,
        department: schemas.DepartmentCreate
    ):
        return crud.create_department(
            db,
            department
        )

    @staticmethod
    def get_departments(
        db: Session
    ):
        return crud.get_departments(db)

    @staticmethod
    def get_department(
        db: Session,
        department_id: int
    ):
        return crud.get_department(
            db,
            department_id
        )

    @staticmethod
    def update_department(
        db: Session,
        department_id: int,
        department: schemas.DepartmentCreate
    ):
        return crud.update_department(
            db,
            department_id,
            department
        )

    @staticmethod
    def delete_department(
        db: Session,
        department_id: int
    ):
        return crud.delete_department(
            db,
            department_id
        )