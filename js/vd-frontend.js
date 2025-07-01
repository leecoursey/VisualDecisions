(function(){
    document.querySelectorAll('.vd-diagram').forEach(function(container){
        var dataAttr = container.getAttribute('data-diagram');
        if(!dataAttr) return;
        var data;
        try {
            data = JSON.parse(dataAttr);
        } catch(e) {
            return;
        }
        data.nodeDataArray = data.nodeDataArray || [];
        data.linkDataArray = data.linkDataArray || [];

        var $go = go.GraphObject.make;
        var diagram = $go(go.Diagram, container, {
            allowMove:false,
            allowCopy:false,
            allowDelete:false,
            allowHorizontalScroll:false,
            allowVerticalScroll:false
        });

        diagram.nodeTemplate =
            $go(go.Node, 'Auto',
                new go.Binding('location', 'loc', go.Point.parse),
                $go(go.Shape, 'RoundedRectangle', { fill:'#aaf' }),
                $go(go.TextBlock, { margin:8 }, new go.Binding('text'))
            );

        diagram.linkTemplate =
            $go(go.Link,
                $go(go.Shape),
                $go(go.Shape, { toArrow:'Standard' })
            );

        diagram.model = new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray);
    });
})();
