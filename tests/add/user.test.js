const request = require('supertest');
const app = require('../../index');

describe('❌ User: POST /api/add', () => {
    it('should return 404 if user does not exist', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 999999,
                description: "fake user",
                category: "food",
                sum: 50
            });

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toMatch(/\/api\/add/);
    });
});
