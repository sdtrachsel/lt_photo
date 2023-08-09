describe('Album page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums', {
      statusCode: 200,
      fixture: 'albums.json'
    })
      .as('getAlbums')

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos?albumId=5', {
      statusCode: 200,
      fixture: 'album.json',
    })
      .as('getAlbum')

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos/202', {
      statusCode: 200,
      fixture: 'photo.json',
      delayMs: 100
    })
      .as('getPhoto')

    cy.visit('http://localhost:3000/');
    cy.wait('@getAlbums')
    cy.getBySel('album-link').eq(4).click()
    cy.getBySel('photo-link').eq(1).click()
  });

  it('Should have a url matching the photo', () => {
    cy.wait('@getPhoto')
    cy.url().should('include', '/photo/202')
  });

  it('should display the header with logo link', () => {
    cy.wait('@getPhoto')
    cy.getBySel('hdr').should('be.visible')
    cy.getBySel('hdr-link').should('have.attr', 'href', '/')
    cy.getBySel('logo').should('have.attr', 'alt', 'logo')
  });

  it('should display the photo id', () => {
    cy.wait('@getPhoto')
    cy.getBySel('photo-id').should('have.text', '202')
  });

  it('should display the photo title', () => {
    cy.wait('@getPhoto')
    cy.getBySel('photo-title').should('have.text', 'explicabo vel omnis corporis debitis qui qui')
  });

  it('should display the photo', () => {
    cy.wait('@getPhoto')
    cy.getBySel('photo-img').should('have.attr', 'alt', 'explicabo vel omnis corporis debitis qui qui')
  });

  it('should display the loading component while fetching album ', () => {
    cy.getBySel("loader").should('be.visible')
  });

  it('should display the Error component on network failure', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos/202', {
      statusCode: 500,
      body: 'An error occurred',
    }).as('getPhotoError');
    cy.visit('http://localhost:3000/photo/202');
    cy.wait('@getPhotoError');
    cy.getBySel('error-message').should('have.text', 'We are currently experiencing issues. Please try again later')
  });
});