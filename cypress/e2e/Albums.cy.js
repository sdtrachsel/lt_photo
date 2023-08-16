describe('Albums/Landing Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums', {
      statusCode: 200,
      fixture: 'albums.json'
    })
      .as('getAlbums');
    cy.visit('http://localhost:3000/');
    cy.wait('@getAlbums')
  });

  it('should display the header with logo link', () => {
    cy.getBySel('hdr').should('be.visible')
    cy.getBySel('hdr-link').should('have.attr', 'href', '/')
    cy.getBySel('logo').should('have.attr', 'alt', 'logo')
  });

  it('should display a list of album titles', () => {
    cy.getBySel('album-title').as('titles')
    cy.get('@titles').should('have.length', 10)
    cy.get('@titles').first().should('have.text', 'quidem molestiae enim')
    cy.get('@titles').last().should('have.text', 'distinctio laborum qui')
  });

  it('should display a list of album ids', () => {
    cy.getBySel('album-id').as('ids')
    cy.get('@ids').should('have.length', 10)
    cy.get('@ids').first().should('have.text', '1')
    cy.get('@ids').last().should('have.text', '10')
  });

  it('Should link the albums to the correct album page', () => {
    cy.getBySel('album-link').as('links')
    cy.get('@links').first().should('have.attr', 'href', '/album/1')
    cy.get('@links').last().should('have.attr', 'href', '/album/10')
  });

  it('should display a search bar', () => {
    cy.getBySel('search-label').should('contain', "Search:")
    cy.getBySel('search-bar').should('have.attr', 'placeholder', 'Search by Album Title or ID')
  });

  it('should allow a user to search by album id', () => {
    cy.getBySel('search-bar').type('2')
    cy.getBySel('album-id').as('ids')
    cy.get('@ids').should('have.length', 1)
    cy.get('@ids').first().should('have.text', "2")
  });

  it('should allow a user to search by album title', () => {
    cy.getBySel('search-bar').type('enim')
    cy.getBySel('album-title').as('titles')
    cy.get('@titles').should('have.length', 2)
    cy.get('@titles').first().should('have.text', 'quidem molestiae enim')
    cy.get('@titles').last().should('have.text', 'enim impedit quibusdam illo est')
  });

  it('should display the loading component while fetching photo', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums', {
      statusCode: 200,
      fixture: 'albums.json',
      delayMs: 100
    })
      .as('getAlbums');
    cy.visit('http://localhost:3000/');
    cy.getBySel('loader').should('be.visible')
  });

  it('should display the Error component on network failure', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums', {
      statusCode: 500,
      body: 'An error occurred',
    }).as('getAlbumError');
    cy.visit('http://localhost:3000/');
    cy.wait('@getAlbumError');
    cy.getBySel('error-message').should('be.visible')
  });
});