from sqlalchemy.orm import Session

from app import crud
from app import schemas


class EmployeeService:

    @staticmethod
    def create_employee(
        db: Session,
        employee: schemas.EmployeeCreate
    ):
        return crud.create_employee(db, employee)

    @staticmethod
    def get_all_employees(
        db: Session
    ):
        return crud.get_employees(db)

    @staticmethod
    def get_employee(
        db: Session,
        employee_id: int
    ):
        return crud.get_employee(db, employee_id)

    @staticmethod
    def update_employee(
        db: Session,
        employee_id: int,
        employee: schemas.EmployeeUpdate
    ):
        return crud.update_employee(
            db,
            employee_id,
            employee
        )

    @staticmethod
    def delete_employee(
        db: Session,
        employee_id: int
    ):
        return crud.delete_employee(
            db,
            employee_id
        )