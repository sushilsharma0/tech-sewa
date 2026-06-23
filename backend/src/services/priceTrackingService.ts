import { Product } from "../models/Product.js";
import { PriceHistory } from "../models/Platform.js";

export async function updateProductPrice(input: {
  productId: string;
  store?: string;
  variant?: string;
  price: number;
  source?: "manual" | "import" | "crawler";
}) {
  const product = await Product.findById(input.productId);
  if (!product) throw new Error("Product not found");

  await PriceHistory.create({
    product: input.productId,
    store: input.store,
    variant: input.variant,
    price: input.price,
    source: input.source ?? "manual"
  });

  if (input.store) {
    const stores = ((product.price?.stores ?? []) as any[]);
    const existing = stores.find((store) => store.name === input.store);
    if (existing) {
      existing.price = input.price;
      existing.updatedAt = new Date();
    } else {
      stores.push({ name: input.store, price: input.price, updatedAt: new Date() });
    }
    product.set("price.stores", stores);
  } else {
    product.set("price.official", input.price);
  }

  await product.save();
  return product;
}

export async function getPriceHistory(productId: string) {
  return PriceHistory.find({ product: productId }).sort("createdAt").lean();
}
