(function($){
    var textarea = document.querySelector('textarea[name="vd_tree_data"]');
    if(!textarea) return;

    var data;
    try {
        data = JSON.parse(textarea.value || '{}');
    } catch(e) {
        data = {};
    }
    data.nodeDataArray = data.nodeDataArray || [];
    data.linkDataArray = data.linkDataArray || [];

    function save(){
        textarea.value = diagram.model.toJson();
    }

    var $go = go.GraphObject.make;
    var diagram = $go(go.Diagram, 'vd-editor', {
        'undoManager.isEnabled': true,
        model: new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray)
    });

    diagram.nodeTemplate =
        $go(go.Node, 'Auto',
            { locationSpot: go.Spot.Center },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $go(go.Shape, 'RoundedRectangle', { fill:'#aaf' }),
            $go(go.TextBlock, { margin: 8, editable: true },
                new go.Binding('text').makeTwoWay())
        );

    diagram.linkTemplate =
        $go(go.Link,
            $go(go.Shape),
            $go(go.Shape, { toArrow: 'Standard' })
        );

    diagram.addModelChangedListener(function(e){
        if(e.isTransactionFinished) save();
    });

    diagram.toolManager.clickCreatingTool.archetypeNodeData = { text: 'Question' };
    diagram.toolManager.clickCreatingTool.isDoubleClick = true;

    // Load initial model
    diagram.model = new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray);
})(jQuery);
