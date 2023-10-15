"use client";

import { WishSchema, productSearchParameterSchema } from "@/lib/schema";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function WishList() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        // Perform localStorage action
        setIsMounted(true);
    }, []);

    const searchParams = useSearchParams();
    const searchParamsObject = Object.fromEntries(searchParams);
    const validateSearchParams =
        productSearchParameterSchema.safeParse(searchParamsObject);
    if (validateSearchParams.success) {
        if (isMounted) {
            const wishes: unknown = JSON.parse(
                localStorage.getItem("wishes") || "[]"
            );
            const validateWishes = WishSchema.safeParse(wishes);
            if (!validateWishes.success) {
                localStorage.removeItem("wishes");
            }
        }
    }
    return <div>WishList</div>;
}

export default WishList;
