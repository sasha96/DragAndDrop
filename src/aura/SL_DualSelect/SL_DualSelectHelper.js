({
    moveItems: function (component, startWith) {
        var listCmp = component.find(startWith);
        console.log(startWith, 'startWith');
        listCmp.moveItems(component);

    },

    handleOnDropP: function (component, event, helper) {

    },


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
})