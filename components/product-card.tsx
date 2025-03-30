import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus } from "lucide-react";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
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
    <Card className="group hover:shadow-xl transition duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white">
      <Link
        href={`/products/${product.id}`}
        className="block relative w-full h-56"
      >
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-gray-900 truncate">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-3">
        {product.description && (
          <p className="text-gray-600 text-sm truncate">
            {product.description}
          </p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            {(price.unit_amount / 100).toFixed(3)}đ
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-300"
              onClick={() => removeItem(product.id)}
            >
              <Minus className="w-5 h-5" />
            </Button>
            <span className="text-lg font-semibold mx-3">{quantity}</span>
            <Button
              variant="ghost"
              className="hover:bg-gray-300"
              size="icon"
              onClick={onAddItem}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <Link href={`/products/${product.id}`}>
            <Button className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
