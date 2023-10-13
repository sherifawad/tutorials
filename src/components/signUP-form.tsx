"use client";

import { signUpSchema } from "@/lib/schema";
import { signUp } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
    CalendarIcon,
    CheckIcon,
    LucideSortAsc,
    ShoppingCartIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./ui/command";
import { formAction } from "@/app/(auth)/signup/_actions";

const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
] as const;

// This can come from your database or API.
const defaultValues: Partial<signUp> = {
    // name: "Your name",
    // dob: new Date("2023-01-23"),
};
const SignUPForm = () => {
    const form = useForm<signUp>({
        resolver: zodResolver(signUpSchema),
        defaultValues,
    });

    async function onSubmit(data: unknown) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });

        // const response = await fetch("/api/signup", {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // const responseData = await response.json();
        // if (!response.ok) {
        //     // response status is not 2xx
        //     alert("Submitting form failed!");
        //     return;
        // }

        const responseData = await formAction(data);

        if (responseData.errors) {
            const errors = responseData.errors;

            if (errors.name) {
                form.setError("name", {
                    type: "server",
                    message: errors.name,
                });
            } else {
                alert("Something went wrong!");
            }
        }

        // if (responseData.errors) {
        //     const errors = responseData.errors.fieldErrors;

        //     if (errors?.email) {
        //         form.setError("email", {
        //             type: "server",
        //             message: errors.email[0].message,
        //         });
        //     } else if (errors?.password) {
        //         form.setError("password", {
        //             type: "server",
        //             message: errors.password[0].message,
        //         });
        //     } else if (errors?.confirmPassword) {
        //         form.setError("confirmPassword", {
        //             type: "server",
        //             message: errors.confirmPassword[0].message,
        //         });
        //     } else {
        //         alert("Something went wrong!");
        //     }
        // }

        // reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed on your
                                profile and in emails.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Language</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                      (language) =>
                                                          language.value ===
                                                          field.value
                                                  )?.label
                                                : "Select language"}
                                            <LucideSortAsc className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandEmpty>
                                            No language found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {languages.map((language) => (
                                                <CommandItem
                                                    value={language.label}
                                                    key={language.value}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "language",
                                                            language.value
                                                        );
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            language.value ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {language.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the language that will be used in the
                                dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update account</Button>
            </form>
        </Form>
    );
};

export default SignUPForm;
