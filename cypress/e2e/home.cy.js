describe("galaxy hub app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should load the homepage", () => {
    cy.contains("Galaxy Hub");
    cy.contains("Characters");
    cy.contains("Planets");
    cy.contains("Starships");
  });
});
