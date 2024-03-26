import { db } from 'helpers/api';

export const customersRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Customer.findAll();
}

async function getById(id) {
    return await db.Customer.findByPk(id);
}

async function create(params) {
    // validate
    if (await db.Customer.findOne({ where: { vat: params.vat } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const customer = new db.Customer(params);

    // save user
    await customer.save();
}

async function update(id, params) {
    const customer = await db.Customer.findByPk(id);

    // validate
    if (!customer) throw 'Customer not found';
    if (customer.vat !== params.vat && await db.Customer.findOne({ where: { vat: params.vat } })) {
        throw 'VAT "' + params.vat + '" is already taken';
    }

    // copy params properties to user
    Object.assign(customer, params);

    await customer.save();
}

async function _delete(id) {
    const customer = await db.Customer.findByPk(id);
    if (!customer) throw 'Customer not found';

    // delete user
    await customer.destroy();
}
