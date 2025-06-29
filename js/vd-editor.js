// Admin D3 editor placeholder
(function($){
    // get textarea containing JSON data
    var textarea = document.querySelector('textarea[name="vd_tree_data"]');
    if (!textarea) return;

    var data;
    try {
        data = JSON.parse(textarea.value || '{}');
    } catch(e) {
        data = { nodes: [], links: [] };
    }

    // basic svg setup using D3
    var svg = d3.select('#vd-editor').append('svg')
        .attr('width', '100%')
        .attr('height', 400);

    // render nodes from data
    function render() {
        var nodes = svg.selectAll('circle').data(data.nodes);
        nodes.enter().append('circle')
            .attr('r', 20)
            .attr('cx', function(d){ return d.x; })
            .attr('cy', function(d){ return d.y; })
            .call(d3.drag()
                .on('drag', function(event, d){
                    d.x = event.x;
                    d.y = event.y;
                    d3.select(this)
                        .attr('cx', d.x)
                        .attr('cy', d.y);
                    textarea.value = JSON.stringify(data);
                }));
        nodes.exit().remove();
    }

    render();
})(jQuery);
