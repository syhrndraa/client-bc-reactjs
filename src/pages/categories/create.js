import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate } from 'react-router-dom';
import { config } from '../../configs';
import axios from 'axios';
import SNavbar from '../../components/Navbar';

function CategoryCreate() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${config.api_host_dev}/cms/categories`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   dispatch(
      //     setNotif(
      //       true,
      //       'success',
      //       `berhasil tambah kategori ${res.data.data.name}`
      //     )
      //   );
      navigate('/categories');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: err.response.data.msg,
      });
    }
  };

  return (
    <>
      <SNavbar />
      <Container>
        <SBreadCrumb
          textSecond={'Categories'}
          urlSecond={'/categories'}
          textThird="Create"
        />
        {alert.status && (
          <SAlert type={alert.type} message={alert.message} isShow={true} />
        )}
        <Form
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}

export default CategoryCreate;
