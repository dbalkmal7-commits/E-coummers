export default async function getAllCategories() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, { method: "GET" , next: { revalidate: 30 } });
  const { data } = await response.json();
  
  return data;
}