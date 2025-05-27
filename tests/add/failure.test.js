/**
 * Integration tests for POST /api/add endpoint.
 * Verifies behavior when submitting cost data, including error handling for invalid users.
 */

const request = require('supertest');
const app = require('../../index');

describe('User: POST /api/add', () => {

    /**
     * Should return 404 if the user ID does not exist in the database.
     */
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
