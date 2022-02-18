describe('House E2E Login', () => {
    it ('Get login page', () => {
        cy.visit('/login');
        cy.location('protocol').should('eq', 'http:');
        cy.title().should('eq', 'Dream House');
    });

    it ('Should have animation and letters', () => {
        cy.get('[data-cy="login"]').should('have.class', 'login').as('login');
        cy.get('@login').find('li').should('have.length', 40);
        cy.get('@login').dblclick();
    });

    it ('Should have modal', () => {
        cy.get('[data-cy="modal"]').should('have.class', 'modal').as('modal');
        cy.get('@modal').click();
    });

    it ('Should logIn', () => {
        cy.get('[data-cy="modal"] input[type=text]').type(Cypress.env('email'));
        cy.get('[data-cy="modal"] input[type=password]').type(Cypress.env('pass'));
        cy.get('[data-cy="modal-login"]').click();
        cy.url().should('include', '/dashboard');
    });
})

describe('House E2E Dashboard', () => {
    it ('Get dashboard page', () => {
        cy.visit('/dashboard');
        cy.location('protocol').should('eq', 'http:');
        cy.title().should('eq', 'Dream House');
    });

    it ('Should have logo and user name', () => {
        cy.get('[data-cy="header"] .header__logo a').should('have.text', 'Dream House');
        cy.get('[data-cy="header"] .header__content > span').should('have.text', 'David');
    });

    it ('Should create a new entry', () => {
        cy.get('[data-cy="form"]').as('form').should('have.class', 'dashboard__form');
        cy.get('@form').find('#house-2').click();
        cy.get('@form').find('input[name=product]').type('New product');
        cy.get('@form').find('input[name=count]').type('20');
        cy.get('@form').find('input[name=price]').type('30');
        cy.get('@form').children('button').click();
    });
    
    it ('Should change total', () => {
        cy.contains('[data-cy="total"]', '60');
    });

    it ('Should remove an entry', () => {
        cy.get('[data-cy="dashboard-content"]').first().as('DashboardContent');
        cy.get('@DashboardContent').find('ul:last-child() button').click();
        
        cy.get('[data-cy="modal-confirm"]').as('modal');
        cy.get('@modal').should('exist');
        cy.get('@modal').find('button:first-of-type()').click();
    });

    it ('Should change total', () => {
        cy.contains('[data-cy="total"]', '30');
    });

    it ('Should logOut', () => {
        cy.get('[data-cy="header"]').contains('Logout').as('Logout');
        cy.get('@Logout').click();
    });
});