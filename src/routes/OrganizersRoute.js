import { Route, Routes } from 'react-router-dom';

import Organizers from '../pages/organizers';
import Create from '../pages/organizers/create';
import Edit from '../pages/organizers/edit';

export function OrganizersRoute() {
  return (
    <Routes>
      <Route path="/" element={<Organizers />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:organizerId" element={<Edit />} />
    </Routes>
  );
}
