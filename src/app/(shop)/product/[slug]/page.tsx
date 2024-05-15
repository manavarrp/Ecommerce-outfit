import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductSlideShow from "@/components/product/slide-show/ProductSlideShow";
import ProductSlideShowMobile from "@/components/product/slide-show/ProductSlideShowMobile";
import { titleFont } from "@/config/font";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const ProductSlugPage = ({ params: { slug } }: Props) => {
  const products = initialData.products.find(
    (product) => product.slug === slug
  );

  if (!products) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1  md:grid-cols-3 gap-3">
      {/* Slideshow*/}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShowMobile
          images={products.images}
          title={products.title}
          className="block md:hidden"
        />
        <ProductSlideShow
          images={products.images}
          title={products.title}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {products.title}
        </h1>
        <p className="text-lg mb-5">${products.price}</p>
        {/* Sizes */}
        <SizeSelector
          selectedSize={products.sizes[0]}
          availableSizes={products.sizes}
        />

        {/* Quantity */}
        <QuantitySelector quantity={2} />

        {/* Add to cart */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{products.description} </p>
      </div>
    </div>
  );
};

export default ProductSlugPage;
