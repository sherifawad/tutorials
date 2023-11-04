"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { schema, submitFormAction } from "./actions";
import { ZodError } from "zod";

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button className="w-full" type="submit">
            {pending ? "submitting........" : "Submit"}
        </button>
    );
};

function MyForm() {
    // const onSubmitHandler = (formData: FormData) => {
    //     try {
    //         const name = formData.get("name") as string | null;
    //         const age = formData.get("age")?.toString() as string | null;
    //         schema.parse({
    //             name,
    //             age: parseInt(age ?? ""),
    //         });
    //         submitFormAction;
    //     } catch (error) {
    //         const zodError = error as ZodError;
    //         const errorMap = JSON.stringify(zodError.flatten().fieldErrors);
    //         return {
    //             message: "error",
    //             errors: {
    //                 name: errorMap["name"]?.[0] ?? "",
    //                 age: errorMap["age"]?.[0] ?? "",
    //             },
    //             fieldValue: {
    //                 name,
    //                 age,
    //             },
    //         };
    //     }
    // };

    const [formState, formAction] = useFormState(submitFormAction, {
        message: "",
        errors: undefined,
        fieldValue: {
            age: "",
            name: "",
        },
    });

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formState.message === "success") {
            formRef.current?.reset();
        }
    }, [formState]);

    return (
        <div className="container mx-auto">
            <form
                ref={formRef}
                className="flex flex-col mx-auto max-w-xs"
                action={formAction}
            >
                <div className="mx-auto max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Registration</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Please enter your name and age to register
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="your name"
                            defaultValue={formState.fieldValue.name}
                            className={clsx({
                                "border-red-400": formState.errors?.name,
                            })}
                        />
                        <span className="text-left text-sm text-red-400">
                            {formState.errors?.name}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="name">Age</label>
                        <input
                            type="text"
                            name="age"
                            id="age"
                            placeholder="0"
                            defaultValue={formState.fieldValue.age}
                            className={clsx({
                                "border-red-400": formState.errors?.age,
                            })}
                        />
                        <span className="text-left text-sm text-red-400">
                            {formState.errors?.age}
                        </span>
                    </div>
                </div>
                <SubmitButton />
            </form>
        </div>
    );
}

export default MyForm;
