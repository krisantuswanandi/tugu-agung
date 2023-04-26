import Head from "next/head";
import { google } from "googleapis";
import { useState } from "react";

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const range = `'Daftar Harga'!A3:Y`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const data = response.data.values;

  return {
    props: {
      products: data.filter((row) => row[0]),
    },
  };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function Price({ label, price }) {
  if (!price) {
    return null;
  }

  return (
    <div>
      {label}: {formatCurrency(price)}
    </div>
  );
}

function Product({ product }) {
  return (
    <div>
      <div>
        <div>Nama barang: {product[0]}</div>
      </div>
      <div>
        <div>Harga modal: </div>
        <div>
          <Price label="Dos" price={product[15]} />
          <Price label="Bal" price={product[16]} />
          <Price label="Lusin" price={product[17]} />
          <Price label="Renteng" price={product[18]} />
          <Price label="Pcs" price={product[19]} />
        </div>
      </div>
      <div>
        <div>Harga jual: </div>
        <div>
          <Price label="Dos" price={product[20]} />
          <Price label="Bal" price={product[21]} />
          <Price label="Lusin" price={product[22]} />
          <Price label="Renteng" price={product[23]} />
          <Price label="Pcs" price={product[24]} />
        </div>
      </div>
    </div>
  );
}

function Products({ products }) {
  return products?.map((product) => (
    <Product key={product[0]} product={product} />
  ));
}

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const onSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredProducts = products.filter((product) =>
    product[0].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Tugu Agung</title>
        <meta name="description" content="don't look at this" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <input value={search} onInput={onSearch} />
        <Products products={filteredProducts} />
      </main>
    </>
  );
}
