import { apiHandler, customerRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await customerRepo.create(req.body);
    return res.status(200).json({});
}
