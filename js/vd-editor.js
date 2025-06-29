// Admin D3 editor with basic add/connect functionality
(function($){
    var textarea = document.querySelector('textarea[name="vd_tree_data"]');
    if(!textarea) return;

    var data;
    try {
        data = JSON.parse(textarea.value || '{}');
    } catch(e) {
        data = {nodes:[], links:[]};
    }
    data.nodes = data.nodes || [];
    data.links = data.links || [];

    function save(){
        textarea.value = JSON.stringify(data);
    }

    var width = document.getElementById('vd-editor').clientWidth || 600;
    var height = 400;
    var svg = d3.select('#vd-editor').append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('border', '1px solid #ccc');

    var selected = null;

    function findNode(id){
        return data.nodes.find(function(n){ return n.id === id; });
    }

    function render(){
        // links
        var linkSel = svg.selectAll('line').data(data.links);
        linkSel.enter().append('line')
            .attr('stroke', '#000');
        linkSel
            .attr('x1', function(d){ return findNode(d.source).x; })
            .attr('y1', function(d){ return findNode(d.source).y; })
            .attr('x2', function(d){ return findNode(d.target).x; })
            .attr('y2', function(d){ return findNode(d.target).y; });
        linkSel.exit().remove();

        // nodes
        var nodeSel = svg.selectAll('g.node').data(data.nodes, function(d){ return d.id; });
        var nodeEnter = nodeSel.enter().append('g').attr('class','node');
        nodeEnter.append('circle')
            .attr('r',20)
            .attr('fill','#aaf');
        nodeEnter.append('text')
            .attr('text-anchor','middle')
            .attr('dy',4)
            .text(function(d){ return d.text; });

        nodeSel = nodeEnter.merge(nodeSel);
        nodeSel.attr('transform', function(d){ return 'translate(' + d.x + ',' + d.y + ')'; });

        nodeSel.select('circle').call(d3.drag()
            .on('drag', function(event,d){
                d.x = event.x; d.y = event.y;
                d3.select(this.parentNode).attr('transform','translate('+d.x+','+d.y+')');
                render();
                save();
            }));

        nodeSel.on('click', function(event,d){
            if(selected && selected !== d){
                data.links.push({source:selected.id, target:d.id});
                selected = null;
                render();
                save();
            } else {
                selected = d;
            }
        }).on('dblclick', function(event,d){
            var t = prompt('Node text', d.text || '');
            if(t !== null){
                d.text = t;
                d3.select(this).select('text').text(t);
                save();
            }
        });

        nodeSel.exit().remove();
    }

    svg.on('dblclick', function(event){
        var coords = d3.pointer(event);
        var node = {
            id: 'n' + Date.now(),
            x: coords[0],
            y: coords[1],
            text: 'Question'
        };
        data.nodes.push(node);
        render();
        save();
    });

    render();
})(jQuery);
