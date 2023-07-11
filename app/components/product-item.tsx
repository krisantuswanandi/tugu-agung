import { ProductPrice } from "./product-price";
import type { Product } from "../types";

type ProductProps = {
  product: Product;
};

export function ProductItem({ product }: ProductProps) {
  return (
    <div className="mt-2 rounded-md border border-zinc-200 bg-white px-4 py-2">
      <div className="truncate font-bold">{product.name}</div>
      <div className="mt-4">
        <ProductPrice label="Dos" price={product.dos} />
        <ProductPrice label="Bal" price={product.bal} />
        <ProductPrice label="Lusin" price={product.lusin} />
        <ProductPrice label="Rtg" price={product.rtg} />
        <ProductPrice label="Pcs" price={product.pcs} />
      </div>
    </div>
  );
}
