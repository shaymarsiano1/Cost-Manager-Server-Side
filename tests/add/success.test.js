/**
 * Integration tests for successful POST /api/add.
 * Validates that a cost item is added correctly when valid input is provided.
 */

const request = require('supertest');
const app = require('../../index');

describe('Success: POST /api/add', () => {

    /**
     * Should add a new cost item successfully and return it with 201 status.
     */
    it('should add a valid cost item successfully', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                userid: 123123,
                description: "shoes",
                category: "sport",
                sum: 200,
                date: "2025-06-28"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.userid).toBe(123123);
        expect(res.body.category).toBe("sport");
    });
});