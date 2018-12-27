({
    moveLeftToRight: function (component, event, helper) {
        helper.moveItems(component, 'left');
    },
    moveRightToLeft: function (component, event, helper) {
        helper.moveItems(component, 'right');
    },
    afterScriptLoaded: function (component, event, helper) {
        /*    dragula([document.getElementById('listItems'), document.getElementById('listItems2')])
            .on('drag', function (el) {
                el.className = el.className.replace('ex-moved', '');

            }).on('drop', function (el, target, source, sibling) {
                var testDiv = document.getElementById('startSize');
                testDiv.className = testDiv.className.replace('startSize', '');
                el.className += 'ex-moved';

                console.log(document.getElementById('listItems'));
                var selectEvent = component.getEvent("dropEvent");
                selectEvent.setParam("data", "");
                selectEvent.fire();
            }).on('over', function (el, container) {
                container.className += 'ex-over';
            }).on('out', function (el, container) {
                container.className = container.className.replace('ex-over', '');
            });
*/
    },




    dropEvent: function (component, event, helper) {
        /*  console.log('droppp');
        console.log(document.getElementById('listItems'));
        console.log(document.getElementById('listItems2'));
*/
        var lef = component.get("v.leftValues");
        var rig = component.get("v.rightValues");



    },
    /*
            dragEvent: function (component, event, helper) {
                console.log('dragEvent');
                //helper.handleDragStart(component, event, "v.items");
            },
        */

    doInit: function (component, event, helper) {

        /*  var items = component.get("v.leftValues");

          items.forEach(function (item, index) {
              item.sort = index;
              item.style = '';
              item.selected = false;
              item.id = helper.uniqueId();
          });

          items = JSON.parse(JSON.stringify(items));

          component.set("v.leftValues", items)



          var items3 = component.get("v.rightValues");

          items3.forEach(function (item, index) {
              item.sort = index;
              item.style = '';
              item.selected = false;
              item.id = helper.uniqueId();
          });

          items3 = JSON.parse(JSON.stringify(items3));

          component.set("v.rightValues", items3);*/
    },

})