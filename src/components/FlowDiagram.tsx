type Node = { id: string; label: string; sub?: string };
type Props = {
  nodes: Node[];
  label: string;
  activeId?: string;
  /** When provided, nodes render as buttons. Only pass from client components. */
  onSelect?: (id: string) => void;
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="shrink-0 rotate-0 text-muted md:-rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

/** Left-to-right on desktop, top-to-bottom on mobile. Used for static architecture and the interactive walkthrough. */
export function FlowDiagram({ nodes, label, activeId, onSelect }: Props) {
  return (
    <ol aria-label={label} className="flex flex-col items-center gap-2 md:flex-row md:items-stretch md:justify-center">
      {nodes.map((n, i) => {
        const active = n.id === activeId;
        const base = "w-full rounded-xl border px-4 py-3 text-center md:w-auto md:min-w-32 md:flex-1";
        const tone = active ? "border-accent bg-tag ring-2 ring-accent" : "border-line bg-surface";
        const inner = (
          <>
            <span className="block text-sm font-semibold">{n.label}</span>
            {n.sub && <span className="mt-0.5 block text-xs text-muted">{n.sub}</span>}
          </>
        );
        return (
          <li key={n.id} className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-1 md:flex-row">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(n.id)}
                aria-current={active ? "step" : undefined}
                className={`${base} ${tone} min-h-11 hover:border-accent`}
              >
                {inner}
              </button>
            ) : (
              <div className={`${base} ${tone}`}>{inner}</div>
            )}
            {i < nodes.length - 1 && <Arrow />}
          </li>
        );
      })}
    </ol>
  );
}
