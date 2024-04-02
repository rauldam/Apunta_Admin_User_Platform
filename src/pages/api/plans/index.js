import { apiHandler, courtsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const courts = await courtsRepo.getAll();
    return res.status(200).json(courts);
}
