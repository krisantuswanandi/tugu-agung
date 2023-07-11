import { google } from "googleapis";
import { AppHeader } from "./components/app-header";
import { AppFooter } from "./components/app-footer";
import { ProductList } from "./components/product-list";
import type { Product } from "./types";

export const revalidate = 60;

async function getData() {
  const auth = await google.auth.getClient({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || ""),
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
  const products: Product[] = data
    ? data
        .filter(
          (row) =>
            row[0] && (row[20] || row[21] || row[22] || row[23] || row[24])
        )
        .map((row) => ({
          name: row[0],
          dos: row[20] || "",
          bal: row[21] || "",
          lusin: row[22] || "",
          rtg: row[23] || "",
          pcs: row[24] || "",
        }))
    : [];

  return {
    products,
  };
}

export default async function Home() {
  const { products } = await getData();

  return (
    <main className="m-auto w-96 p-2">
      <AppHeader />
      <ProductList products={products} />
      <AppFooter />
    </main>
  );
}
