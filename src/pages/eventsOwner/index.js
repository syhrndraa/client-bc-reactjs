import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEventsOwner,
  setKeywordOwner,
  setCategoryOwner,
  setTalentOwner,
} from '../../redux/eventsByOwner/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import SelectBox from '../../components/SelectBox';
import {
  fetchListCategories,
  fetchListTalents,
} from '../../redux/lists/actions';

function EventPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.eventsByOwner);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchEventsOwner());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Ubah Status',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === 'Published' ? 'Draft' : 'Published',
        };
        const res = await putData(`/cms/events/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

        dispatch(fetchEventsOwner());
      }
    });
  };

  return (
    <Container className="mt-3">
      {/* <Button action={() => navigate('/events/create')}>Tambah</Button> */}
      <BreadCrumb textSecond={'Events'} />
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) => dispatch(setKeywordOwner(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategoryOwner(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            name="talents"
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => dispatch(setTalentOwner(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={events.status}
        thead={[
          'Judul',
          'Tanggal',
          'Tempat',
          'Status',
          'Kategori',
          'Pembicara',
          'Aksi',
        ]}
        data={events.data}
        tbody={[
          'title',
          'date',
          'venueName',
          'statusEvent',
          'categoryName',
          'talentName',
        ]}
        // editUrl={`/events/edit`}
        // deleteAction={(id) => handleDelete(id)}
        customAction={(id, status = '') => {
          return (
            <Button
              className={'mx-2'}
              variant="primary"
              size={'sm'}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </Button>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;
