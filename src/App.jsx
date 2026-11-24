import { useState, useMemo } from 'react';
import { initialSpots } from './data/mockSpots';
import { calculateSuitabilityScore } from './utils/scoring';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import SpotCard from './components/SpotCard';
import SessionModal from './components/SessionModal';

export default function App() {
  const [spots, setSpots] = useState(initialSpots);
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [onlyOutlets, setOnlyOutlets] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStatus = (spotId, newStatus) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === spotId
          ? { ...spot, status: newStatus, updatedMinutesAgo: 0 }
          : spot
      )
    );
  };

  const handleJoinSession = (spotId, sessionId) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === spotId
          ? {
              ...spot,
              sessions: spot.sessions.map((s) =>
                s.id === sessionId && s.seatsLeft > 0
                  ? { ...s, seatsLeft: s.seatsLeft - 1 }
                  : s
              ),
            }
          : spot
      )
    );
  };

  const handleCreateSession = (spotId, newSession) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === spotId
          ? { ...spot, sessions: [...spot.sessions, newSession] }
          : spot
      )
    );
  };

  const filteredSpots = useMemo(() => {
    return spots
      .filter((spot) => {
        if (selectedVibe !== 'All' && spot.vibe !== selectedVibe) return false;
        if (onlyOutlets && spot.outlets !== 'High') return false;
        return true;
      })
      .sort(
        (a, b) =>
          calculateSuitabilityScore(b, selectedVibe) -
          calculateSuitabilityScore(a, selectedVibe)
      );
  }, [spots, selectedVibe, onlyOutlets]);

  return (
    <div className="min-h-screen">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <FilterBar
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
          onlyOutlets={onlyOutlets}
          setOnlyOutlets={setOnlyOutlets}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {filteredSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              selectedVibe={selectedVibe}
              onUpdateStatus={handleUpdateStatus}
              onJoinSession={handleJoinSession}
            />
          ))}
        </div>
      </main>

      <SessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        spots={spots}
        onCreateSession={handleCreateSession}
      />
    </div>
  );
}