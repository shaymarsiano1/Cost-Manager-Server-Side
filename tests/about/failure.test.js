const request = require('supertest');
const app = require('../../index');

describe('❌ Failure: GET /api/about', () => {
    it('should handle error and return JSON error message', async () => {
        const res = await request(app).get('/api/about?forceError=true');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toMatch(/\/api\/about/);
    });
});
