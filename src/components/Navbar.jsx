import { Sparkles, Plus } from 'lucide-react';

export default function Navbar({ onOpenModal }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">StudySync</h1>
            <p className="text-xs text-slate-500">Tech Meets Campus Life • Live Pulse</p>
          </div>
        </div>

        <button
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Host Study Session
        </button>
      </div>
    </header>
  );
}