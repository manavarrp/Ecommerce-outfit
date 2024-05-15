import { notFound } from "next/navigation";
import { initialData } from "../../../../seed/seed";
import { Title } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { Category } from "@/interfaces/product.interface";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

const CategoryPage = ({ params }: Props) => {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string>= {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para todos'
  }

  /*  if(id === 'kids'){
    notFound()
  } */
  return (
    <>
      <Title title={`Articulos ${(labels)[id]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
};

export default CategoryPage;
