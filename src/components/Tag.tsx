export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-tag px-2.5 py-1 text-xs font-medium text-fg">
          {t}
        </li>
      ))}
    </ul>
  );
}
