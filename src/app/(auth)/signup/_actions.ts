"use server";

import { signUpSchema } from "@/lib/schema";
import { CustomFormDataErrors, FormDataErrors, signUp } from "@/lib/types";
import { ZodIssue, typeToFlattenedError } from "zod";

export async function formAction(data: unknown) {
    const result = signUpSchema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    // if (result.error) {
    //     return { success: false, error: result.error.format() };
    // }

    // let zodErrors: Partial<FormDataErrors> = {};
    let zodErrors: Partial<CustomFormDataErrors> = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });
    }

    return Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true };
}
