import {Mock} from "@/mock";
import {faker} from "@faker-js/faker";

faker.seed(42);

export const user = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    registeredAt: faker.date.birthdate(),
    email: faker.internet.email(),
});

export const mock = () => {
    const mock = Mock.Handler.initialize();

    mock.use((server) => server.get("/users", () =>
        new Mock.Response(200, {}, JSON.stringify(Array.from(Array(10), user)))));
    mock.use((server) => server.delete("/users/:id", () =>
        new Mock.Response(204)));
    mock.use((server) => server.put("/users", (_, request) =>
        new Mock.Response(201, {}, JSON.stringify({...JSON.parse(request.requestBody), id: faker.string.uuid()}))));
    mock.use((server) => server.post("/users/:id", (_, request) =>
        new Mock.Response(200, {}, request.requestBody)));

    return mock;
};
