import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FolderPlus } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { TableSkeleton } from "../components/common/Loader";

import DepartmentTable from "../components/department/DepartmentTable";
import DepartmentForm from "../components/department/DepartmentForm";
import DepartmentDetails from "../components/department/DepartmentDetails";

import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../services/departmentService";

function Departments() {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            setLoading(true);
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDepartment = async (department) => {
        try {
            await createDepartment(department);
            toast.success("Department Created");
            setOpenModal(false);
            loadDepartments();
        } catch (error) {
            console.error(error);
            toast.error("Creation Failed");
        }
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleUpdateDepartment = async (department) => {
        try {
            await updateDepartment(selectedDepartment.id, department);
            toast.success("Department Updated");
            setOpenModal(false);
            setSelectedDepartment(null);
            setIsEditMode(false);
            loadDepartments();
        } catch (error) {
            console.error(error);
            toast.error("Update Failed");
        }
    };

    const handleView = (department) => {
        setSelectedDepartment(department);
        setViewModal(true);
    };

    const handleDelete = (department) => {
        setDepartmentToDelete(department);
        setDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteDepartment(departmentToDelete.id);
            toast.success("Department Deleted");
            setDeleteModal(false);
            setDepartmentToDelete(null);
            loadDepartments();
        } catch (error) {
            console.error(error);
            toast.error("Delete Failed");
        }
    };

    const filteredDepartments = departments.filter((department) =>
        department.department_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h1 className="text-3xl font-bold font-display text-ink">Departments</h1>
                    <p className="text-ink-muted mt-1.5 text-sm">
                        {loading ? "Loading departments..." : `${filteredDepartments.length} of ${departments.length} departments`}
                    </p>
                </div>

                <Button
                    icon={FolderPlus}
                    onClick={() => {
                        setSelectedDepartment(null);
                        setIsEditMode(false);
                        setOpenModal(true);
                    }}
                >
                    Add Department
                </Button>
            </div>

            <div className="mb-6">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search departments..."
                />
            </div>

            {loading ? (
                <div className="bg-surface border border-line rounded-2xl overflow-hidden">
                    <TableSkeleton cols={4} />
                </div>
            ) : (
                <DepartmentTable
                    departments={filteredDepartments}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                title={isEditMode ? "Edit Department" : "Add Department"}
                description={isEditMode ? "Update this department's details." : "Create a new department."}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <DepartmentForm
                    defaultValues={selectedDepartment || {}}
                    onSubmit={isEditMode ? handleUpdateDepartment : handleCreateDepartment}
                />
            </Modal>

            <Modal
                title="Department Details"
                isOpen={viewModal}
                onClose={() => setViewModal(false)}
            >
                <DepartmentDetails department={selectedDepartment} />
            </Modal>

            <ConfirmDialog
                isOpen={deleteModal}
                title="Delete Department"
                message={`Delete ${departmentToDelete?.department_name}? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setDeleteModal(false);
                    setDepartmentToDelete(null);
                }}
            />
        </MainLayout>
    );
}

export default Departments;
