import { ZodError, z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect";

const schema = z.object({
    name: z.string().trim().min(1, { message: "name is required" }),
    age: z.number().min(0).max(100),
});

type Errors = {
    name: string[];
    age: string[];
};

async function submitFromAction(formData: FormData) {
    "use server";
    try {
        schema.parse({
            name: formData.get("name"),
            age: parseInt(formData.get("age")?.toString() ?? ""),
        });
        cookies().set("formKey", Math.random() + "");
        redirect("/formPage");
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        const zodError = error as ZodError;
        const errorMap = JSON.stringify(zodError.flatten().fieldErrors);
        redirect(`/formPage?errors=${encodeURI(errorMap)}`);
    }
}

export default function page({
    searchParams,
}: {
    searchParams: {
        errors: string;
    };
}) {
    function getFromKey() {
        return cookies().get("formKey")?.value;
    }
    function getFieldError(field: keyof Errors) {
        if (!searchParams.errors) return undefined;
        const errorMap = JSON.parse(searchParams.errors) as Record<
            keyof Errors,
            string[]
        >;

        const error = errorMap[field];
        if (!error) return undefined;
        return error[0];
    }
    return (
        <main className="text-black text-center">
            <h1 className="text-5xl font-bold mb-4 mt-12">Submit Something</h1>
            <form
                key={getFromKey()}
                className="flex flex-col mx-auto max-w-sm"
                action={submitFromAction}
            >
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    className={clsx("input w-full max-w-sm bg-slate-400", {
                        "input-error": getFieldError("name"),
                    })}
                    name="name"
                />
                <p className="h-4">{getFieldError("name")}</p>
                <label className="label">
                    <span className="label-text">Age</span>
                </label>
                <input
                    className={clsx("input w-full max-w-sm bg-slate-400", {
                        "input-error": getFieldError("age"),
                    })}
                    name="age"
                />
                <p className="h-4">{getFieldError("age")}</p>

                <button className="brn mt-4 bg-black text-white">submit</button>
            </form>
        </main>
    );
}
