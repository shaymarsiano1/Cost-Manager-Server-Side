const request = require('supertest');
const app = require('../../index');

describe('❌ Failure: GET /api/users/:id', () => {
    it('should return 404 if user does not exist', async () => {
        const res = await request(app).get('/api/users/999999');

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toMatch(/\/api\/users\/999999/);
    });

    it('should return 500 if id is not a number', async () => {
        const res = await request(app).get('/api/users/abc');

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toMatch(/\/api\/users\/abc/);
    });
});
