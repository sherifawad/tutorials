import z from "zod";

export const productSchema = z.object({
    name: z.string(),
    price: z.coerce.number().positive(),
});

export const signUpSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    // address: z
    //     .string()
    //     .min(2, {
    //         message: "address must be at least 2 characters.",
    //     })
    //     .max(30, {
    //         message: "address must not be longer than 30 characters.",
    //     }),
    // email: z.string().email().max(30, {
    //     message: "email must not be longer than 30 characters.",
    // }),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),

    language: z.string({
        required_error: "Please select a language.",
    }),
    // city: z.string().optional(),
    // state: z.string().optional(),
    // zipCode: z.coerce.number().positive().optional(),
    // password: z.string({
    //     required_error: "A password is required.",
    // }),
    // confirmPassword: z.string({
    //     required_error: "A password is required.",
    // }),
});
// .refine((data) => data.password === data.confirmPassword, {
//     message: "password not match",
//     path: ["confirmPassword"],
// });
