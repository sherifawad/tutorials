import { ZodError, z } from "zod";

type Fields = {
    name: string;
    age: string;
};

export const schema = z.object({
    name: z.string().trim().min(1, { message: "name is required" }),
    age: z.number().min(0).max(100),
});

export type FormState = {
    message: string;
    errors: Record<keyof Fields, string> | undefined;
    fieldValue: Fields;
};

export async function submitFormAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    "use server";
    const name = formData.get("name") as string;
    const age = formData.get("age")?.toString() as string;
    try {
        schema.parse({
            name,
            age: parseInt(age ?? ""),
        });

        return {
            message: "success",
            errors: undefined,
            fieldValue: {
                name: "",
                age: "",
            },
        };
    } catch (error) {
        const zodError = error as ZodError;
        const errorMap = zodError.flatten().fieldErrors;
        return {
            message: "error",
            errors: {
                name: errorMap["name"]?.[0] ?? "",
                age: errorMap["age"]?.[0] ?? "",
            },
            fieldValue: {
                name,
                age,
            },
        };
    }
}
