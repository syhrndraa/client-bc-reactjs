import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavAccess from '../NavAccess';
import { useNavigate } from 'react-router-dom';
import {
  accessCategories,
  accessTalents,
  accessEvents,
  accessParticipant,
  accessPayments,
  accessOrders,
  accessOrganizers,
  accessAdmins,
} from '../../const/access';

export default function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavAccess
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate('/')}
          >
            Home
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate('/categories')}
          >
            Categories
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessTalents.lihat}
            action={() => navigate('/talents')}
          >
            Talents
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessPayments.lihat}
            action={() => navigate('/payments')}
          >
            Payment
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessOrganizers.lihat}
            action={() => navigate('/organizers')}
          >
            Organizers
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessEvents.lihat}
            action={() => navigate('/events')}
          >
            Events
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessParticipant.lihat}
            action={() => navigate('/participant')}
          >
            Participant
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessOrders.lihat}
            action={() => navigate('/orders')}
          >
            Orders
          </NavAccess>
          <NavAccess
            role={role}
            roles={accessAdmins.lihat}
            action={() => navigate('/admins')}
          >
            Admins
          </NavAccess>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
