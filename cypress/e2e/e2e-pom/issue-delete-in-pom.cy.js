/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board')
        
        cy.contains('This is an issue of type: Task.').click()
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    });
  });

  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[data-testid="icon:trash"]').click()
    })

        cy.get('[data-testid="modal:confirm"]').should('be.visible').within(() => {
        cy.get('button').eq(0).should('have.text', 'Delete issue').click()
    })
    
        cy.get('[data-testid="modal:modal:confirm"]').should('not.exist')
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
        .should('have.length', '3')
        .and('not.contain', 'This is an issue of type: Task.')
    });
  });

  it('Should cancel deletion process successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[data-testid="icon:trash"]').click()
  })
        cy.get('[data-testid="modal:confirm"]').within(() => {
        cy.get('button').eq(1).contains('button', 'Cancel').click()
  })
        cy.get('[data-testid="modal:confirm"]').should('not.exist')
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[data-testid="icon:close"]').eq(0).click()
  })
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
        .should('have.length', '4')
        .contains('This is an issue of type: Task.')
  })
  })
})
