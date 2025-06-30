(function(){
    document.querySelectorAll('.vd-diagram').forEach(function(container){
        var dataAttr = container.getAttribute('data-diagram');
        if (!dataAttr) return;

        var data;
        try {
            data = JSON.parse(dataAttr);
        } catch (e) {
            return;
        }

        data.nodes = data.nodes || [];
        data.links = data.links || [];

        function findNode(id){
            return data.nodes.find(function(n){ return n.id === id; });
        }

        function outgoing(id){
            return data.links.filter(function(l){ return l.source === id; });
        }

        var current = data.nodes.find(function(n){ return n.isStart; }) || data.nodes[0];
        if(!current) return;

        function render(node){
            container.innerHTML = '';
            var options = outgoing(node.id);
            if(options.length === 0){
                var endDiv = document.createElement('div');
                endDiv.className = 'vd-terminal';
                endDiv.innerHTML = node.content || '';
                container.appendChild(endDiv);
                return;
            }
            var q = document.createElement('div');
            q.className = 'vd-question';
            q.textContent = node.text || node.label || '';
            container.appendChild(q);
            options.forEach(function(link){
                var btn = document.createElement('button');
                btn.textContent = link.label || '...';
                btn.addEventListener('click', function(){
                    var next = findNode(link.target);
                    if(next){
                        current = next;
                        render(next);
                    }
                });
                container.appendChild(btn);
            });
        }

        render(current);
    });
})();
