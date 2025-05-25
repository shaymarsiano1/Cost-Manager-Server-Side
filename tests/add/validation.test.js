const request = require('supertest');
const app = require('../../index');

describe('❌ Validation: POST /api/add', () => {
    it('should return 400 if description is missing', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                category: "food",
                sum: 20
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/add/);
    });

    it('should return 400 if sum is missing', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                description: "burger",
                category: "food"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/add/);
    });

    it('should return 500 if category is invalid', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                description: "flight",
                category: "travel", // קטגוריה לא חוקית
                sum: 400
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toMatch(/\/api\/add/);
    });
});
