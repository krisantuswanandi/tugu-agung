function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

type PriceProps = {
  label: string;
  price: number;
};

export function ProductPrice({ label, price }: PriceProps) {
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
