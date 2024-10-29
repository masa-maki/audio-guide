import{ CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";


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



// import { CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// Cookieの設定オプション
// const cookieOptions: CookieOptions = {
//   path: "/",
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
// };
// UUIDをクッキーに保存する関数
// const setUuidCookie = (uuid: string) => {
//   const cookieStore = cookies();
//   cookieStore.set({ name: "user_uuid", value: uuid, ...cookieOptions });
// };
// UUIDをクッキーから取得する関数
// export const getUuidFromCookie = () => {
//   const cookieStore = cookies();
//   return cookieStore.get("user_uuid")?.value;
// };

// UUIDをクッキーから削除する関数
// export const deleteUuidCookie = () => {
//   const cookieStore = cookies();
//   cookieStore.set({ name: "user_uuid", value: "", ...cookieOptions });
// };
