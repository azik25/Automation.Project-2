describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]')
      .trigger('click');
    
    cy.get('.ql-editor').type('My bug description');

    cy.get('input[name="title"]').type('Bug');

    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Highest"]')
      
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Pickle Rick"]').click();

    cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    
    cy.get('[data-testid="list-issue"]')
      .should('have.length', '5')
      .first()
      .find('p')
      .contains('Bug');
      
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
  
  it('Creating a new issue using the random data plugin.', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').click();
  })
  })
  
  
  
  
  
  it('Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Task"]')
      .trigger('click');
    
    cy.get('.ql-editor').type('Random bug');

    cy.get('input[name="title"]').type('Random title');

    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]')
      
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Boby Yoda"]').click();

    cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    
    cy.get('[data-testid="list-issue"]')
      .should('have.length', '5')
      .first()
      .find('p')
      .contains('Bug');
      
    cy.get('[data-testid="avatar:Boby Yoda"]').should('be.visible');
    cy.get('[data-testid="icon:Task"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
  
  it('Creating a new issue using the random data plugin.', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('[data-testid="select:type"]').click();
  })
  })
  
});

