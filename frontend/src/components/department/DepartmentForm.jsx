import { useForm } from "react-hook-form";

import Input from "../common/Input";
import Button from "../common/Button";

function DepartmentForm({ onSubmit, defaultValues = {} }) {

    const { register, handleSubmit, reset } = useForm({ defaultValues });

    const submit = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-5">
            <Input
                label="Department Name"
                placeholder="Engineering"
                {...register("department_name", { required: true })}
            />

            <Input
                label="Description"
                placeholder="What this department is responsible for"
                {...register("description")}
            />

            <Button type="submit" className="w-full" size="lg">
                Save Department
            </Button>
        </form>
    );
}

export default DepartmentForm;
