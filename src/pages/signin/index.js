import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import SAlert from '../../components/Alert';
import { useNavigate, Navigate } from 'react-router-dom';
import { config } from '../../configs';
import SForm from './form';

function SigninPage() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({
    status: 'false',
    message: '',
    type: 'danger',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        //bisa pake : form jika yang dikirim semua
        {
          email: form.email,
          password: form.password,
        }
      );
      localStorage.setItem('token', res.data.data.token);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setShow(true);
      // console.log(error.response.data.msg);
      setAlert({
        status: true,
        type: 'danger',
        message: error?.response?.data?.msg ?? 'Internal Server ERROR',
      });
    }
  };
  if (token) return <Navigate to="/" replace={true} />;
  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: '50%' }}>
        {alert.status && (
          <SAlert type={alert.type} message={alert.message} isShow={show} />
        )}
      </div>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>Form</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SigninPage;
