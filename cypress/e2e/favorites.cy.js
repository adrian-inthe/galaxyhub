describe("galaxy hub app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should add a favorite that persists across reloads until its deleted", () => {
    cy.intercept("GET", "**/swapi.dev/api/**").as("getResource");

    cy.contains("Characters").click();
    cy.wait("@getResource");
    cy.get("table[role='table'] .p-datatable-tbody tr td")
      .first()
      .invoke("text")
      .as("resourceNameInList");

    cy.get("table[role='table'] .pi-star").first().click();
    cy.get("table[role='table']").should("have.length", 2);
    cy.contains("My Favorite");

    cy.get("@resourceNameInList").then((text) => {
      cy.get("table[role='table']")
        .first()
        .find(".p-datatable-tbody tr td")
        .first()
        .should("contain.text", text);
    });

    cy.reload();
    cy.get("table[role='table']").should("have.length", 1);
    cy.contains("My Favorite");

    cy.get("@resourceNameInList").then((text) => {
      cy.get("table[role='table']")
        .first()
        .find(".p-datatable-tbody tr td")
        .first()
        .should("contain.text", text);
    });

    cy.get("table[role='table'] .pi-star-fill").first().click();
    cy.contains("My Favorite").should("not.exist");
    cy.get("table[role='table']").should("have.length", 0);

    cy.reload();
    cy.contains("My Favorite").should("not.exist");
    cy.get("table[role='table']").should("have.length", 0);
  });
});
