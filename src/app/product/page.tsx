import { env } from "@/env";
import { productSchema, productSearchParameterSchema } from "@/lib/schema";

type ProductPageProps = {
    searchParams: { [key: string]: string[] | string | undefined };
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
    const parsedSearchParams =
        productSearchParameterSchema.safeParse(searchParams);
    if (parsedSearchParams.success) {
    }

    const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL_DEV}/api/product`);
    if (!response.ok) return <div>No Products</div>;
    const products: unknown = await response.json();
    const validateProducts = productSchema.safeParse(products);
    if (!validateProducts.success) return <div>No Valid Products</div>;
    return <div>{JSON.stringify(validateProducts.data)}</div>;
}
