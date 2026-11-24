export default function FilterBar({ selectedVibe, setSelectedVibe, onlyOutlets, setOnlyOutlets }) {
  const vibes = ['All', 'Solo Quiet', 'Group Work'];

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
      <div className="flex flex-wrap items-center gap-2">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setSelectedVibe(vibe)}
            className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition ${
              selectedVibe === vibe
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={onlyOutlets}
          onChange={(e) => setOnlyOutlets(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600"
        />
        High Outlet Access Only
      </label>
    </div>
  );
}