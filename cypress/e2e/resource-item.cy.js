describe("galaxy hub app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should load item details", () => {
    cy.intercept("GET", "**/swapi.dev/api/**").as("getResource");
    cy.contains("Characters").click();
    cy.wait("@getResource");
    cy.get("table[role='table'] .p-button-label")
      .first()
      .should("contain", "More")
      .click();
    cy.wait("@getResource");
    cy.get(".p-dialog-header").should("contain", "Details for");
  });

  it("should load item details from cache the second time", () => {
    cy.contains("Characters").click();
    cy.get("table[role='table'] .p-button-label")
      .first()
      .should("contain", "More")
      .click();
    cy.get(".p-dialog-header").should("contain", "Details for");
    cy.get(".p-progressspinner", { timeout: 10000 }).should("not.exist");
    cy.contains("Close").click();

    cy.intercept("GET", "**/swapi.dev/api/**").as("getResource");
    cy.get(".p-dialog-header").should("not.exist");
    cy.get("table[role='table'] .p-button-label")
      .first()
      .should("contain", "More")
      .click();
    cy.get(".p-dialog-header").should("contain", "Details for");
    cy.get("@getResource.all").should("have.length", 0);
  });
});
