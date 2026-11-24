import { useState } from 'react';
import { X } from 'lucide-react';

export default function SessionModal({ isOpen, onClose, spots, onCreateSession }) {
  const [spotId, setSpotId] = useState(spots[0]?.id || '');
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [seatsLeft, setSeatsLeft] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!course.trim() || !topic.trim()) return;
    onCreateSession(spotId, {
      id: `s-${Date.now()}`,
      course: course.trim().toUpperCase(),
      topic: topic.trim(),
      seatsLeft: Number(seatsLeft),
    });
    setCourse('');
    setTopic('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Host a Drop-In Study Session</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Study Location</label>
            <select
              value={spotId}
              onChange={(e) => setSpotId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              {spots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Course Code</label>
            <input
              type="text"
              placeholder="e.g., COMP 1406"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Focus Topic</label>
            <input
              type="text"
              placeholder="e.g., Linked Lists & Assignment 2"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Open Seats</label>
            <input
              type="number"
              min="1"
              max="8"
              value={seatsLeft}
              onChange={(e) => setSeatsLeft(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Publish Live Session
          </button>
        </form>
      </div>
    </div>
  );
}