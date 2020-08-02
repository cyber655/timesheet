// https://docs.cypress.io/api/introduction/api.html

describe("Cypress test insert timesheet data entry", () => {
  it("Try to insert valid data", () => {
    let projectTitle = "Test_Project";
    cy.visit("/");
    cy.get("[data-cy=project-title]").type(projectTitle);
    cy.get("[data-cy=start-time]").type("10:00");
    cy.get("[data-cy=end-time]").type("18:00");
    cy.get("[data-cy=description]").type("Working test");
    cy.get("[data-cy=add-or-edit-entry]").click();
    cy.get("[data-cy=time-table]")
      .children("tbody")
      .should(users => {
        expect(users[0].innerText).to.have.string(projectTitle);
      });
  });
});
