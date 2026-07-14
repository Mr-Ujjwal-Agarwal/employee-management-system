from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict


# =====================================
# Department Schemas
# =====================================

class DepartmentBase(BaseModel):
    department_name: str
    description: Optional[str] = None


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentResponse(DepartmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =====================================
# Employee Schemas
# =====================================

class EmployeeBase(BaseModel):
    employee_code: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    designation: str
    salary: float
    joining_date: date
    status: str = "Active"
    department_id: int


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    designation: Optional[str] = None
    salary: Optional[float] = None
    joining_date: Optional[date] = None
    status: Optional[str] = None
    department_id: Optional[int] = None


class EmployeeResponse(EmployeeBase):

    id: int

    department: DepartmentResponse

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)