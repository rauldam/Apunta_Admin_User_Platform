import { db } from 'helpers/api';

export const plansRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Plan.findAll();
}

async function getById(id) {
    return await db.Plan.findByPk(id);
}

async function create(params) {
    // validate
    if (await db.Plan.findOne({ where: { id: params.id } })) {
        throw 'Plan "' + params.id + '" is already taken';
    }

    const plan = new db.Plan(params);

    // save user
    await plan.save();
}

async function update(id, params) {
    const plan = await db.Plan.findByPk(id);

    // validate
    if (!plan) throw 'Plan not found';
    if (plan.id !== params.id && await db.Plan.findOne({ where: { id: params.id } })) {
        throw 'ID "' + params.id + '" is already taken';
    }

    // copy params properties to user
    Object.assign(plan, params);

    await plan.save();
}

async function _delete(id) {
    const plan = await db.Plan.findByPk(id);
    if (!plan) throw 'Plan not found';

    // delete user
    await plan.destroy();
}
