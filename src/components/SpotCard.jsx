import { Plug, Users, Clock, CheckCircle2 } from 'lucide-react';
import { calculateConfidenceWeight, calculateSuitabilityScore } from '../utils/scoring';

const STATUS_STYLES = {
  Quiet: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  Packed: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function SpotCard({ spot, selectedVibe, onUpdateStatus, onJoinSession }) {
  const matchScore = calculateSuitabilityScore(spot, selectedVibe);
  const confidence = Math.round(calculateConfidenceWeight(spot.updatedMinutesAgo) * 100);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md">
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {spot.building} • {spot.vibe}
            </span>
            <h2 className="mt-0.5 text-base font-bold text-slate-900">{spot.name}</h2>
          </div>

          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
              STATUS_STYLES[spot.status]
            }`}
          >
            {spot.status}
          </span>
        </div>

        {/* Metadata Row */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Plug className="h-3.5 w-3.5 text-slate-400" />
            Outlets: <strong className="text-slate-700">{spot.outlets}</strong>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {spot.updatedMinutesAgo === 0 ? 'Just now' : `${spot.updatedMinutesAgo}m ago`} ({confidence}% fresh)
          </span>
          <span className="ml-auto rounded-md bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">
            {matchScore}% Match
          </span>
        </div>

        {/* Active Peer Sessions */}
        <div className="mb-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500">Active Drop-In Sessions</p>
          {spot.sessions.length === 0 ? (
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-400">
              No active group sessions yet — start one!
            </p>
          ) : (
            spot.sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800">{session.course}</span>
                  <p className="text-xs text-slate-600">{session.topic}</p>
                </div>
                <button
                  disabled={session.seatsLeft <= 0}
                  onClick={() => onJoinSession(spot.id, session.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 shadow-2xs ring-1 ring-slate-200 transition hover:bg-indigo-50 disabled:opacity-50"
                >
                  {session.seatsLeft > 0 ? (
                    <>
                      <Users className="h-3.5 w-3.5" />
                      Join ({session.seatsLeft} left)
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Full
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 1-Tap Crowd Check-in */}
      <div className="border-t border-slate-100 pt-3">
        <p className="mb-2 text-[11px] font-medium text-slate-400">1-Tap Live Capacity Check-In:</p>
        <div className="grid grid-cols-3 gap-1.5">
          {['Quiet', 'Moderate', 'Packed'].map((level) => (
            <button
              key={level}
              onClick={() => onUpdateStatus(spot.id, level)}
              className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                spot.status === level
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}