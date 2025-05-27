/**
 * Validation tests for POST /api/add.
 * Ensures that the server properly handles missing or invalid input fields.
 */

const request = require('supertest');
const app = require('../../index');

describe('Validation: POST /api/add', () => {

    /**
     * Should return 400 when the 'description' field is missing.
     */
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

    /**
     * Should return 400 when the 'sum' field is missing.
     */
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

    /**
     * Should return 500 when the 'category' is invalid (not among predefined ones).
     * Note: This assumes the server validates categories; otherwise remove or adjust test.
     */
    it('should return 500 if category is invalid', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                description: "flight",
                category: "travel", // Invalid category
                sum: 400
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toMatch(/\/api\/add/);
    });
});
