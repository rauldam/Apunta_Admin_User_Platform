import { apiHandler, courtsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const court = await courtsRepo.getById(req.query.id);

    if (!court) throw 'Court Not Found';

    return res.status(200).json(court);
}

async function update(req, res) {
    await courtsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await courtsRepo.delete(req.query.id);
    return res.status(200).json({});
}
