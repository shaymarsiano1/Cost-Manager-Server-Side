/**
 * Failure tests for GET /api/users/:id.
 * Verifies error handling when the user does not exist or the ID is invalid.
 */

const request = require('supertest');
const app = require('../../index');

describe('Failure: GET /api/users/:id', () => {

    /**
     * Should return 404 when a user with the given ID does not exist.
     */
    it('should return 404 if user does not exist', async () => {
        const res = await request(app).get('/api/users/999999');

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toMatch(/\/api\/users\/999999/);
    });

    /**
     * Should return 500 when the provided ID is not a valid number.
     */
    it('should return 500 if id is not a number', async () => {
        const res = await request(app).get('/api/users/abc');

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toMatch(/\/api\/users\/abc/);
    });
});
