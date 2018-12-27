({
	initializeList: function (component, event, helper) {
		console.log(component.get("v.items"));
		console.log(component.get("v.rightItems"));

		var items = component.get("v.leftValues");

		items.forEach(function (item, index) {
			item.sort = index;
			item.style = '';
			item.selected = false;
			item.id = helper.uniqueId();
		});

		items = JSON.parse(JSON.stringify(items));

		component.set("v.items", items);

		var itemsR = component.get("v.rightValues");

		itemsR.forEach(function (item, index) {
			item.sort = index;
			item.style = '';
			item.selected = false;
			item.id = helper.uniqueId();
		});

		itemsR = JSON.parse(JSON.stringify(itemsR));
		component.set("v.rightItems", itemsR);

	},

	printConsole: function (component) {
		console.log(component.get("v.items"));
		console.log(component.get("v.rightItems"));
	},
})