import { apiHandler, plansRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const plan = await plansRepo.getById(req.query.id);

    if (!plan) throw 'Customer Not Found';

    return res.status(200).json(plan);
}

async function update(req, res) {
    await plansRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await plansRepo.delete(req.query.id);
    return res.status(200).json({});
}
