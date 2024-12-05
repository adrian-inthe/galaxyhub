describe("galaxy hub app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should load the characters resource", () => {
    cy.intercept("GET", "**/people*").as("getResource");
    cy.contains("Characters").click();
    cy.wait("@getResource")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get("table[role='table']").should("have.length", 1);
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("contain", "Luke");
  });

  it("should load the planets resource", () => {
    cy.intercept("GET", "**/planets*").as("getResource");
    cy.contains("Planets").click();
    cy.wait("@getResource")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get("table[role='table']").should("have.length", 1);
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("contain", "Tatooine");
  });

  it("should load the starships resource", () => {
    cy.intercept("GET", "**/starships*").as("getResource");
    cy.contains("Starships").click();
    cy.wait("@getResource")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.get("table[role='table']").should("have.length", 1);
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("contain", "CR90");
  });

  it("should switch between resources lists", () => {
    cy.intercept("GET", "**/swapi.dev/api/**").as("getResource");
    cy.contains("Characters").click();
    cy.wait("@getResource");
    cy.get(".p-card-caption")
      .should("have.length", 4)
      .last()
      .should("have.text", "characters");

    cy.contains("Planets").click();
    cy.wait("@getResource");
    cy.get(".p-card-caption")
      .should("have.length", 4)
      .last()
      .should("have.text", "planets");

    cy.contains("Starships").click();
    cy.wait("@getResource");
    cy.get(".p-card-caption")
      .should("have.length", 4)
      .last()
      .should("have.text", "starships");
  });

  it("should load list from cache the second time", () => {
    cy.intercept("GET", "**/swapi.dev/api/**").as("getResource");
    cy.contains("Characters").click();
    cy.wait("@getResource");
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("contain", "Luke");

    cy.contains("Planets").click();
    cy.wait("@getResource");
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("not.contain", "Luke");

    cy.contains("Characters").click();
    cy.get("table[role='table'] .p-datatable-tbody tr")
      .should("have.length", 10)
      .first()
      .should("contain", "Luke");

    cy.get("@getResource.all").should("have.length", 2);
  });
});
