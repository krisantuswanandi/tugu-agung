import { ChangeEventHandler } from "react";

type SearchProps = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

export function ProductSearch({ value, onSearch }: SearchProps) {
  return (
    <div className="top-0 w-full">
      <div className="m-auto">
        <input
          className="w-full rounded-md border border-zinc-200 p-2"
          value={value}
          onChange={onSearch}
          placeholder="Cari barang..."
        />
      </div>
    </div>
  );
}
