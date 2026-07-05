from sqlalchemy.orm import Session, joinedload

from app import models, schemas


# ==============================
# Department CRUD
# ==============================

def create_department(
    db: Session,
    department: schemas.DepartmentCreate
):
    db_department = models.Department(**department.model_dump())

    db.add(db_department)
    db.commit()
    db.refresh(db_department)

    return db_department


def get_departments(db: Session):
    return db.query(models.Department).all()


def get_department(
    db: Session,
    department_id: int
):
    return (
        db.query(models.Department)
        .filter(models.Department.id == department_id)
        .first()
    )

# ==============================
# Department Update
# ==============================

def update_department(
    db: Session,
    department_id: int,
    department: schemas.DepartmentCreate
):

    db_department = get_department(
        db,
        department_id
    )

    if not db_department:
        return None

    update_data = department.model_dump()

    for key, value in update_data.items():

        setattr(
            db_department,
            key,
            value
        )

    db.commit()
    db.refresh(db_department)

    return db_department


# ==============================
# Department Delete
# ==============================

def delete_department(
    db: Session,
    department_id: int
):

    db_department = get_department(
        db,
        department_id
    )

    if not db_department:
        return None

    db.delete(db_department)

    db.commit()

    return db_department

# ==============================
# Employee CRUD
# ==============================

def create_employee(
    db: Session,
    employee: schemas.EmployeeCreate
):
    db_employee = models.Employee(**employee.model_dump())

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee


def get_employees(db: Session):

    return (

        db.query(models.Employee)

        .options(
            joinedload(models.Employee.department)
        )

        .all()

    )


def get_employee(
    db: Session,
    employee_id: int
):

    return (

        db.query(models.Employee)

        .options(
            joinedload(models.Employee.department)
        )

        .filter(
            models.Employee.id == employee_id
        )

        .first()

    )


def update_employee(
    db: Session,
    employee_id: int,
    employee: schemas.EmployeeUpdate
):

    db_employee = get_employee(
        db,
        employee_id
    )

    if not db_employee:
        return None

    update_data = employee.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            db_employee,
            key,
            value
        )

    db.commit()
    db.refresh(db_employee)

    return db_employee


def delete_employee(
    db: Session,
    employee_id: int
):

    db_employee = get_employee(
        db,
        employee_id
    )

    if not db_employee:
        return None

    db.delete(db_employee)

    db.commit()

    return db_employee