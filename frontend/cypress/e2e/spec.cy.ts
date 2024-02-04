describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createTestingUser({
      name: "Robert C. Martin",
      username: "UncleBob",
      password: "1234abcde",
    });
    cy.visitFrontend();
  });

  it("Login form is shown", function () {
    cy.contains("Login").click();
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#formUsername").type("UncleBob");
      cy.get("#formPassword").type("1234abcde");
      cy.get("#btn-login").click();
      cy.contains("Robert C. Martin logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#formUsername").type("UncleBob");
      cy.get("#formPassword").type("wrong");
      cy.get("#btn-login").click();
      cy.contains("Invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "UncleBob",
        password: "1234abcde",
      });
      /* cy.get('#formUsername').type('UncleBob')
      cy.get('#formPassword').type('1234abcde')
      cy.get('#btn-login').click() */
      // for any reason, the app can't update with direct fetch login
    });

    it("visiting users", function () {
      cy.contains("Users").click();
      cy.contains("Robert C. Martin").click();
    });

    it("A blog can be created", function () {
      // look for the blog form and fill it in
      cy.contains("New blog").click();
      cy.get("#formTitle").type("My first blog");
      cy.get("#formAuthor").type("Robert C. Martin");
      cy.get("#formURL").type(
        "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      );
      cy.get("#formLikes").type("5");
      cy.contains("Add Blog").click();

      cy.get("#notification")
        .should("contain", "A new blog My first blog by Robert C. Martin added")
        .and("have.css", "color", "rgb(0, 128, 0)");

      cy.get("#blog-list").contains("My first blog by Robert C. Martin").click();
      cy.get(".blog-content").should("contain", "My first blog");
      cy.get(".blog-content").should("contain", "Robert C. Martin")
      .and(
        "contain",
        "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        )
        .and("contain", "5");
      cy.contains("No comments");
    });

    describe("And a blog is created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "My first blog",
          author: "Robert C. Martin",
          url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
          likes: 5,
        });
        cy.visitFrontend();
        cy.get("#blog-list").contains("My first blog by Robert C. Martin").click();
      });

      it("A blog can be liked", function () {
        cy.get(".blog-content")
          .contains("My first blog")
          .parent()
          .get(".btn-like")
          .click();
        cy.get(".blog-content")
          .contains("Likes: 6");
      });

      it("A blog can be removed", function () {
        cy.get(".blog-content")
          .contains("My first blog")
          .parent()
          .get(".btn-deleteBlog")
          .click();
        cy.get("#notification")
          .should(
            "contain",
            "Blog My first blog by Robert C. Martin deleted succesfully",
          )
          .and("have.css", "color", "rgb(0, 128, 0)");
        cy.get("#blog-list").should("not.contain", "My first blog");
      });

      it("A blog don't have the button delete if it doesn't belong to the user", function () {
        cy.contains("Logout").click();
        cy.createTestingUser({
          name: "Mary Smith",
          username: "MaryS",
          password: "abcde123",
        });
        cy.login({
          username: "MaryS",
          password: "abcde123",
        });
        cy.visitFrontend();
        cy.get("#blog-list")
          .contains("My first blog")
          .parent()
          .get(".btn-deleteBlog")
          .should("not.exist");
      });
    });

    describe("And several blogs are created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "My first blog",
          author: "Robert C. Martin",
          url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/MyFirstBlog.html",
          likes: 5,
        });
        cy.createBlog({
          title: "My second blog",
          author: "Andy Hunt",
          url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/MySecondBlog.html",
          likes: 10,
        });
        cy.createBlog({
          title: "My third blog",
          author: "Mary Smith",
          url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/MyThirdBlog.html",
          likes: 15,
        });
        cy.visitFrontend();
      });

      it("Blogs are ordered by likes", function () {
        cy.get("#blog-list>div")
          .eq(0)
          .contains("My third blog").click();
        cy.get(".blog-content")
          .contains("Likes: 15");
        cy.contains("Blogs").click();

        cy.get("#blog-list>div")
          .eq(1)
          .contains("My second blog").click();
          cy.get(".blog-content")
            .contains("Likes: 10");
          cy.contains("Blogs").click();

        cy.get("#blog-list>div")
          .eq(2)
          .contains("My first blog").click();
          cy.get(".blog-content")
            .contains("Likes: 5");
          cy.contains("Blogs").click();

        cy.get("#blog-list>div").eq(1).find("a").click();
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 11");
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 12");
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 13");
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 14");
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 15");
        cy.get(".blog-content").find(".btn-like").click();
        cy.get(".blog-content")
          .should("contain", "My second blog")
          .and("contain", "Likes: 16");
        cy.contains("Blogs").click();

        cy.get("#blog-list>div")
          .eq(0)
          .contains("My second blog").click();
          cy.get(".blog-content")
            .contains("Likes: 16");
          cy.contains("Blogs").click();

        cy.get("#blog-list>div")
          .eq(1)
          .contains("My third blog").click();
        cy.get(".blog-content")
          .contains("Likes: 15");
        cy.contains("Blogs").click();

        cy.get("#blog-list>div")
          .eq(2)
          .contains("My first blog").click();
          cy.get(".blog-content")
            .contains("Likes: 5");
          cy.contains("Blogs").click();
      });
    });
  });
});
