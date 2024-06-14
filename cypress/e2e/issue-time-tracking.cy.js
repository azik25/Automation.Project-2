describe('Time tracking functionality', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`);
        cy.visit(`${Cypress.env('baseUrl')}project/board`);
        cy.contains('This is an issue of type: Task.').click();
    
    });
    

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should add estimation successfully', () => {
        const estimation = '8';

        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]').first().type(estimation);
            cy.contains('button', 'Done').should('be.visible').click();
            cy.contains('8h estimated').should('be.visible');
        });
    });

    it('Should edit estimation successfully', () => {
        const newEstimation = '10';

        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]').first().clear().type(newEstimation);
            cy.contains('button', 'Done').click();
            cy.contains('10h estimated').should('be.visible');
        });
    });

    it('Should remove estimation successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]').first().clear();
            cy.contains('button', 'Done').click();
            cy.contains('h estimated').should('not.exist');
        });
    });

    it('Should log time successfully', () => {
        const loggedTime = '4';

        getIssueDetailsModal().within(() => {
            cy.contains('Time tracking').click();
            cy.get('input[placeholder="Time spent (hours)"]').type(loggedTime);
            cy.contains('button', 'Done').click();
            cy.contains('4h logged').should('be.visible');
        });
    });

    it('Should edit logged time successfully', () => {
        const editedTime = '6';

        getIssueDetailsModal().within(() => {
            cy.contains('4h logged').click();
            cy.get('input[placeholder="Time spent (hours)"]').clear().type(editedTime);
            cy.contains('button', 'Done').click();
            cy.contains('6h logged').should('be.visible');
        });
    });

    it('Should delete logged time successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.contains('6h logged').click();
            cy.get('input[placeholder="Time spent (hours)"]').clear();
            cy.contains('button', 'Done').click();
            cy.contains('h logged').should('not.exist');
        });
    });

});
