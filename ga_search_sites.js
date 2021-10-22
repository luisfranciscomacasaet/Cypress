/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-describe */
/* eslint-disable func-style */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
describe(
	'Searching a GA site',
	{
		env: {
			gaSiteName: Cypress.env('siteName'),
			gaSitePropertyName: Cypress.env('sitePropertyName'),
			gaSitePropertyId: Cypress.env('sitePropertyId')
		}
	},
	() => {
		before(() => {
			cy.login();
			cy.visit('/addons');
			cy.get('a[href^="/addons/google-analytics/integration"]').click();
		});
		it('Searches by SITE NAME', () => {
			cy.get('input[class="search__input"][placeholder]').type(`${Cypress.env('gaSiteName')}`)
			.then((propValue) => {
				cy.wrap(propValue).invoke('prop', '_value').should('eq',`${Cypress.env('gaSiteName')}`);
			});
			cy.wait(1000);
			cy.get('div.connected-sites > div:nth-child(2)').invoke('prop','innerText').then((val) => {
				if (val === 'Sorry, no sites or accounts were found.') {
					cy.log(val);
				} else {
					cy.get('ul.accordion > li:nth-child(1) table.table tbody tr').each(($val) => {
						cy.wrap($val).invoke('prop', 'innerText')
						.then((val) => {
							expect(val).to.contain(`${Cypress.env('gaSiteName')}`);
						});
					});
				}
			});
		});
		it('Searches by Property', () => {
			cy.get('input[class="search__input"][placeholder]').clear().type(`${Cypress.env('gaSitePropertyName')}`)
			.then((propValue) => {
				cy.wrap(propValue).invoke('prop', '_value').should('eq',`${Cypress.env('gaSitePropertyName')}`);
			});
			cy.wait(1000);
			cy.get('div.connected-sites > div:nth-child(2)').invoke('prop','innerText').then((val) => {
				if (val === 'Sorry, no sites or accounts were found.') {
					cy.log(val);
				} else {
					cy.get('ul.accordion > li:nth-child(1) table.table tbody tr').each(($val) => {
						cy.wrap($val).invoke('prop', 'innerText')
						.then((val) => {
							expect(val).to.contain(`${Cypress.env('gaSitePropertyName')}`);
						});
					});
				}
			});
		});
		it('Searches by Property ID', () => {
			cy.get('input[class="search__input"][placeholder]').clear().type(`${Cypress.env('gaSitePropertyId')}`)
			.then((propValue) => {
				cy.wrap(propValue).invoke('prop', '_value').should('eq',`${Cypress.env('gaSitePropertyId')}`);
			});
			cy.wait(1000);
			cy.get('div.connected-sites > div:nth-child(2)').invoke('prop','innerText').then((val) => {
				if (val === 'Sorry, no sites or accounts were found.') {
					cy.log(val);
				} else {
					cy.get('ul.accordion > li:nth-child(1) table.table tbody tr').each(($val) => {
						cy.wrap($val).invoke('prop', 'innerText')
						.then((val) => {
							expect(val).to.contain(`${Cypress.env('gaSitePropertyId')}`);
						});
					});
				}
			});
		});
		it('Empty search result checking', () => {
			cy.get('input[class="search__input"][placeholder]').clear().type('Searching site that does not exist')
			.then((propValue) => {
				cy.wrap(propValue).invoke('prop', '_value').should('eq','Searching site that does not exist');
			});
			cy.wait(1000);
			cy.get('div[class="--tight empty"]').should('be.visible');
		});
	});
