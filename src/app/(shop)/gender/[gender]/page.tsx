export const revalidate = 60;

import { notFound, redirect } from "next/navigation";
import { Title } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Gender } from "@prisma/client";
import Pagination from "@/components/ui/pagination/Pagination";


interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const GenderPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  /*  if(id === 'kids'){
    notFound()
  } */
  return (
    <>
      <Title
        title={`Articulos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default GenderPage;
