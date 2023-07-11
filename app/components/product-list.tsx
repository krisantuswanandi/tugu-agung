"use client";

import { useState } from "react";
import { ProductItem } from "./product-item";
import { ProductSearch } from "./product-search";
import type { Product } from "../types";

type ProductsProps = {
  products: Product[];
};

export function ProductList({ products }: ProductsProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search)
  );

  return (
    <>
      <ProductSearch
        value={search}
        onSearch={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div>
        {filteredProducts.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </div>
    </>
  );
}
