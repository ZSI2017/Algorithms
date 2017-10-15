function HashTable() {
   this.table = new Array(137);
   this.simpleHash = simpleHash;
   this.betterHash = betterHash;
   this.showDistro = showDistro;
   this.buildChains = buildChains;

   this.putOpenLink = putOpenLink;

   this.getOpenLink = getOpenLink;

   this.showDistroOpenLink = showDistroOpenLink;
   this.put = put;

   this.putLinear = putLinear;

   this.values = [];
   // this.get = get;
}

function put(data) {
    var pos = this.betterHash(data);
    this.table[pos] = data;
}

function get(key) {
    return this.table[this.betterHash(key)]
}
function simpleHash(data){
    var total = 0;
    for(var i =0;i<data.length;++i){
        total +=data.charCodeAt(i);
    }
    return total%this.table.length;
}

// 使用霍纳算法 求和的时候每次都乘以2一个质数，这样就可以避免发生碰撞
function betterHash(string,arr) {
   const H = 37;
   var total = 0;
   for(var i =0;i<string.length;++i) {
       total += H*total +string.charCodeAt(i);
   }
   total = total % this.table.length;
   if(total < 0) {
      total +=this.table.length -1;
   }
   return parseInt(total);
}

function showDistro(){
    var n = 0;
    for(var i =0;i<this.table.length;i++) {
       if(this.table[i] != undefined) {
          console.log(i +": "+ this.table[i]);
       }
    }
}
/*  散列化一个整型键           */

  // 随机生成一科目的成绩
function getRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

//  随机生成学生信息
function genStuData(arr) {
     for(var i =0;i<arr.length;++i) {
        var num = "";
        for(var j =1;j<=9;++j) {
           num +=Math.floor(Math.random()*10);
        }
        num += getRandomInt(50,100);
        arr[i] = num;
     }
}

// 开链法定义
function buildChains() {
    for(var i =0;i<this.table.length;++i) {
        this.table[i] = new Array();
    }
}

function showDistroOpenLink(){
     var n =0;
     for(var i =0;i<this.table.length;++i) {
        //  console.log(this.table[i][0])
        //  console.log("------------------------");
        if(this.table[i][0] != undefined) {
          console.log(i +":"+this.table[i]);
        }
     }
}

function putOpenLink(data) {
    // var pos = this.betterHash(data);
    var pos = this.simpleHash(data);
    var index= 0;
    if(this.table[pos][index] == undefined) {
       this.table[pos][index] = data;
    }
    else {
      ++index;
      while(this.table[pos][index] != undefined) {
         ++ index;
      }
      this.table[pos][index]= data;
    }
}

function getOpenLink(key) {
     var index =0;
     var hash = this.betterHash(key);
     if(this.table[pos][index] = key){
         return this.table[pos][index+1];
     }else {
         index +=2;
         while(this.table[pos][index] != key) {
           index += 2;
         }
         return this.table[pos][index+1];
     }
   return undefined;
}

function buildChains() {
   for(var i =0;i<this.table.length;++i){
       this.table[i] = new Array()
   }
}

// 线性探测法
/*
   选择哪种碰撞解决方式：
         如果数组的大小是待存储数据个数的1.5 倍，就使用开链法
         如果数组的大小是待存储数据的两倍及两倍以上时，那么使用线性探测法
*/
function putLinear(data) {
   var pos = this.betterHash(data);
   console.log(this.table[pos]);
   console.log(data)
  if(this.table[pos] == undefined) {
       this.table[pos] = data�  	  �    �     -  �    �  �S�tep<�|����c$U�����)}m �a�hhUv�8�#�1�5�(��,M}��ۺ���W�}*p��� 	�ow��חL��ē�n���WȢ���u%B4����1�i�l�����e׍�.Q�X��O
$���P������F:�E��&��_Pu{�ɛ��h?G�� ���R�%I������<I�;w�%�J���B�q�^�U3�-�m��`�J\Rk�4:e\u�IXp�Y��cS,
ϋ���☄���|�J�����Udb_q �Ö�jC"�/zի%����(��d5�5�c�-�I=,��eᚵ7����`���=7�S9`��<ݠ��LC����5��Fr�;�&(�23ă�FZp�&�jl(J�g�%�e^X�}q}���-6��O���,lϛጅ�+�dE�CBY��a�������=;���