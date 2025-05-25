const request = require('supertest');
const app = require('../../index');

describe('✔️ Success: GET /api/about', () => {
    it('should return list of team members with first and last names only', async () => {
        const res = await request(app).get('/api/about');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        for (const member of res.body) {
            expect(member).toHaveProperty('first_name');
            expect(member).toHaveProperty('last_name');
            expect(Object.keys(member).length).toBe(2); // שלא יהיו שדות מיותרים
        }
    });
});
