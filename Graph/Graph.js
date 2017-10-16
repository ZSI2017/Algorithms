
/***
 *
 *
 *  主要使用了邻接表的格式来表示矩阵
 ***/

function Graph(v) {
   this.vertices = v;
   this.edges = 0;
   this.adj = [];
   for(var i = 0; i<this.vertices;++i) {
      this.adj[i] = [];
      this.adj[i].push("");
   }
   this.addEdge = addEdge;
   this.showGraph = showGraph;
}

function addEdge(v,w) {
   this.adj[v].push(w);
   this.adj[w].push(v);
   this.edges ++;
}

function showGraph(){
   for(var i =0;i<this.vertices;++i){
       console.log(i+"--->");
       for(var j =0;j<this.vertices;++j) {
         if(this.adj[i][j] !=undefined) {
            console.log(this.adj[i][j] + ' ');
         }
       }
   }
}
