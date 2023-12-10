import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Xoni() {
  const { user, error, isLoading} = useUser();

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/manageFlowers");
    }
  }, [user]);

  if (isLoading) {
    return <div>... loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex h-100">
      <div className=" w-2/3 ">
        <img
          className="bg-black w-full h-screen object-cover"
          src="https://updatenaw.com/wp-content/uploads/2021/01/pexels-masum-ahmed-3864474.jpg.webp"
          alt="Logo"
        />
      </div>
      <div className="bg-yellow-100 w-1/3 h-screen">
        <div className="mt-28 text-center mx-10">
          <div className="bg-yellow-100 pb-10">
            <p className="text-6xl text-gray-700 font-semibold">
              Flower Shop
            </p>
          </div>
          <div className=" h-60">
            <h1 className=" pb-16 pt-6 text-2xl	">
              If you want to manage flowers press login !
            </h1>
            <Link
              href="/api/auth/login"
              className=" text-4xl p-4 border-gray-700 border-4"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
