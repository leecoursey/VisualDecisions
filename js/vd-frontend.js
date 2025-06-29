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
        var svg = d3.select(container).append('svg')
            .attr('width', '100%')
            .attr('height', 400);

        // simple rendering of nodes
        svg.selectAll('circle')
            .data(data.nodes || [])
            .enter()
            .append('circle')
            .attr('r', 20)
            .attr('cx', function(d){ return d.x; })
            .attr('cy', function(d){ return d.y; });
    });
})();
