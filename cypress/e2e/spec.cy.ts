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
  });

  afterEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it('modal', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').click()
    cy.get('#modal .text.text_type_main-large').should('have.text', 'Детали ингредиента')
    cy.get('[data-testid=ingredient_name]').should('have.text', 'Краторная булка N-200i')

    cy.get('#modal svg').click()
    cy.get('#modal').should('have.html', '')
  })

  it('drag', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').trigger('dragstart')
    cy.get('[data-testid=constructor_top]').trigger('drop')
    cy.get('[data-testid=constructor_top]').should('contain.html', 'constructor-element__image')
    cy.get('[data-testid=constructor_bottom]').should('contain.html', 'constructor-element__image')
    
    cy.get('.listElement:nth-child(2) ul a:nth-child(1)').trigger('dragstart')
    cy.get('[data-testid=constructor_middle]').trigger('drop')
    cy.get('[data-testid=constructor_middle] [data-testid=dropped_item]:nth-child(1)').should('exist')
    
    cy.get('.listElement:nth-child(3) ul a:nth-child(1)').trigger('dragstart')
    cy.get('[data-testid=constructor_middle]').trigger('drop')
    cy.get('[data-testid=constructor_middle] [data-testid=dropped_item]:nth-child(2)').should('exist')
  })

  it('order', () => {
    cy.get('.listElement:nth-child(1) ul a:nth-child(1)').trigger('dragstart')
    cy.get('[data-testid=constructor_top]').trigger('drop')
    cy.get('[data-testid=constructor_top]').should('contain.html', 'constructor-element__image')
    cy.get('[data-testid=constructor_bottom]').should('contain.html', 'constructor-element__image')

    cy.get('.BurgerConstructor_order__M9EAb').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login')
    })

    cy.get('[data-testid=email_input]').type(`${email}{enter}`)
    cy.get('[data-testid=password_input]').type(`${password}{enter}`)
    cy.get('[data-testid=submit_button]').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    cy.get('[data-testid=order_button]').click()

    cy.get("[data-testid=order-number]").contains("123").should("exist");
  })
})