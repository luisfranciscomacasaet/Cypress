/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
/* eslint-disable jest/valid-describe */

/**************

 Prerequisites:
 * Satisfies suite-level config.
 * Assume a user with an MPU subbscription on a user site and an organiztion site.

 **************/
 const config = {
	uname: Cypress.env('user').email,
	mpuSiteName: Cypress.env('pauseMpuSiteName'),
	mpuSitePath: Cypress.env('mpuSitePath'),
	year: '21',
	mpuOrganizationSiteName: Cypress.env('organizationSiteName'),
	orgName: Cypress.env('organizationName')
};
import { dateselector } from '../../../../../shared/app/main/addons/manage_plugin_updates/pause_site_datepicker.js';
describe('Pause MPU site level UI Checking', {
	env: { config }
},
() => {
	before(() => {
		cy.login();
		cy.visit(`${Cypress.env('mpuSitePath')}`);
	});
	it('Check pause MPU UI site level', () => {
		const PluginUpdatesDescription = 'When plugin updates are active, we’ll update your plugins for you. You can also temporarily pause plugin updates by toggling them to paused. We’ll resume updates beginning on your selected date.';
		cy.get('div.plugin-updates div h3', { timeout: 10000 }).should('contain.text', 'Plugin updates');
		cy.get('div.plugin-updates div p', { timeout: 10000 }).should('contain.text', PluginUpdatesDescription);
		cy.get('div.plugin-updates div.switch-wrapper div.switch__control', { timeout: 10000 }).should('have.attr', 'data-off', 'PAUSED').and('have.attr', 'data-on', 'ACTIVE');
	});
});
describe('Pause MPU on user site', {
	env: { config }
},
() => {
	it('Pause user site for 1 week.', () => {
		cy.get('div.plugin-updates div.switch-wrapper input')
		.invoke('prop', 'checked')
		.then(($val) => {
			if ($val === false) {
				cy.log('MPU subscription is already paused.');
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
				cy.get('button[data-cy="settings-save-changes"]').click();
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
			} else {
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
			}
		});
		cy.get('input[data-cy="pause-plugin-update-picker"]').click();
		cy.get('div.vc-weeks').contains(dateselector()).click();
		cy.get('button[data-cy="settings-save-changes"]').click();
	});
	it('Paused user site validation', () => {
		cy.get(`a[href*="${Cypress.env('pause_mpu_site_name').replace(/\s+/g, '-').toLowerCase()}"]`).should('be.visible');
		cy.get('div[id="left-nav"] div[id="alert"]')
		.should((p) => {
			expect(p).to.contain(`${dateselector()}/${Cypress.env('year')}`);
		});
	});
});
describe('Resume User site', {
	env: {
		mpuSiteName: Cypress.env('pauseMpuSiteName')
	}
},
() => {
	it('Resume an MPU user site', () => {
		cy.get(`a[href*="${Cypress.env('pause_mpu_site_name').replace(/\s+/g, '-').toLowerCase()}"][class="button"]`).should('be.visible').click();
		cy.get('div[id="left-nav"] div[id="alert"]').should('not.exist');
	});
});
describe('Pause MPU on organization site', {
	env: { config }
},
() => {
	before(() => {
		cy.visit(`/${Cypress.env('orgName').replace(/\s+/g, '-').toLowerCase()}/${ypress.env('mpuOrganizationSiteName').replace(/\s+/g, '-').toLowerCase()}/plugins/settings`);
	});
	it('Pause user site for 1 week.', () => {
		cy.get('div.plugin-updates div.switch-wrapper input')
		.invoke('prop', 'checked')
		.then(($val) => {
			if ($val === false) {
				cy.log('MPU subscription is already paused.');
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
				cy.get('button[data-cy="settings-save-changes"]').click();
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
			} else {
				cy.get('div[data-cy="pause-mpu-toggle"]').click({ force: true });
			}
		});
		cy.get('input[name="date"]').click();
		cy.get('div.vc-weeks').contains(dateselector()).click();
		cy.get('button[data-cy="settings-save-changes"]').click();
	});
	it('Paused organization site validation', () => {
		cy.get(`a[href*="${Cypress.env('mpuOrganizationSiteName').replace(/\s+/g, '-').toLowerCase()}"]`).should('be.visible');
		cy.get('div[id="left-nav"] div[id="alert"]')
		.should((p) => {
			expect(p).to.contain(`${dateselector()}/${Cypress.env('year')}`);
		});
	});
});
describe('Resume organization site', {
	env: { config }
},
() => {
	it('Resume an MPU organization site', () => {
		cy.get(`a[href*="${Cypress.env('mpuOrganizationSiteName').replace(/\s+/g, '-').toLowerCase()}"][class="button"]`).should('be.visible').click();
		cy.get('div[id="left-nav"] div[id="alert"]').should('not.exist');
	});
});
