steal(
	'mad/view'
).then(function () {

		/*
		 * @class mad.view.component.ButtonDropdown
		 * @inherits mad.view.View
		 */
		mad.view.View.extend('mad.view.component.ButtonDropdown', /** @static */ {

			'defaults': {
				/**
				 * main clickable element.
				 */
				button: null,
				/**
				 * wrapper element (wrapper).
				 */
				wrapper: null
			}

		}, /** @prototype */ {

			'init': function (el, options) {
				// Construct parent.
				this._super(el, options);

				// Init elements.
				this.options.button = this.element;
				this.options.wrapper = this.options.button.closest('.dropdown');
			},

			/**
			 * Get the dropdown element for the current dropdown button.
			 * @returns {elt}
			 */
			'getDropdown': function() {
				var content = null;
				if (this.options.button.attr('data-dropdown-content-id') == undefined) {
					content = this.options.button.next();
				} else {
					content = $("#" + this.options.button.attr('data-dropdown-content-id'));
				}
				return content;
			},

			/**
			 * Open an item
			 * @param {mad.model.Model} item The target item to open
			 * @return {void}
			 */
			'open': function () {
				this.options.wrapper.addClass('pressed');
				content = this.getDropdown();
				content.addClass('visible');
			},

			/**
			 * Close an item
			 * @param {mad.model.Model} item The target item to close
			 * @return {void}
			 */
			'close': function () {
				this.options.wrapper.removeClass('pressed');
				content = this.getDropdown();
				content.removeClass('visible');
			},

			'isOpen': function () {
				return this.options.wrapper.hasClass('pressed');
			},

			/* ************************************************************** */
			/* LISTEN TO THE VIEW EVENTS */
			/* ************************************************************** */

			/**
			 * Listen to the event click on the DOM button element
			 * @return {void}
			 */
			'click': function (el, ev) {
				// If state is disabled, do not do anything on click.
				if (this.getController().state.is('disabled')) {
					return false;
				}
				// If state is not disabled,
				// manage opening and closing of button dropdown.
				if(!this.isOpen()) {
					this.open();
				} else {
					this.close();
				}
				return false;
			},

			/**
			 * Intercept global click event.
			 *
			 * Intercept global click event and close menu if open.
			 *
			 * @param el
			 * @param ev
			 */
			'{document} click': function (el, ev) {
				if (!this.element.is(el)) {
					this.close();
					this.options.wrapper.removeClass('pressed');
				}
			}

		});
	});