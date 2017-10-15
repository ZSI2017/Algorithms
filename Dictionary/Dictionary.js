// 定义字典类
function Dictionary(){
    this.add = add;
    this.datastore = new Array();
    this.find= find;
    this.remove = remove;
    this.showAll = showAll;
    this.count  = count;
    this.clear  = clear;
    this.showAllSort = showAllSort;
}

// 添加键值对
function add(key,value) {
   this.datastore[key] = value;
}
//  删除对应 的数值
function remove(key) {
   delete this.datastore[key];
}
function find(key){
    return this.datastore[key];
}
// 计数方法；
function count(){
     var n =0;
     for(var key in Object.keys(this.datastore)){
        ++n;
     }
     return n;
}
//清除方法
function clear() {
    for(var key in Object.keys(this.datastore)) {
      // console.log(key);
      // console.log(Object.keys(this.datastore)[key]);
      // console.log(this.datastore[Object.keys(this.datastore)[key]]);
       delete this.datastore[Object.keys(this.datastore)[0]];
    }
}
function showAll(){
    for(key in Object.keys(this.datastore)){
       console.log(Object.keys(this.datastore)[key] + "--->"+this.datastore[Object.keys(this.datastore)[key]]);
    }
 }
 // 对数值进行排序后 再输出
 function showAllSort(){

      for(key in Object.keys(this.datastore).sort()){
         console.log(Object.keys(this.datastore)[key]+ "--->"+this.datastore[Object.keys(this.datastore)[key]]);
      }
 }
