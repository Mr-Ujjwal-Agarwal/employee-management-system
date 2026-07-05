import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

import { getDepartments } from "../../services/departmentService";

function EmployeeForm({ onSubmit, defaultValues = {}, isEdit = false }) {

    const { register, handleSubmit, reset } = useForm({ defaultValues });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitForm = (data) => {
        onSubmit({
            ...data,
            salary: Number(data.salary),
            department_id: Number(data.department_id)
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
                label="Employee Code"
                placeholder="EMP004"
                {...register("employee_code", { required: true })}
            />

            <Input
                label="First Name"
                placeholder="Jane"
                {...register("first_name", { required: true })}
            />

            <Input
                label="Last Name"
                placeholder="Doe"
                {...register("last_name", { required: true })}
            />

            <Input
                label="Email"
                type="email"
                placeholder="jane.doe@company.com"
                {...register("email", { required: true })}
            />

            <Input
                label="Phone"
                placeholder="+91 98765 43210"
                {...register("phone", { required: true })}
            />

            <Input
                label="Designation"
                placeholder="Software Engineer"
                {...register("designation", { required: true })}
            />

            <Input
                label="Salary"
                type="number"
                placeholder="50000"
                {...register("salary", { required: true })}
            />

            <Input
                label="Joining Date"
                type="date"
                {...register("joining_date", { required: true })}
            />

            <Select
                label="Department"
                {...register("department_id", { required: true })}
            >
                <option value="">Select Department</option>
                {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                        {department.department_name}
                    </option>
                ))}
            </Select>

            <Select
                label="Status"
                {...register("status")}
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </Select>

            <div className="col-span-1 md:col-span-2 pt-2">
                <Button type="submit" className="w-full" size="lg">
                    {isEdit ? "Update Employee" : "Save Employee"}
                </Button>
            </div>
        </form>
    );
}

export default EmployeeForm;
