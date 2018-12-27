({
	initializeList: function (component, event, helper) {
		component.set("v.uuId", helper.uniqueId());
	},

	afterScriptLoaded: function (component, event, helper) {

		dragula([document.getElementById('listleft'), document.getElementById('listRight')])
			.on('drag', function (el) {
				component.set("v.highlightedItems", null);
				component.set("v.highlightedItem", null);

				el.className = el.className.replace('ex-moved', '');
				var id = el.dataset.index !== undefined ? el.dataset.index : el.dataset.index2;
				var side = el.dataset.index !== undefined ? 'v.items' : 'v.rightItems';
				component.set("v.side", side);
				component.set('v.dragId', id);

			}).on('drop', function (el) {
				el.className += ' ex-moved';

				var selectEvent = component.getEvent("dropEvent");
				selectEvent.setParam("data", "");
				selectEvent.fire();
			}).on('over', function (el, container) {
				container.className += ' ex-over';
			}).on('out', function (el, container) {
				container.className = container.className.replace('ex-over', '');
			});

	},

	afterDrop: function (component, event, helper) {
		helper.afterDrop(component);
	},

	handleReorderItemUp: function (component, event, helper) {
		var IdNumber = component.get("v.IdNumber");
		var rightElemeth = component.get("v.rightItems");
		var side = null;
		rightElemeth.forEach(el => {
			if (IdNumber === el.id) {
				side = "v.rightItems";
			}
		});
		if (side !== null)
			helper.reorderItem(component, 'up', side);
	},

	handleReorderItemDown: function (component, event, helper) {
		var IdNumber = component.get("v.IdNumber");
		var rightElemeth = component.get("v.rightItems");
		var side = null;
		rightElemeth.forEach(el => {
			if (IdNumber === el.id) {
				side = "v.rightItems";
			}
		});
		if (side !== null)
			helper.reorderItem(component, 'down', side);
	},

	moveLeftToRight: function (component, event, helper) {
		var IdNumber = component.get("v.IdNumber");
		var leftElements = component.get("v.items");
		var side = null;
		leftElements.forEach(el => {
			if (IdNumber === el.id) {
				side = el;
			}
		});
		component.set("v.side", 'v.items');
		helper.moveItems(component, 'left');
	},

	moveRightToLeft: function (component, event, helper) {
		var IdNumber = component.get("v.IdNumber");
		var rightElemeth = component.get("v.rightItems");
		var side = null;
		rightElemeth.forEach(el => {
			if (IdNumber === el.id) {
				side = el;
			}
		});
		component.set("v.side", 'v.rightItems');
		helper.moveItems(component, 'right');
	},

	handleListClick: function (component, event, helper) {
		var id = event.currentTarget.id;
		component.set("v.IdNumber", id);
		var side = 'v.rightItems';
		var leftElements = component.get("v.items");
		leftElements.forEach(el => {
			if (id === el.id) {
				side = "v.items";
			}
		});

		helper.removeSelectedInAnotherSide(component, side);
		helper.handleListClick(component, event, side, "v.highlightedItems", "v.highlightedItem");
	},

	handleDataChangeAppEvent: function (component, event, helper) {
		helper.handleDataChangeAppEvent(component, event);
	},

	handleShowDesc: function (component, event, helper) {
		var isChecked = document.getElementById("chToggle").checked;
		document.getElementById("listleft").className = (isChecked ? '' : 'mainListNoShDesc ') + 'slds-listbox slds-listbox_vertical';
	},

	onSearchInputChange: function (component, event, helper) {
		helper.onSearchInputChange(component, event);
	},

	turnOffAutocomplete: function (component) {
		var input = document.getElementById("searchFld");
		if (input.getAttribute("autocomplete") !== "off") {
			input.setAttribute("autocomplete", "off");
		}
	},


})