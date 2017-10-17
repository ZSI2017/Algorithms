
/***
 *
 *
 *  主要使用了邻接表的格式来表示矩阵
 ***/

function Graph(v) {
   this.vertices = v;
   this.vertexList = [];
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
   this.edgeTo = [];    // 最短路径；

   this.hasPathTo = hasPathTo;
   this.pathTo = pathTo;
   this.topSortHelper = topSortHelper;
   this.topSort = topSort;

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

// 用于显示符号名字而非数字的新函数
function showGraphString(){
    var visited = [];
    for(var i =0;i<this.vertices; ++i) {
        console.log(this.vertexList[i]+ " ->");
        visited.push(this.vertexList[i]);
        for(var j = 0;j<this.vertices;++j) {
           if(this.adj[i][j] != undefined) {
              if(visited.indexOf(this.vertexList[j])<0){
                 console.log(this.vertexList[j] + ' ');
              }
           }
        }
        // print()
        visited.pop();
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
     if(v !== ''){
         console.log("Visisted vertex:  "+v);
     }
     for(var w in this.adj[v]) {
        if(!this.marked[this.adj[v][w]]) {
           this.edgeTo[this.adj[v][w]] = v;
           this.marked[this.adj[v][w]] = true;
           queue.push(this.adj[v][w]);
        }
     }
  }
}

// pathTo 创建的一个栈 保存与指定顶点有共同边的所有顶点，
function pathTo(v) {
    var source = 0;
    if(!this.hasPathTo(v)) {
        return undefined;
    }
    var path = [];
    for(var i =v;i!=source;i=this.edgeTo[i]) {
         path.push(i);
    }
    path.push(source);
    return path;
}

function hasPathTo(v) {
   return this.marked[v];
}

// 实现拓扑排序
function topSort() {
  var stack = [];
  var visited = [];
  for(var i =0;i<this.vertices;i++) {
     visited[i] = false;
  }
  for(var i =0;i<this.vertices;i++){
     if(visited[i] == false) {
        this.topSortHelper(i,visited,stack);
     }
  }
  for(var i =0;i<stack.length;i++) {
     if(stack[i] != undefined) {
       console.log(stack[i]);
        console.log(this.vertexList[stack[i]]);
     }
  }
}

function topSortHelper(v,visited,stack) {
   visited[v] = true;
   for(var w in this.adj[v]){
       if(!visited[this.adj[v][w]]&&this.adj[v][w] != "") {
          this.topSortHelper(this.adj[v][w],visited,stack);
       }
   }
   stack.push(Number(v));
}
