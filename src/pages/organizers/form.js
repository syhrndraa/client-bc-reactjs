import React from 'react';
import {
  // Figure,
  Form,
} from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
// import { config } from '../../configs';

export default function OrganizersForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukan nama organizer'}
        label={'Nama'}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan email organizer'}
        label={'Email'}
        name="email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan role'}
        label={'Role'}
        name="role"
        value={form.role}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan password'}
        label={'Password'}
        name="password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan ulang password'}
        label={'Confirm Password'}
        name="confirmPassword"
        value={form.confirmPassword}
        type="password"
        onChange={handleChange}
      />
      <br></br>

      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}
