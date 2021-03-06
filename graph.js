function Node(index){
    this.id=index;
    this.adjacent=[];
    this.edges={};
    this.color="W";  
    this.parent=null;
    this.distance=null;
    this.start=null;
    this.end=null;
};

function Edge(to,weight){
    this.to=to;
    this.weight=weight;
};

var graph={
    time:0,
    import:function(input){
        this.clear();
        input.forEach(function(element,index,array) {
            current=new Node(index);
            this.nodes.push(current);
        }, this);

        input.forEach(function(element,index,array) {
            node=this.get(index);
            element.forEach(function(element2,index2,array2) {
                if(index!=index2 && element2!=0){
                    node.adjacent.push(index2);
                    node.edges[index2]=element2;
                }
            }, this);
        }, this);

    },
    clear:function(){
        this.nodes=[];
    },
    reset:function(){
        this.time=0;
        this.nodes.forEach(function(element) {
            element.color="W";
            element.parent=null;
            element.distance=null;
            element.start=null;
            element.end=null;
        }, this);
    },
    nodes:[],
    edges:[],
    get:function(id){
        return this.nodes.filter(node=>node.id==id)[0];
    },
    BFS:function(id){
        this.reset();
        var queue=[];
        var v=this.get(id);       
        v.color="G";
        v.distance=0;
        v.parent=null;
        queue.push(v);
        while(queue.length!=0){
            v=queue[queue.length-1];
            v.adjacent.forEach(function(element) {
                w=this.get(element);
                if(w.color=="W"){
                    w.color="G";
                    w.distance=v.distance+1;
                    w.parent=v.id;
                    queue.push(w);                   
                }
            }, this);
            queue.splice(0,1);
            v.color="B";
        }       
    },
    DFS:function(){
        this.reset();
        this.time=0;
        this.nodes.forEach(function(element) {
            if(element.color=="W"){
                this.visit(element);
            }
        }, this);  
    },
    Djikstra:function(id){
        this.reset();
        var v=this.get(id);       
        v.distance=0;
        var Q=this.nodes.slice();
        var S=[];
        while(Q.length!=0){
            var u=null;
            var u_index=-1;
            Q.forEach(function(element,index) {
                    if(u==null || (element.distance!=null && element.distance<u.distance)){
                        u=element;
                        u_index=index;
                    }
            }, this);
            Q.splice(u_index,1);
            S.push(u);
            u.adjacent.forEach(function(element){
                w=this.get(element);
                this.relax(u,w);
            },this);
        }     
    },
    relax:function(from,to){
        if(to.distance==null || to.distance>from.distance+from.edges[to.id]){
            to.distance=from.distance+from.edges[to.id];
            to.parent=from.id;
        }
    },
    visit:function(node){
        node.color="G";
        this.time=this.time+1;
        node.start=this.time;
        node.adjacent.forEach(function(element) {
            w=this.get(element);
            if(w.color=="W"){
                w.parent=node.id;
                this.visit(w);
            }
        }, this);
        node.color="B";
        this.time=this.time+1;
        node.end=this.time;

    },
    results:function(){
        result='';
        this.nodes.forEach(function(element) {
            result=result+'ID: '+element.id+' Parent: '+element.parent+' Distance: '+element.distance+' Start: '+element.start+' End: '+element.end+' <br> ';
        }, this);
        document.getElementById("output").innerHTML=result;
    }
}
