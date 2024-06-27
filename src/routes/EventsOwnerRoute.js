import { Route, Routes } from 'react-router-dom';

import Events from '../pages/eventsOwner';

export function EventsOwnerRoute() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
    </Routes>
  );
}
