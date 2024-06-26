import { TopMenu } from "@/components";
import Footer from "@/components/ui/footer/Footer";
import Sidebar from "@/components/ui/sidebar/Sidebar";

export const metadata = {
  title: "Ecommerce Outfit",
  description: "Una tieda virtual de productos",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
