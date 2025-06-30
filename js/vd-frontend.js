// Frontend diagram display using D3
(function(){
    document.querySelectorAll('.vd-diagram').forEach(function(container){
        var dataAttr = container.getAttribute('data-diagram');
        if (!dataAttr) return;

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

        // Render links with labels
        var linkSel = svg.selectAll('g.link')
            .data(data.links)
            .enter()
            .append('g')
            .attr('class', 'link');

        linkSel.append('line')
            .attr('stroke', '#000')
            .attr('x1', function(d){ return findNode(d.source).x; })
            .attr('y1', function(d){ return findNode(d.source).y; })
            .attr('x2', function(d){ return findNode(d.target).x; })
            .attr('y2', function(d){ return findNode(d.target).y; });

        linkSel.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', -5)
            .attr('x', function(d){ 
                var s = findNode(d.source), t = findNode(d.target); 
                return (s.x + t.x) / 2; 
            })
            .attr('y', function(d){ 
                var s = findNode(d.source), t = findNode(d.target); 
                return (s.y + t.y) / 2; 
            })
            .text(function(d){ return d.label || ''; });

        // Render nodes
        var node = svg.selectAll('g.node')
            .data(data.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function(d){ return 'translate(' + d.x + ',' + d.y + ')'; });

        node.append('circle')
            .attr('r', 20)
            .attr('fill', '#aaf');

        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 4)
            .text(function(d){ return d.text; });
    });
})();
