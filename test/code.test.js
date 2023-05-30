import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const request = require("supertest");
const firstTest = require("./../routes/index.ts");
const {
    describe
} = require("node:test");
describe('POST /login', () => {
    describe('given username and password', () => {
        // should save name , email , password in database


        // ? should respond a json object contain the user email
        test('should respond a json object contain the user name', async () => {
            const response = await request(firstTest).post('/api/auth/login').send({
                name: 'name',
                email: 'email@gamil.com',
                password: 'password '
            });
            expect(response.body.data.name).toBeDefined();
        });
        test('should respond a json object contain the user email', async () => {
            const response = await request(firstTest).post('/api/auth/login').send({
                name: 'name',
                email: 'email@gamil.com',
                password: 'password '
            });
            expect(response.body.data.email).toBeDefined();
        });
        test('should respond a json object contain the user password', async () => {
            const response = await request(firstTest).post('/api/auth/login').send({
                name: 'name',
                email: 'email@gamil.com',
                password: 'password '
            });
            expect(response.body.data.password).toBeDefined();
        });

        // ? should respond a 200 status code
        test('should respond a 200 status code', async () => {
            const response = await request(firstTest).post('/api/auth/login').send({
                name: 'name',
                email: 'email@gamil.com',
                password: 'password '
            });
            expect(response.data.status).toBe(200);
        });

        // ? should specify json in the content type hedare 
        test('should specify json in the content type hedare ', async () => {
            const response = await request(firstTest).post('/api/auth/login').send({
                name: 'name',
                email: 'email@gamil.com',
                password: 'password '
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('when the username and password is missing', () => {
        it('', () => {
            // ? should responde whit a status code 400 
            test('should respond whit a status code 400 when name , email or password missing', async () => {
                const response = await request(firstTest).post('/api/auth/login').send({
                    // name: 'name',
                    email: 'email@gamil.com',
                    password: 'password '
                });
                expect(response.body.data.status).toBe(400);
            });
        });
        it('', () => {
            // ? should responde whit a status code 400 
            test('should respond whit a status code 400 when name , email or password missing', async () => {
                const response = await request(firstTest).post('/api/auth/login').send({
                    name: 'name',
                    // email: 'email@gamil.com',
                    password: 'password '
                });
                expect(response.body.data.status).toBe(400);
            });
        });
        it('', () => {
            // ? should responde whit a status code 400 
            test('should respond whit a status code 400 when name , email or password missing', async () => {
                const response = await request(firstTest).post('/api/auth/login').send({
                    name: 'name',
                    email: 'email@gamil.com',
                    // password: 'password '
                });
                expect(response.body.data.status).toBe(400);
            });
        });
    });
});