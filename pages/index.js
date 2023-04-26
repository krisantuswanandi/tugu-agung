import Head from "next/head";
import { Noto_Sans } from "next/font/google";
import { google } from "googleapis";
import { useState } from "react";

const noto = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

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
  const products = data
    .filter(
      (row) => row[0] && (row[20] || row[21] || row[22] || row[23] || row[24])
    )
    .map((row) => ({
      name: row[0],
      dos: row[20] || '',
      bal: row[21] || '',
      lusin: row[22] || '',
      rtg: row[23] || '',
      pcs: row[24] || '',
    }));

  return {
    props: {
      products,
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
    <div className="flex items-baseline justify-end">
      <div className="text-right text-sm">{formatCurrency(price)}</div>
      <div className="ml-0.5 w-9 text-sm lowercase text-zinc-400">/{label}</div>
    </div>
  );
}

function Product({ product }) {
  return (
    <div className="mb-2 rounded-md border border-zinc-200 bg-white px-4 py-2">
      <div className="truncate font-bold">{product.name}</div>
      <div className="mt-4">
        <Price label="Dos" price={product.dos} />
        <Price label="Bal" price={product.bal} />
        <Price label="Lusin" price={product.lusin} />
        <Price label="Rtg" price={product.rtg} />
        <Price label="Pcs" price={product.pcs} />
      </div>
    </div>
  );
}

function Products({ products }) {
  return (
    <div>
      {products?.map((product) => (
        <Product key={product.name} product={product} />
      ))}
    </div>
  );
}

function Search({ value, onSearch }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-zinc-50/80 from-50% to-transparent pb-4 pt-20">
      <div className="m-auto w-96">
        <input
          className="w-full rounded-md border border-zinc-200 px-2 py-1 text-sm"
          value={value}
          onInput={onSearch}
          placeholder="Cari barang..."
        />
      </div>
    </div>
  );
}

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Tugu Agung</title>
        <meta name="description" content="don't look at this" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${noto.variable} min-h-full bg-zinc-50 font-sans text-zinc-600`}
      >
        <div className="m-auto w-96">
          <div className="py-8 text-center text-3xl font-bold text-zinc-300">
            TUGU AGUNG
          </div>
          <Products products={filteredProducts} />
          <Search
            value={search}
            onSearch={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </main>
    </>
  );
}
