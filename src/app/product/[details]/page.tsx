import getProductDetails from '@/api/getDetail';
import { getRelatedProducts } from '@/ProductCategoryAction/relatedProduct.action';
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import { product } from '@/type/product.type';
import Image from 'next/image';

type DetailsProps = {
  params: { details: string };
};

export default async function Details({ params }: DetailsProps) {
  const { details } = params;

  // جلب بيانات المنتج
  const data = await getProductDetails(details);
  if (!data) return <h1 className="text-center mt-8">No product details here</h1>;

  // جلب المنتجات المرتبطة
  const res = await getRelatedProducts(data.category._id);

  return (
    <>
      {/* تفاصيل المنتج */}
      <div className="container mx-auto my-8 md:w-[80%] flex flex-col md:flex-row items-center gap-6">
        {/* الصورة */}
        <div className="rightSide w-full md:w-1/2">
          <h2 className="block sm:hidden text-xl md:text-2xl font-bold">
            {data.data.title}
          </h2>
          <Image
            src={data.data.image}
            alt={data.data.title}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>

        {/* المحتوى */}
        <div className="leftSide w-full md:w-1/2 text-center md:text-left">
          <h2 className="hidden sm:block text-xl md:text-2xl font-bold">
            {data.data.title}
          </h2>

          <p className="text-sm md:text-lg my-2 opacity-60">
            {data.data.description}
          </p>

          <p className="text-sm md:text-base font-medium">
            {data.data.category.name}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-3">
            <p className="font-bold text-lg md:text-xl">{data.data.price} EGP</p>
            <p className="flex items-center justify-center md:justify-start gap-1">
              <i className="fa-solid fa-star text-yellow-400"></i>
              {data.data.ratingsAverage}
            </p>
          </div>

          <AddBtn id={data.data._id} />
        </div>
      </div>

      {/* المنتجات المرتبطة */}
      <div className="container w-[80%] mx-auto mt-12">
        <h2 className="my-7 font-semibold text-2xl">Related Products</h2>
        <div className="flex flex-wrap gap-4">
          {res?.data?.map((prod: product) => (
            <div
              key={prod._id}
              className="w-full sm:w-1/2 md:w-1/4 p-2 border rounded-lg hover:shadow-lg transition"
            >
              <Image
                src={prod.images[0]}
                alt={prod.title}
                width={250}
                height={250}
                className="object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{prod.title}</h3>
              <p className="text-sm opacity-70">{prod.category.name}</p>
              <p className="font-semibold mt-1">{prod.price} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}