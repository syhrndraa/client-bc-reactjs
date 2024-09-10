import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { getData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function OrganizersEdit() {
  const { organizerId } = useParams();
  console.log('organizerId');
  console.log(organizerId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneOrganizers = async () => {
    const res = await getData(`/cms/users/${organizerId}`);
    console.log('res');
    console.log(res);

    setForm({
      ...form,
      name: res.data.data.name,
      email: res.data.data.email,
      role: res.data.data.role,
    });
  };

  useEffect(() => {
    fetchOneOrganizers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name: form.name,
      organizer: form.name,
      email: form.email,
      role: form.role,
    };

    const res = await putData(`/cms/users/${organizerId}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil update organizer ${res.data.data.name}`
        )
      );
      navigate('/organizers');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecond={'Organizers'}
        urlSecond={'/organizers'}
        textThird="Edit"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default OrganizersEdit;
