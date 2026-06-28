import { archivo_black, manrope } from "@/font/font";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col gap-y-10 items-center justify-center bg-amber-50/50">
      <div>
        <p className={`${ archivo_black.className } text-teal-900 text-5xl tracking-wide`}>Oops! Wrong Page Mistakenly ?</p>
      </div>
      <div>
        <p className={` ${manrope.className}  text-teal-900 text-lg font-semibold text-center`}>The page you're looking for no longer - but no need to worry we are here let's explore </p>
      </div>
      <div className="">
        <Link className={`text-teal-900 bg-[#E1E53F] text-xl rounded-full p-4 ${manrope.className} font-bold`} href={"/product"} >Show Products</Link>
      </div>
    </section>
  );
}