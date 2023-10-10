import { env } from "@/env";
import { productSchema } from "@/lib/schema";

export default async function ProductPage() {
    const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL_DEV}/api/product`);
    if (!response.ok) return <div>No Products</div>;
    const products: unknown = await response.json();
    const validateProducts = productSchema.safeParse(products);
    if (!validateProducts.success) return <div>No Valid Products</div>;
    return <div>{JSON.stringify(validateProducts.data)}</div>;
}
