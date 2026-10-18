"use client";

import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";


interface Inputs {
  email: string;
  password: string;
}


function LoginPage() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth()

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => 
  {
    if (login) {
      await signIn(email, password); // Assuming you have a signIn function for login
      // Handle login logic here
      console.log("Logging in with:", { email, password });
    } else {
      await signUp(email, password); // Assuming you have a signUp function for registration  
      // Handle sign-up logic here
      console.log("Signing up with:", { email, password });
    }

  }





  return (
    <div className="relative h-screen w-screen flex-col bg-black md:items-center
    md:justify-center md:flex md:bg-transparent">
    <Head>
        <title>Netflix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Image 
      src="/images/netflix-background.jpg"
      alt="Netflix Background"
      fill
      priority
      sizes="100vw"
      className="object-cover opacity-60 sm:opacity-50"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0
       md:max-w-md md:px-14">
        <h1 className="text-4xl font-sbold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input"
            {...register("email", { required: true })} />
            {errors.email && <span className="text-[#e50914] text-sm">This field is required</span>}
          </label>
          <label>
            <input type="password" placeholder="Password" className="input" 
            {...register("password", { required: true })} />
            {errors.password && <span className="text-[#e50914] text-sm">This field is required</span>}
          </label>
        </div>
        <button className="w-full rounded bg-[#e50914] py-3 font-semibold"
        onClick={() => setLogin(true)}>
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button type="submit" 
          className="text-white hover:underline"
          onClick={() => setLogin(false)}>
            Sign up now
          </button>
        </div>
      </form>
      </div>
  );
}

export default LoginPage;