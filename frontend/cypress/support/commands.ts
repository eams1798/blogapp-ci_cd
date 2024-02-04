import { IBlog } from "../../src/interfaces/blog";
import { signUpCredentials } from "../../src/interfaces/login";

Cypress.Commands.add(
  "requestBackend",
  function (path: string, method: string, body?: object, needAuth?: boolean) {
    const user = localStorage.getItem("loggedBlogAppUser");
    const token = user ? JSON.parse(user).token : "";

    return cy.request({
      url: `http://localhost:3001/api${path}`,
      method,
      body,
      headers: {
        Authorization: needAuth ? `Bearer ${token}` : "",
      },
    });
  },
);

Cypress.Commands.add("visitFrontend", function () {
  return cy.visit("http://localhost:3001");
});

Cypress.Commands.add(
  "login",
  function ({ username, password }: { username: string; password: string }) {
    return cy
      .requestBackend("/login", "POST", { username, password })
      .then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body),
        );
        cy.visitFrontend();
      });
  },
);

Cypress.Commands.add("createBlog", function (blogContent: IBlog) {
  return cy.requestBackend("/blogs", "POST", blogContent, true);
});

Cypress.Commands.add(
  "createTestingUser",
  function (data: { name: string; username: string; password: string }) {
    return cy.requestBackend("/users", "POST", data);
  },
);

Cypress.Commands.add("resetDatabase", function () {
  return cy.requestBackend("/testing/reset", "DELETE");
});
