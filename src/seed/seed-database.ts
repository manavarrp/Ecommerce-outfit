import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  //1. Borrar registros
  
   await prisma.productImage.deleteMany()
   await prisma.product.deleteMany()
   await prisma.category.deleteMany()
  
  //categories
  const { categories, products } = initialData;
  const categoriesData = categories.map((name) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
  }));
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string= namcategory, string= categoryId>
  //products
  //const {images, type, ...porduct1} = products[0];
  /* await prisma.product.create({
    data: {
      ...porduct1,
      categoryId: categoriesMap["shirts"]
      },
  }) */

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
    const imagesData = images.map((image) => ({
        url: image,
        productId: dbProduct.id,
      }));

    await prisma.productImage.createMany({
      data: imagesData,
    })
  });
  //images
  

  console.log(categoriesMap);
  console.log("seed exec  correctly");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
