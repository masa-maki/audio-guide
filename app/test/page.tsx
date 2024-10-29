import { type NextPage } from 'next';
import React, { Provider, useState } from 'react';
import{ CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ButtonTest } from "./ButtonTest";

// cookie options path to apply cookie & security setting
const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
}

// function to set cookie
const setUuidCookie = (uuid: string) => {
  const cookieStore = cookies();
  cookieStore.set({ name: "user_uuid", value : uuid, ...cookieOptions });
}

// function to get cookie
export const getUuidFromCookie = () => {
  const cookieStore = cookies();
  return cookieStore.get("user_uuid")?.value;
}

// function to delete cookie
export const deleteUuidCookie = () => {
  const cookieStore = cookies();
  cookieStore.set({ name: "user_uuid", value: "", ...cookieOptions });
}

// export const loginAction = async (provider: Provider) => {
export const loginAction = async () => {
  try {
    setUuidCookie("123456789");
    return ("true");
  } catch (error) {
    return ("false");
  }
};



const Home: NextPage = () => {
  return (
    <main className="flex h-screen sm:h-full w-full flex-col items-center justify-center p-0 sm:p-4">
      <div className="bg-accent flex h-screen sm:h-full w-full sm:max-w-fit sm:rounded-lg bg-gray-100 pb-4 text-center shadow">
        <div className="w-full flex flex-col space-y-0 p-8">
          <h1 className="text-xl">TEST page</h1>
          <ButtonTest />
        </div>
      </div>
    </main>
  );
};

export default Home;
