export const accessCategories = {
  lihat: ['organizer'],
  tambah: ['organizer'],
  edit: ['organizer'],
  hapus: ['organizer'],
};

export const accessTalents = {
  lihat: ['organizer'],
  tambah: ['organizer'],
  edit: ['organizer'],
  hapus: ['organizer'],
};

export const accessEvents = {
  lihat: ['organizer', 'owner'],
  tambah: ['organizer'],
  edit: ['organizer', 'owner'],
  hapus: ['organizer', 'owner'],
};

// export const accessParticipant = {
//   lihat: ['organizer'],
//   tambah: ['organizer'],
//   edit: ['organizer'],
//   hapus: ['organizer'],
// };

export const accessPayments = {
  lihat: ['organizer'],
  tambah: ['organizer'],
  edit: ['organizer'],
  hapus: ['organizer'],
};

export const accessOrders = {
  lihat: ['organizer', 'admin', 'owner'],
  tambah: ['organizer', 'admin', 'owner'],
  edit: ['organizer', 'admin', 'owner'],
  hapus: ['organizer', 'admin', 'owner'],
};

export const accessOrganizers = {
  lihat: ['owner'],
  tambah: ['owner'],
  edit: ['owner'],
  hapus: ['owner'],
};

export const accessAdmins = {
  lihat: ['organizer'],
  tambah: ['organizer'],
  edit: ['organizer'],
  hapus: ['organizer'],
};
