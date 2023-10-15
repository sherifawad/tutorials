import z from "zod";
import { productSchema, signUpSchema } from "../schema";

export type Product = z.infer<typeof productSchema>;
export type signUp = z.infer<typeof signUpSchema>;
export type FormDataErrors = z.inferFlattenedErrors<
    typeof signUpSchema,
    { message: string; errorCode: string }
>;
export type CustomFormDataErrors = {
    [key in keyof signUp]: string;
};

// combine types into better format
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type c = Prettify<
    Product & {
        addresses: string[];
    }
>;
