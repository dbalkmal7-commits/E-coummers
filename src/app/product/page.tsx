import getProducts from '../../api/getProduct';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { product } from '@/type/product.type';
import AddBtn from '../_components/AddBtn/AddBtn';
export default async function Product( ) {
  // const data = await getProducts();
  const data: product[] = await getProducts();

  return <>

    <div className='container mx-auto my-4 md:w-[80%] w-full'>
      <div className="flex flex-wrap">


        {data?.map((product:product , index:number) => {
          return  <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">

<Link href={`/product/${product._id}`} key={product._id}>
            <div className='px-2 background-white shadow-md p-3 rounded-3xl'>
  <CardHeader>
    <CardTitle>{<Image width={100} className='w-full' height={100} src={product.imageCover} alt="product details " />}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  
  </CardHeader>
  <CardContent>
    <p className='font-bold line-clamp-1'>{product.title}</p>
  </CardContent>
  <CardFooter className='flex justify-between'>
    <p>{product.price} EGP</p>
    <p><i className=" text-yellow-400 fa-solid fa-star"></i>{product.ratingsAverage}</p>
  </CardFooter>

 <AddBtn id={product._id} /> 
</div>

</Link>
   
        </div>
        })}
      </div>



    </div>
  </>


}