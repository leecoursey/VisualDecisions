// Frontend diagram display using D3
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
        data.nodes = data.nodes || [];
        data.links = data.links || [];

        var width = container.clientWidth || 600;
        var height = 400;
        var svg = d3.select(container).append('svg')
            .attr('width', width)
            .attr('height', height);

        function findNode(id){
            return data.nodes.find(function(n){ return n.id === id; });
        }

        svg.selectAll('line')
            .data(data.links)
            .enter()
            .append('line')
            .attr('stroke','#000')
            .attr('x1', function(d){ return findNode(d.source).x; })
            .attr('y1', function(d){ return findNode(d.source).y; })
            .attr('x2', function(d){ return findNode(d.target).x; })
            .attr('y2', function(d){ return findNode(d.target).y; });

        var node = svg.selectAll('g.node')
            .data(data.nodes)
            .enter()
            .append('g')
            .attr('class','node')
            .attr('transform', function(d){ return 'translate(' + d.x + ',' + d.y + ')'; });

        node.append('circle')
            .attr('r',20)
            .attr('fill','#aaf');

        node.append('text')
            .attr('text-anchor','middle')
            .attr('dy',4)
            .text(function(d){ return d.text; });
    });
})();
