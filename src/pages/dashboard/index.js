import React from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';

export default function DashboardPage() {
  return (
    <>
      <Container className="mt-3">
        <SBreadCrumb />
        <h1>Dashboard</h1>
      </Container>
    </>
  );
}
