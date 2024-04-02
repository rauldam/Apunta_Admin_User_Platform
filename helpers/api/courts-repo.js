import { db } from 'helpers/api';

export const courtsRepo = {
    getAll,
    getById,
    create,
    update,
    getAllByFk,
    delete: _delete
};


async function getAll() {
    return await db.Court.findAll();
}

async function getAllByFk(params) {
  return await db.Court.findAll({
    where: {
      customerId: params
    },
    include: db.Plan
  });
}

async function getById(id) {
    return await db.Court.findByPk(id);
}

async function create(params) {
    // validate
    if (await db.Court.findOne({ where: { mac: params.mac } })) {
        throw 'Court "' + params.mac + '" is already taken';
    }

    const courts = new db.Courts(params);

    // save user
    await courts.save();
}

async function update(id, params) {
    const courts = await db.Court.findByPk(id);

    // validate
    if (!courts) throw 'Court not found';

    // copy params properties to court
    Object.assign(courts, params);

    await courts.save();
}

async function _delete(id) {
    const courts = await db.Courts.findByPk(id);
    if (!courts) throw 'Court not found';

    // delete user
    await courts.destroy();
}
