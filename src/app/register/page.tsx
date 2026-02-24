'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { registerShema, registerType } from '@/shema/register.shema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


export default function Register() {
  const router = useRouter();

  const form = useForm <registerType>({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    resolver:zodResolver(registerShema),
  })
const { handleSubmit } = form;
  function handleRegister(values :registerType){
console.log(values);

// call api to register the user
axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).then((res)=>{
  toast.success(res.data.message, {
    duration:4000,
    position:"top-center"
  });
router.push('/login');
  console.log(res);
}).catch((err)=>{
  // console.log(err.response.data.message);
  toast.error(err.response.data.message ,{
    duration:50000,
    position:"top-center"
  });
});


  }
  return <>
  <div className="w-[50%] mx-auto mt-10"> 
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">


      <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Name ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && fieldState.isTouched && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    
          </FieldGroup>
             <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    email :::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    
          </FieldGroup>
              <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    password ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    
          </FieldGroup>
              <FieldGroup>
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-rePassword">
                    re-enter password ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-rePassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Re-enter your password please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    
          </FieldGroup>
                        <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    phone ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone number please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>

          <Button className='w-full my-3' type='submit'>Register</Button>
        </form>
      </div>

    </>
}
