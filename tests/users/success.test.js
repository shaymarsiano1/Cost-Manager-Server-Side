const request = require('supertest');
const app = require('../../index');

describe('✔️ Success: GET /api/users/:id', () => {
    it('should return user details and total cost', async () => {
        const res = await request(app).get('/api/users/123123');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 123123);
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('total');
        expect(typeof res.body.total).toBe('number');
    });
});
