from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


# ===========================
# Department Model
# ===========================

class Department(Base):

    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    department_name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(String(255))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    employees = relationship(
        "Employee",
        back_populates="department"
    )


# ===========================
# Employee Model
# ===========================

class Employee(Base):

    __tablename__ = "employees"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_code = Column(
        String(20),
        unique=True,
        nullable=False
    )

    first_name = Column(
        String(100),
        nullable=False
    )

    last_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    phone = Column(
        String(20),
        nullable=False
    )

    designation = Column(
        String(100),
        nullable=False
    )

    salary = Column(
        Float,
        nullable=False
    )

    joining_date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String(20),
        default="Active"
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    department = relationship(
        "Department",
        back_populates="employees",
        lazy="joined"
    )