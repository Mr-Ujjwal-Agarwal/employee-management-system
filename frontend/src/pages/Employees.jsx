import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserPlus } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { TableSkeleton } from "../components/common/Loader";

import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeDetails from "../components/employee/EmployeeDetails";
import {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee
} from "../services/employeeService";

import ConfirmDialog from "../components/common/ConfirmDialog";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [viewEmployee, setViewEmployee] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            employee.employee_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleCreateEmployee = async (employee) => {
        try {
            await createEmployee(employee);
            toast.success("Employee Added Successfully");
            setOpenModal(false);
            loadEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Failed to Add Employee");
        }
    };

    const handleDelete = (employee) => {
        setEmployeeToDelete(employee);
        setDeleteModal(true);
    };

    const handleView = (employee) => {
        setViewEmployee(employee);
        setViewModal(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteEmployee(employeeToDelete.id);
            toast.success("Employee Deleted Successfully");
            setDeleteModal(false);
            setEmployeeToDelete(null);
            loadEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Failed to Delete Employee");
        }
    };

    const handleUpdateEmployee = async (employee) => {
        try {
            await updateEmployee(selectedEmployee.id, employee);
            toast.success("Employee Updated");
            setOpenModal(false);
            setSelectedEmployee(null);
            setIsEditMode(false);
            loadEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Update Failed");
        }
    };

    return (
        <MainLayout>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#171d33",
                        color: "#f2f4fa",
                        border: "1px solid #232b45"
                    }
                }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-display text-ink">Employees</h1>
                    <p className="text-ink-muted mt-1.5 text-sm">
                        {loading ? "Loading roster..." : `${filteredEmployees.length} of ${employees.length} employees`}
                    </p>
                </div>

                <Button
                    icon={UserPlus}
                    onClick={() => {
                        setSelectedEmployee(null);
                        setIsEditMode(false);
                        setOpenModal(true);
                    }}
                >
                    Add Employee
                </Button>
            </div>

            <div className="mb-6">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, code, or email..."
                />
            </div>

            {loading ? (
                <div className="bg-surface border border-line rounded-2xl overflow-hidden">
                    <TableSkeleton />
                </div>
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                title={isEditMode ? "Edit Employee" : "Add Employee"}
                description={isEditMode ? "Update this employee's details." : "Add a new employee to the roster."}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                size="lg"
            >
                <EmployeeForm
                    defaultValues={selectedEmployee || {}}
                    isEdit={isEditMode}
                    onSubmit={isEditMode ? handleUpdateEmployee : handleCreateEmployee}
                />
            </Modal>

            <Modal
                title="Employee Details"
                isOpen={viewModal}
                onClose={() => setViewModal(false)}
            >
                <EmployeeDetails employee={viewEmployee} />
            </Modal>

            <ConfirmDialog
                isOpen={deleteModal}
                title="Delete Employee"
                message={`Are you sure you want to delete ${employeeToDelete?.first_name || ""}? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setDeleteModal(false);
                    setEmployeeToDelete(null);
                }}
            />
        </MainLayout>
    );
}

export default Employees;
