function Node(data,left,right) {
   this.data = data;
   this.left = left;
   this.right = right;
   this.show = show;
   this.count = 1;
}

function show() {
    return this.data;
}

function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.getMin = getMin;
    this.getMax = getMax;
    this.find = find;
    this.update = update

    // 记录 BST 中 所有节点的个数
    this.count = 1;
    // 记录BST 中 所有边的个数
    this.edge = 0;
}


function insert(data) {
   var n = new Node(data,null,null);
   if(this.root == null) {
      this.root = n;
   }else {
      var current = this.root;
      var parent;
      while(true) {
         parent = current;
         if(data< current.data ){
            current = current.left;
            if(current == null){
               parent.left = n;
               break;
            }
         }else {
            current = current.right;
            if(current == null) {
               parent.right =n;
               break;
            }
         }
      }
   }

}

// 中序遍历
function inOrder(node){
    if(!(node == null)) {
       inOrder(node.left);
       console.log(node.show()+" ");
       inOrder(node.right);
    }
}

// 先序遍历
function preOrder(node) {
    if(!(node == null)){
      console.log(node.show() +" ");
    preOrder(node.left);
    preOrder(node.right);
 }
}

// 后序遍历
function postOrder(node) {
      if(!(node == null)) {
         postOrder(node.left);
         postOrder(node.right);
        console.log(node.show()+" ");
      }
}

// 查找最小值
function getMin(root) {
  var current;
  if(root) {
     current = root;
  }else {
     current = this.root;
  }
    console.log(this.root);
    while(!(current.left == null)) {
      current = current.left;
    }
    return current.data;
}

// 查找最大值
function getMax() {
   var current = this.root;
   while(!(current.right == null)) {
      current = current.right;
   }
  return current.data;
}

// 查找给定值
function find(data) {
   var current = this.root;
   while(current != null) {
      if(current.data == data) {
         return data;
      }else if(current.data>data){
          current = current.left;
      }else {
         current = current.right;
      }
   }
}

// 从二叉查找树上删除节点
 function remove(){
    root = removeNode(this.root,data);
 }

 function removeNode(node,data) {
   if(node == null) {
      return null;
    }
    if(data == node.data) {
        // 没有子节点的节点
        if(node.left == null && node.right == null) {
             return nulll;
        }
        // 没有左子节点的节点
        if(node.left == null) {
            return node.right;
        }
        // 没有右子节点的节点
        if(node.right == null) {
           return node.left;
        }
        // 有两个节点的节点
        var tempNode = this.getMin(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right,tempNode.data);
        return node;
    }
    else if(data<node.data) {
       node.left = removeNode(node.left,data);
       return node;
    }else {
       node.right = removeNode(node.right,data);
       return node;
    }
 };

 // BST 统计出现次数 可以在每个node 节点中实现yige count = 1;
  function update(data) {
     var grade = this.find(data);
     grade.count++;
     return grade;
  }

// 增加了可以随机产生成绩 以及可以展示成绩的方法
 function prArray(arr) {
    console.log(arr[0].toString() +" ");
  for(var i =1;i<arr.length;i++){
    console.log(arr[i].toString() + " ");
    if(i%10 == 0) {
      console.log("\n");
    }
  }
  console.log("\n");
 }

// 随机生产出成
 function genArray(length) {
    var arr = [];
    for(var i =0;i<length;i++) {
       arr[i] = Math.floor(Math.random() * 101);
    }
    return arr;
 }
