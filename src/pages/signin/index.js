import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';

function SigninPage() {
  const dispatch = useDispatch();
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
    const res = await postData(`/cms/auth/signin`, form);
    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.refreshToken,
          res.data.data.email
        )
      );
      // localStorage.setItem('token', res.data.data.token);
      setIsLoading(false);
      navigate('/');
    } else {
      setIsLoading(false);
      setShow(true);
      // console.log(error.response.data.msg);
      setAlert({
        status: true,
        type: 'danger',
        message: res?.response?.data?.msg ?? 'Internal Server ERROR',
      });
    }
  };

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
