"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[0] ?? "/placeholder.jpg",
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {product.name}
        </h1>
        {product.description && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>
        )}
        {price && price.unit_amount && (
          <p className="text-2xl font-semibold text-indigo-600 mb-4">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
            className="text-lg px-4 py-2 shadow-sm hover:bg-gray-100"
          >
            –
          </Button>
          <span className="text-lg font-semibold text-gray-800">
            {quantity}
          </span>
          <Button
            onClick={onAddItem}
            className="text-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
