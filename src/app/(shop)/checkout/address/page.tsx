import { Title } from "@/components";
import Link from "next/link";
import AddressForm from "./ui/AddressForm";
import { getCountry } from "@/actions/country/get-country";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions/address/get-user-address";

export default async function AddressPage() {
  const countries = await getCountry();

  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/auth/login?redirectTo=/checkout/address">
        Iniciar Sesion
      </Link>
    );
  }


  const getAddress = await getUserAddress(session.user.id) ?? undefined;
  
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm  countries={countries} userStoredAddress={getAddress}/>
      </div>
    </div>
  );
}
