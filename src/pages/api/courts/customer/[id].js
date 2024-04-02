import { apiHandler, courtsRepo } from 'helpers/api';

export default apiHandler({
    get: getAllByFk
});

async function getAllByFk(req, res) {
    const courts = await courtsRepo.getAllByFk(req.query.id);

    if (!courtsRepo) throw 'Courts Not Found';

    return res.status(200).json(courts);
}
