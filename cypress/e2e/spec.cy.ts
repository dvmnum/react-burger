Cypress.Commands.add('have_text', (sel, text) => {
  cy.get(sel).should('have.text', text)
})

Cypress.Commands.add('contain_html', (sel, html) => {
  cy.get(sel).should('contain.html', html)
})

Cypress.Commands.add('loc', (location) => {
  cy.location().should((loc) => {
    expect(loc.hash).to.eq(location)
  })
})

describe('template spec', () => {
  let email = 'dvmnumlol@yandex.ru'
  let password = '1407'

  beforeEach(() => {
    cy.visit('/')
    
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
  
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')

    cy.get('[data-testid=constructor_top]').as('top')
    cy.get('[data-testid=constructor_middle]').as('middle')
    cy.get('[data-testid=constructor_bottom]').as('bottom')
  });

  afterEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it('modal', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').click()
    cy.have_text('#modal .text.text_type_main-large', 'Детали ингредиента')
    cy.have_text('[data-testid=ingredient_name]', 'Краторная булка N-200i')

    cy.get('#modal svg').click()
    cy.get('#modal').should('have.html', '')
  })

  it('drag', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').trigger('dragstart')
    cy.get('@top').trigger('drop')
    cy.contain_html('@top', 'constructor-element__image')
    cy.contain_html('@bottom', 'constructor-element__image')
    
    cy.get('.listElement:nth-child(2) ul a:nth-child(1)').trigger('dragstart')
    cy.get('@middle').trigger('drop')
    cy.get('@middle').get('[data-testid=dropped_item]:nth-child(1)').should('exist')
    
    cy.get('.listElement:nth-child(3) ul a:nth-child(1)').trigger('dragstart')
    cy.get('@middle').trigger('drop')
    cy.get('@middle').get('[data-testid=dropped_item]:nth-child(2)').should('exist')
  })

  it('order', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').trigger('dragstart')
    cy.get('@top').trigger('drop')
    cy.contain_html('@top', 'constructor-element__image')
    cy.contain_html('@bottom', 'constructor-element__image')

    cy.get('[data-testid=order_button]').click()

    cy.loc('#/login')

    cy.get('[data-testid=email_input]').type(`${email}{enter}`)
    cy.get('[data-testid=password_input]').type(`${password}{enter}`)
    cy.get('[data-testid=submit_button]').click()

    cy.loc('#/')

    cy.get('[data-testid=order_button]').click()

    cy.get("[data-testid=order-number]").contains("123").should("exist");
  })
})