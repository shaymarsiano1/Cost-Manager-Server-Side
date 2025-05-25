const request = require('supertest');
const app = require('../../index');

describe('❌ Validation: GET /api/report', () => {
    it('should return 400 if parameters are missing', async () => {
        const res = await request(app).get('/api/report?id=123123&month=6');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/report/);
    });

    it('should return 400 if year is not a number', async () => {
        const res = await request(app).get('/api/report?id=123123&year=abc&month=6');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/report/);
    });

    it('should return 400 if id is not a number', async () => {
        const res = await request(app).get('/api/report?id=abc&year=2025&month=6');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/report/);
    });

    it('should return 400 if month is out of range', async () => {
        const res = await request(app).get('/api/report?id=123123&year=2025&month=13');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/report/);
    });

    it('should return 400 if month is missing', async () => {
        const res = await request(app).get('/api/report?id=123123&year=2025');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/\/api\/report/);
    });
});
