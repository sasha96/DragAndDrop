({
	uniqueId: function () {
		function chr4() {
			return Math.random().toString(16).slice(-4);
		}
		return chr4() + chr4() +
			'-' + chr4() +
			'-' + chr4() +
			'-' + chr4() +
			'-' + chr4() + chr4() + chr4();
	},

	reorderItem: function (component, direction, way) {
		var item = component.get("v.highlightedItem");
		if (!item) {
			return;
		}
		var swapItem, swapIndex;

		component.set("v.highlightedItems", [item]);

		var items = component.get(way);
		items = this.renumberItems(items);

		if (direction == 'up') {
			if (item.sort < 1) {
				return;
			}
			swapIndex = item.sort - 1;
		}
		if (direction == 'down') {
			if (item.sort == items.length) {
				return;
			}
			swapIndex = item.sort + 1;
		}
		swapItem = this.getItemBySort(swapIndex, items);
		if (!swapItem) {
			return;
		}
		var temp = item.sort;
		item.sort = swapItem.sort;
		swapItem.sort = temp;
		console.log('swapitem sort: ' + swapItem.sort + ' item sort: ' + item.sort);

		//sort and save
		items = this.sortItems(items);
		component.set(way, items);

		//item.style  = ' select-focus ';
		component.set("v.highlightedItem", item);

	},

	handleListClick: function (component, event, listName, selectedListName, selectedItemName) {

		var id = event.currentTarget.id;
		var items = component.get(listName);

		var itemOriginal = component.get(selectedItemName);

		var item = this.getItem(id, items);

		//items = this.removeStyles(items);
		items = this.removeSelection(component, items);
		var e = $A.get("e.c:ApplicationEvent");
		e.setParams({
			"data": {
				"uuId": null,
				"type": "clearList"
			}
		});
		e.fire();

		if (event.shiftKey && itemOriginal) {

			//make a selection from one to the next!
			var start = item.sort < itemOriginal.sort ? item.sort : itemOriginal.sort;
			var end = item.sort > itemOriginal.sort ? item.sort : itemOriginal.sort;

			var subset = this.getItems(start, end, items);
			subset = this.addSelection(subset);
			component.set(selectedListName, subset);
			component.set(selectedItemName, '');
		} else {

			this.addSelection([item]);

			component.set(selectedItemName, item);
			component.set(selectedListName, [item]);
		}

		component.set(listName, items);

	},

	getItems: function (start, end, items) {
		var itemsToReturn = [];
		items.forEach(function (item) {
			if (item.sort >= start && item.sort <= end) {
				itemsToReturn.push(item);
			}
		});
		return itemsToReturn;
	},

	addSelection: function (items) {
		items.forEach(function (item) {
			item.selected = true;
		});
		return items;
	},

	getItem: function (id, items) {
		var itemToReturn;
		items.forEach(function (item) {
			if (item.id === id) {
				itemToReturn = item;
			}
		});
		return itemToReturn;
	},

	removeSelection: function (component, items) {
		items.forEach(function (item) {
			item.selected = false;
		});
		component.set("v.highlightedItem", null);
		component.set("v.highlightedItems", []);
		return items;
	},

	renumberItems: function (items) {
		//items = this.sortItems(items);
		var newItems = [];
		var existedItemIDs = [];
		items.forEach(function (item, index) {
			if (existedItemIDs.indexOf(item.id) == -1) {
				existedItemIDs.push(item.id);
				newItems.push(item);
			}
		});
		newItems.forEach(function (item, index) {
			item.sort = index;
		});
		return newItems;
	},

	getItemBySort: function (sort, items) {
		var itemToReturn;
		items.forEach(function (item) {
			if (item.sort === sort) {
				itemToReturn = item;
			}
		});
		return itemToReturn;
	},

	sortItems: function (items) {
		items.sort(function (a, b) {
			return a.sort > b.sort ? 1 : -1;
		});
		return items;
	},

	handleDataChangeAppEvent: function (component, event) {

		var IdNumber = component.get("v.IdNumber");
		var side = 'v.rightItems';
		var leftColumn = component.get("v.items");

		leftColumn.forEach(el => {
			if (IdNumber === el.id) {
				side = "v.items";
			}
		});

		var data = event.getParam("data");


		if (data.type === "clearList") {
			var items = component.get("v.rightItems");
			items = this.removeSelection(component, items);
			component.set("v.rightItems", items);
			return;
		}

		if (data.type === "move") {
			component.set("v.elementForDelete", component.get("v.highlightedItems"));
			this.addItems(component, data.items, side);
			this.moveComplete(component);
		} else if (data.type === "moveComplete") {
			var items = this.removeItems(component, IdNumber, component.get(side));
			var side = component.get("v.side");
			component.set(side, items);
			component.set("v.IdNumber", null);
			component.set("v.side", '');
		}

	},

	addItems: function (component, newItems, side) {

		side = side === 'v.items' ? 'v.rightItems' : 'v.items';
		var items = component.get(side);

		if (!newItems.length) {
			return;
		}
		var self = this;
		newItems.forEach(function (item) {
			self.addItem(items, item);
		});

		items = self.renumberItems(items);
		items = this.removeSelection(component, items);
		component.set(side, items);
		this.broadcastDataChange(component);

	},

	addItem: function (items, item) {
		item.style = '';
		//swap sorts
		var savedSort = item.savedSort;
		item.savedSort = item.sort;
		item.sort = savedSort;

		console.log('added: ' + JSON.stringify(item));

		items.push(item);
		return item;
	},

	broadcastDataChange: function (component, immediate, item) {

		component.set("v.changeEventScheduled", true);
		var position = component.get("v.position");
		var timer = component.get("v.storedTimer");
		var timeout = 1000;
		if (timer) {
			window.clearTimeout(timer);
		}

		if (immediate) {
			timeout = 50;
		}

		timer = window.setTimeout(
			$A.getCallback(function () {
				var compEvent = component.getEvent("multiColumnSelectChange");
				compEvent.setParams({
					"category": "multiColumnSelectChange",
					"data": {
						"action": "remove",
						"position": position,
						"item": item
					}
				});
				compEvent.fire();
				component.set("v.changeEventScheduled", false);

			}), timeout
		);
	},

	moveComplete: function (component) {
		var e = $A.get("e.c:ApplicationEvent");
		e.setParams({
			"data": {
				"uuId": component.get("v.uuId"),
				"type": "moveComplete"
			}
		});
		e.fire();
	},

	removeItems: function (component, itemsToRemove, items) {
		var elementForDelete = component.get("v.elementForDelete");
		var idForDelete = [];
		elementForDelete.forEach(el => {
			idForDelete.push(el.id);
		});

		var side = component.get("v.side");
		var itemsFromSide = component.get(side);

		idForDelete.forEach(function (itemToRemove) {
			itemsFromSide = itemsFromSide.filter(function (item) {
				return item.id !== itemToRemove;
			});
		});
		return itemsFromSide;
	},

	moveItems: function (component) {
		var e = $A.get("e.c:ApplicationEvent");
		e.setParams({
			"data": {
				"uuId": component.get("v.uuId"),
				"items": component.get("v.highlightedItems"),
				"type": "move"
			}
		});
		e.fire();
	},

	onSearchInputChange: function (component, event) {
		var searchVal = document.getElementById("searchFld").value;

		var items = component.get("v.items");
		if (searchVal) {
			items.forEach(function (item, index) {
				if (item.label.toLowerCase().indexOf(searchVal.toLowerCase()) != -1) {
					item.style = '';
				} else {
					item.style = 'hideItem';
				}
			});
		} else {
			items.forEach(function (item, index) {
				item.style = '';
			});
		}

		component.set("v.items", items);
	},

	afterDrop: function (component) {
		var dragElId = component.get("v.dragId");

		var leftItems = component.get("v.items");
		var newLeftItems = [];
		var listLeftDOM = document.getElementById('listleft');
		var liftItemsDom = listLeftDOM.children;

		var rightItems = component.get("v.rightItems");
		var newRightItems = [];
		var listRightDom = document.getElementById('listRight');
		var rightItemsDom = listRightDom.children;

		if (rightItemsDom.length !== rightItems.length && leftItems.length !== liftItemsDom.length) {
			for (var i = 0; i < liftItemsDom.length; i++) {
				newLeftItems.push(liftItemsDom[i].dataset.index);
			}

			var indPlaceL = 0;
			for (let index = 0; index < newLeftItems.length; index++) {
				if (newLeftItems[index] === undefined) {
					indPlaceL = index;
				}
			}

			const filteredItemsL = newLeftItems.filter(item => item !== undefined);
			var newItemsLeft = [];
			leftItems.forEach(parent => {
				filteredItemsL.forEach(el => {
					if (el === parent.id) {
						newItemsLeft.push(parent);
					}
				});
			});
			rightItems.forEach(el => {
				if (el.id === dragElId) {
					newItemsLeft.splice(indPlaceL, 0, el);
				}
			});
			component.set('v.items', newItemsLeft);

			for (var i = 0; i < rightItemsDom.length; i++) {
				newRightItems.push(rightItemsDom[i].dataset.index2);
			}

			var indPlace = 0;
			for (let index = 0; index < newRightItems.length; index++) {
				if (newRightItems[index] === undefined) {
					indPlace = index;
				}
			}

			const filteredItemsR = newRightItems.filter(item => item !== undefined);
			var newItemsRight = [];
			rightItems.forEach(parent => {
				filteredItemsR.forEach(el => {
					if (el === parent.id) {
						newItemsRight.push(parent);
					}
				});
			});

			leftItems.forEach(el => {
				if (el.id === dragElId) {
					newItemsRight.splice(indPlace, 0, el);
				}
			});
			component.set('v.rightItems', newItemsRight);
		}
	},


	removeSelectedInAnotherSide: function (component, side) {
		var anotherSide = side === 'v.items' ? 'v.rightItems' : 'v.items';
		var items = component.get(anotherSide);
		items.forEach(el => {
			el.selected = false;
		});
		component.set(anotherSide, items);
	}
})