describe('Album', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums', {
      statusCode: 200,
      fixture: 'albums.json'
    })
      .as('getAlbums');

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos?albumId=5', {
      statusCode: 200,
      fixture: 'album.json',
      delayMs: 100
    })
      .as('getAlbum');

    cy.visit('http://localhost:3000/');
    cy.wait('@getAlbums')
    cy.getBySel('album-link').as('links')
    cy.get('@links').eq(4).click()

  });

  it('Should have a url matching the album', () => {
    cy.wait('@getAlbum')
    cy.url().should('include', '/album/5');
  })

  it('should display the header with logo link', () => {
    cy.wait('@getAlbum')
    cy.getBySel('hdr').should('be.visible')
    cy.getBySel('hdr-link').should('have.attr', 'href', '/')
    cy.getBySel('logo').should('have.attr', 'alt', 'logo')
  });

  it('Should display the album id', () => {
    cy.wait('@getAlbum')
    cy.getBySel('album-header').should('have.text', "Album 5")
  })

  it('Should display the album photo titles', () => {
    cy.wait('@getAlbum')
    cy.getBySel('photo-title').as('titles')
    cy.get('@titles').should('have.length', 9)
    cy.get('@titles').first().should('have.text', "nesciunt dolorum consequatur ullam tempore accusamus debitis sit")
    cy.get('@titles').last().should('have.text', "voluptatibus sit amet vel natus qui voluptatem")
  })

  it('Should display the album photo ids', () => {
    cy.wait('@getAlbum')
    cy.getBySel('photo-id').as('ids')
    cy.get('@ids').should('have.length', 9)
    cy.get('@ids').first().should('have.text', "201")
    cy.get('@ids').last().should('have.text', "209")
  })

  it('Should display the album photo thumnails', () => {
    cy.wait('@getAlbum')
    cy.getBySel('photo-thumb').as('thumbnails')
    cy.get('@thumbnails').should('have.length', 9)
    cy.get('@thumbnails').first().should('have.attr', 'alt', 'nesciunt dolorum consequatur ullam tempore accusamus debitis sit')
    cy.get('@thumbnails').last().should('have.attr', 'alt', "voluptatibus sit amet vel natus qui voluptatem")
  })

  it('Should link the photos to the correct photo page', () => {
    cy.wait('@getAlbum')
    cy.getBySel('photo-link').as('links')
    cy.get('@links').first().should('have.attr', 'href', '/photo/201')
    cy.get('@links').last().should('have.attr', 'href', '/photo/209')
  })

  it('should display a search bar', () => {
    cy.wait('@getAlbum')
    cy.getBySel('search-label').should('contain', "Search:")
    cy.getBySel('search-bar').should('have.attr', 'placeholder', 'Search by Photo Title or ID')
  })

  it('should allow a user to search by photo id', () => {
    cy.wait('@getAlbum')
    cy.getBySel('search-bar').type('207')
    cy.getBySel('photo-id').as('ids')
    cy.get('@ids').should('have.length', 1)
    cy.get('@ids').first().should('have.text', "207")
  })

  it('should allow a user to search by photo title', () => {
    cy.wait('@getAlbum')
    cy.getBySel('search-bar').type('fugiat est ut ab sit et tempora')
    cy.getBySel('photo-title').as('titles')
    cy.get('@titles').should('have.length', 1)
    cy.get('@titles').first().should('have.text', "fugiat est ut ab sit et tempora")
  });

  it('should display the loading component while fetching album ', () => {
    cy.getBySel("loader").should('be.visible')
  });

  it('should display the Error component on network failure', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos?albumId=5', {
      statusCode: 500,
      body: 'An error occurred', 
    }).as('getAlbumError');
    cy.visit('http://localhost:3000/album/5');
    cy.wait('@getAlbumError');
    cy.getBySel('error-message').should('be.visible')
  });
});