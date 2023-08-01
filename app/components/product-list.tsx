"use client";

import { useState } from "react";
import Fuse from "fuse.js";
import { ProductItem } from "./product-item";
import { ProductSearch } from "./product-search";
import type { Product } from "../types";

type ProductsProps = {
  products: Product[];
};

export function ProductList({ products }: ProductsProps) {
  const [search, setSearch] = useState("");

  const fuse = new Fuse(products, { keys: ["name"] });
  const fusedProducts = fuse.search(search);
  const filteredProducts = fusedProducts.length
    ? fusedProducts.map((p) => p.item)
    : products;

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
