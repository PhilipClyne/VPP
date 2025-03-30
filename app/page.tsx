import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Stripe from "stripe";

export default async function Home() {
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * The homepage of the application.
   *
   * This page displays a hero section with a background image and a call-to-action
   * button to browse all products. Below the hero section, it displays a list of all
   * products with their name, price, and a link to the product details page.
   */
  /******  747122b5-5b37-4861-998c-a48349eb9ae4  *******/ const products =
    await stripe.products.list({
      expand: ["data.default_price"],
    });

  if (!products.data.length) {
    return <p className="text-center text-lg">No products available.</p>;
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24">
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          {products.data[0]?.images?.[0] && (
            <Image
              alt="Hero Image"
              src={products.data[0].images[0]}
              className="rounded"
              width={450}
              height={450}
            />
          )}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.slice(1).map((product) => {
            const price = product.default_price as Stripe.Price;
            return (
              <div
                key={product.id}
                className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between"
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded mb-4"
                  />
                </Link>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 min-h-[3rem]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 min-h-[4rem]">
                    {product.description}
                  </p>
                </div>
                <p className="text-lg font-semibold mt-4 text-black">
                  {price?.unit_amount
                    ? (price.unit_amount / 100).toFixed(3) + "đ"
                    : "N/A"}
                </p>
                <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">
                  <Link href="/products">Mua Ngay</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
