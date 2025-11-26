describe('Portfolio smoke tests', () => {
  it('renders the home page and navigates via CTAs', () => {
    cy.visit('/');

    cy.contains(/welcome to my portfolio/i).should('be.visible');
    cy.contains(/Jaehyeok \(Eddie\) Lee/i).should('be.visible');

    cy.contains(/learn about me/i).click();
    cy.url().should('include', '/about');

    cy.go('back');
    cy.contains(/view my projects/i).click();
    cy.url().should('include', '/project');
  });

  it('submits the contact form (API stubbed)', () => {
    cy.intercept('POST', '**/contacts', {
      statusCode: 201,
      body: {
        _id: 'test-id',
        firstName: 'Cypress',
        lastName: 'Test',
        email: 'cypress@example.com',
        subject: 'Hello',
        message: 'Test message from Cypress',
        createdAt: new Date().toISOString(),
      },
    }).as('createContact');

    cy.visit('/contact');

    cy.get('input[name="firstName"]').type('Cypress');
    cy.get('input[name="lastName"]').type('Tester');
    cy.get('input[name="email"]').type('cypress@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="subject"]').type('Hello');
    cy.get('textarea[name="message"]').type('Testing contact flow');

    cy.contains('button', /send message/i).click();
    cy.wait('@createContact');

    cy.contains(/thank you/i).should('be.visible');
  });
});
