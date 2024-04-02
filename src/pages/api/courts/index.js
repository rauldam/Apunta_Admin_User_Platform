import { apiHandler, customerRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const customers = await customerRepo.getAll();
    return res.status(200).json(customers);
}
