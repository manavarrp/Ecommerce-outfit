import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div>
      <Title title={`Perfil de ${session?.user?.name}`} />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <p className="text-3xl">{ session?.user?.role}</p>
    </div>
  );
};

export default page;
