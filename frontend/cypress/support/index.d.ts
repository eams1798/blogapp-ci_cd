import { IBlog } from "../../src/interfaces/blog";

declare namespace Cypress {
  interface Chainable {
    requestBackend(
      path: string,
      method: string,
      body?: object,
      needAuth?: boolean,
    ): Chainable<Cypress.Response<any>>;
    visitFrontend(): void;
    login(credentials: { username: string; password: string }): void;
    createBlog(blogContent: IBlog): void;
    createTestingUser(data: {
      name: string;
      username: string;
      password: string;
    }): void;
    resetDatabase(): void;
  }
}
