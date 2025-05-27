/**
 * Success test for GET /api/report.
 * Verifies that a valid request returns a structured monthly cost report grouped by category.
 */

const request = require('supertest');
const app = require('../../index');

describe('Success: GET /api/report', () => {

    /**
     * Should return a 200 response with user cost data grouped by predefined categories.
     */
    it('should return a grouped cost report by category', async () => {
        const res = await request(app)
            .get('/api/report?id=123123&year=2025&month=6');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userid', 123123);
        expect(res.body).toHaveProperty('year', 2025);
        expect(res.body).toHaveProperty('month', 6);
        expect(Array.isArray(res.body.costs)).toBe(true);

        const expectedCategories = ['food', 'health', 'housing', 'sport', 'education'];
        const resultCategories = res.body.costs.map(obj => Object.keys(obj)[0]);
        expect(resultCategories).toEqual(expect.arrayContaining(expectedCategories));
    });
});
