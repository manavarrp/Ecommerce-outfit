export const revalidate = 604800; // 7 days

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductSlideShow from "@/components/product/slide-show/ProductSlideShow";
import ProductSlideShowMobile from "@/components/product/slide-show/ProductSlideShowMobile";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/font";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import AddtoCart from "./ui/AddtoCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

const ProductSlugPage = async ({ params: { slug } }: Props) => {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1  md:grid-cols-3 gap-3">
      {/* Slideshow*/}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShowMobile
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        <AddtoCart  product={product}/>
        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description} </p>
      </div>
    </div>
  );
};

export default ProductSlugPage;
