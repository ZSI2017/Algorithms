// var filList = [{
//   name: 'a.html',
//   path: 'src/app'
// }, {
//   name: 'b.html',
//   path: 'src/app'
// }, {
//   name: 'c.html',
//   path: 'app/com'
// }, {
//   name: 'd.html',
//   path: 'acc/com'
// }, {
//   name: 'e.html',
//   path: 'acc/com/app'
// }];
// function Node(title,children) {
//    this.title = title;
//    this.children = children;
// }
//
// function tree() {
//      this.root = [];
// }
//
// function insert(filList) {
//      filList.forEach(function(items,idx){
//           var pathArr = items.path.split("/");
//           // if(pathArr[0])
//           pathArr.forEach(function(item,index){
//                if(index !== pathArr.length-1) {
//                   if(!this.findOne(item)){
//                      var tempNode = new Node()
//                   }
//                }
//           })
//      })
// }
//
// function findOne(titleName) {
//   return (this.root.some(function(item,idx){
//           return this.find(item,titleName)
//     }))
// }
//
// function find(obj,titleName) {
//    if(obj.title === titleName) {
//      return true;
//    } else {
//       if(typeof obj.children === "object"){
//           obj.children.some(function(item,idx){
//                 this.find(item,titleName);
//           })
//       }
//    }
// }

function insert(filList) {
     filList.forEach(function(items,idx){
          var pathArr = items.path.split("/");
          // if(pathArr[0])
          pathArr.forEach(function(item,index){
               if(index !== pathArr.length-1) {
                  if(!this.findOne(item)){
                     var tempNode = new Node()
                  }
               }
          })
     })
}

        console.log("已经成功请求",url)
    })
}

for(var i = 0;i < urls.length;i++) {
    fetchPage(i)
}
