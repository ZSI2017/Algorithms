/**
  *   数组测试平台类
  **/

function CArray(numElements) {
     this.dataStore = [];
     this.pos = 0;
     this.numElements = numElements;
     this.insert = insert;
     this.toString = toString;
     this.clear = clear;
     this.setData = setData;
     this.swap = swap;
     this.gaps = [5,3,1];

     for(var i = 0;i<numElements;++i) {
        this.dataStore[i] = i;
     }
}

function setGaps(arr) {
    this.gaps = arr;
}

function setData(){
   for(var i =0;i<this.numElements;++i) {
      this.dataStore[i] = Math.floor(Math.random()*(this.numElements +1))
   }
   var oFragment = document.createDocumentFragment();
   var box = document.getElementById('show');
   this.dataStore.forEach(function(item,index) {
       var tempDiv = document.createElement('div');
       tempDiv.className='boxitem';
       tempDiv.style.left = index *60 +'px'
       tempDiv.innerHTML = item;
       oFragment.appendChild(tempDiv);
   })
   box.appendChild(oFragment)
}

function clear() {
   for(var i=0;i<this.dataStore.length;++i) {
        this.dataStore[i] = 0;
   }
}

function insert(element) {
    this.dataStore[this.pos++]  = element;
}

function toString() {
   var restr = "";
   for(var i =0;i<this.dataStore.length;++i) {
         restr += this.dataStore[i]+" ";
         if(i>0 && i%10 == 0) {
            restr += "\n";
         }
   }
   return restr;
}

function swap(arr,index1,index2){
   var temp = arr[index1];
   arr[index1] = arr[index2];
   arr[index2] = temp;
}
