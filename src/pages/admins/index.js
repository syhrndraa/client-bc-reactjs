import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchTalents, setKeyword } from '../../redux/talents/actions';
import AlertMessage from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { fetchAdmins, setKeyword } from '../../redux/admins/actions';
import { accessAdmins } from '../../const/access';

function AdminsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const state = useSelector((state) => state);
  //   console.log(state);
  //   console.log(`state`);
  const notif = useSelector((state) => state.notif); //didapatkan dari store (state global)
  const admins = useSelector((state) => state.admins);
  console.log('admins');
  console.log(admins.data);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessAdmins).forEach(function (key, index) {
      if (accessAdmins[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  //   useEffect(() => {
  //     dispatch(fetchAdmins());
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch, admins.keyword]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/admins/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus admin ${res.data.data.name}`
          )
        );

        dispatch(fetchAdmins());
      }
    });
  };

  return (
    <Container className="mt-3">
      <BreadCrumb textSecond={'Admins'} />
      {access.tambah && (
        <div className="mb-3">
          <Button action={() => navigate('/admins/create')}>Tambah</Button>
        </div>
      )}
      <SearchInput
        query={admins.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={admins.status}
        thead={['Nama', 'Email', 'Role', 'Aksi']}
        data={admins.data}
        // data={admins.data.map((data, index) => {
        //   if (data.role === 'admin') {
        //     return data;
        //   }
        // })}
        tbody={['name', 'email', 'role']}
        editUrl={access.edit ? `/users/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default AdminsPage;
