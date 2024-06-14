describe('Issue comments creating, editing and deleting', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`);
        cy.visit(`${Cypress.env('baseUrl')}project/board`);
        cy.contains('This is an issue of type: Task.').click();
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const editedComment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').first().within(() => {
                cy.contains('Edit').click().should('not.exist');
            });

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain.value', previousComment)
                .clear()
                .type(editedComment);

            cy.contains('button', 'Save').click().should('not.exist');
            cy.get('[data-testid="issue-comment"]').first().should('contain', editedComment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').first().within(() => {
                cy.contains('Delete').click();
            });
        });

        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('button', 'Delete comment').click().should('not.exist');
        });

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').should('not.exist');
        });
    });

});
