import { getMyToken } from '@/utilities/getMyToken';
export default async function brands() {
  const res = await getMyToken();

console.log(res);

return <>
    <div>brands</div>
    
</>
}
