({
    doInit: function (component, event, helper) {
        var see = component.get("v.position");
        var result = 'listItems2';
        if (see === 'right') {
            result = 'listItems';
        }
        component.set("v.leftRight", result);

        helper.doInit(component);
    },
    deleteFromList: function (component, event, helper) {
        helper.deleteFromList(component, event);
    },
    moveItems: function (component, event, helper) {
        console.log('*******************', component.get("v.items"));
        helper.moveItems(component);
    },
    handleDataChangeAppEvent: function (component, event, helper) {
        helper.handleDataChangeAppEvent(component, event);
    },
    handleListClick: function (component, event, helper) {
        helper.handleListClick(component, event, "v.items", "v.highlightedItems", "v.highlightedItem");
    },
    handleAddItems: function (component, event, helper) {
        helper.handleAddItems(component, event, "v.items", "v.highlightedItems", "v.highlightedItem");
    },
    handleReorderItemUp: function (component, event, helper) {

        helper.reorderItem(component, 'up');
    },
    handleReorderItemDown: function (component, event, helper) {
        helper.reorderItem(component, 'down');
    },
    handleDragStart: function (component, event, helper) {

        helper.handleDragStart(component, event, "v.items");
    },
    handleOnDragEnter: function (component, event, helper) {
        helper.handleOnDragEnter(component, event);
    },
    handleOnDragLeave: function (component, event, helper) {
        helper.handleOnDragLeave(component, event);
    },
    handleOnDrop: function (component, event, helper) {
        helper.handleOnDropParent(component, event);
    },
    handleOnDropParent: function (component, event, helper) {
        helper.handleOnDropParent(component, event);
    },
    handleShowDesc: function (component, event, helper) {
        var isChecked = document.getElementById("chToggle").checked;
        document.getElementById("mainListVals").className = (isChecked ? '' : 'mainListNoShDesc ') + 'slds-listbox slds-listbox_vertical';
    },
    /*dummy methods*/
    handleOnDragOver: function (component, event, helper) {
        event.preventDefault();
    },
    handleOnDragOverDummy: function (component, event, helper) {
        event.preventDefault();
    },
    handleOnDragEnterDummy: function (component, event, helper) {
        event.preventDefault();
    },
    handleOnDragLeaveDummy: function (component, event, helper) {
        event.preventDefault();
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


    testmeth: function (component, event, helper) {

        console.log('elements ********');
    },


})