import { Product } from "../models/Product.js";

const specWeights: Record<string, string[]> = {
  mobile: ["display.refreshRate", "chipset", "ram", "storage", "battery", "camera.main", "price.official"],
  laptop: ["processor", "gpu", "ram", "storage", "display", "battery", "price.official"],
  smartwatch: ["display", "battery", "sensors", "waterResistance", "price.official"],
  tablet: ["display", "chipset", "ram", "storage", "battery", "price.official"]
};

export async function compareProducts(ids: string[]) {
  if (ids.length < 2 || ids.length > 4) {
    throw new Error("Compare between 2 and 4 products");
  }

  const products = await Product.find({ _id: { $in: ids }, status: "published" }).lean();
  const category = products[0]?.category ?? "mobile";
  const keys = specWeights[category] ?? specWeights.mobile;

  return {
    products,
    highlights: keys.map((key) => {
      const values = products.map((product) => ({
        product: product._id,
        value: key.startsWith("price") ? product.price?.official : product.specifications?.get?.(key) ?? product.specifications?.[key]
      }));

      return { key, values };
    })
  };
}
