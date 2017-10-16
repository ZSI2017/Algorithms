
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
   this.dfs = dfs;
   // 广度优先搜索
   this.bfs = bfs;
   this.marked = [];
   for(var i = 0;i<this.vertices;++i) {
     this.marked[i] = false;
   }
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

// 使用深度优先搜索的方式来 遍历图
function dfs(v) {
    this.marked[v] = true;
   if(this.adj[v] != undefined) {
      console.log("Visited vertex: "+ v);
   }
   for(var w in this.adj[v]) {
      if(!this.marked[this.adj[v][w]]) {
          this.dfs(this.adj[v][w])
      }
   }
}

// 广度优先搜索， 一层一层的查找 图中的每个相邻 的节点
function bfs(s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s);      // 添加到队尾
  while(queue.length > 0) {
     var v = queue.shift();   // 从队首移除
     if(v == undefined){
         console.log("Visisted vertex:  "+v);
     }
     for(var w in this.adj[v]) {
        if(!this.marked[this.adj[v][w]]) {
          //  this.edgeTo[this.adj[v][w]] = v;
           this.marked[this.adj[v][w]] = true;
           queue.push(this.adj[v][w]);
        }
     }
  }
}
