
# <<数据结构与算法JavaScript描述>>读书笔记及书中部分源码

包含 书中示例代码 和 部分课后练习解答
对书中一些错误代码进行纠正，保证所有代码都可以运行

![avatar](./name.jpg)

---
  这本书中文字解释和示例代码中有各种错误，有些示例代码都不能正常运行，
  所以读本书的一大乐趣就是可以找出代码中各种bug,
  	[其中一位译者对本书评价](https://www.zhihu.com/question/24763889"评价")  
        总体上看本书适合初学JavaScript，打牢基础，入门数据结构和算法，
            毕竟书中算法的讲解是站在JavaScript的角度，也没有像专业算法数据那样使用伪代码来进行描述  

### 主要内容：
   -  书中第七章开始到后面章节的书中示例代码(已在浏览器中测试运行，修改部分bug)
   - [第十二章排序算法动画实现](./sort/README.md)
   - [汉诺塔动画](./汉诺塔/index.html)
   - 后续更新

 ### 目录结构  
 - ##### [第七章 字典](./Dictionary)
      - [例 7-1 Dictionary](./Dictionary/Dictionary.js)  
      - [例 7-1 Dictionary](./Dictionary/Dictionary.js)  
      - [练习7.4 ](./Dictionary/title1.html)  

- ##### [第八章 散列](./HashTable)
  -  [ 散列 HashTable.js类](./HashTable/HashTable.js)  
  - [ 散列- 碰撞解决- 线性探测法实例](./HashTable/linearProbing.html)  
  -  [ 散列-碰撞解决-开链法- 实例](./HashTable/openLink.html)  
- ##### 第九章 集合
- ##### [第十章 二叉树和二叉查找树](./BST)
  - [二叉查找树 bst.js](./BST/bst.js)
  - [遍历 二叉查找树(前中后序遍历)](./BST/order.html)  
  - [练习10.6 1.节点个数统计](./BST/title1.html)  
- ##### [第十一章 图和图算法](./Graph)
  - [Graph 类](./Graph/Graph.js)  
  - [初始化构建图](./Graph/buildGraph.html)
  - [11.4.1 深度度优先搜索][2]
  - [11.4.2 广度优先搜索][1]
  - ###### 11.5 查找最短路径
    - [例 11-4 查找一个顶点的最短路径(利用bfs)](./Graph/shortestPath.html)
  - [11.6 拓扑排序][1]

- ##### [第十二章 排序算法](./sort)
   - [12.1 数组测试平台](./sort/CArray.js)
   - ###### 12.2 基本排序算法
     - [12.2.1 冒泡排序](./sort/bubbleSort.html)
     - [12.2.2 选择排序](./sort/selectionSort.html)
     - [12.2.2 插入排序](./sort/insertionSort.html)
     - [12.2.4 基本排序算法的计时比较](./sort/compareSort.html)
   - ###### 12.3 高级排序算法
     - [12.3.1 希尔排序](./sort/shellSort.html)
     - [12.3.2 归并排序](./sort/shellSort.html)
     - [12.3.3 快速排序](./sort/quickSort.html)
- ##### 第十三章 检索算法
- ##### [第十四章 高级算法](./senior)
     - [14.1 动态规划][4]
      - [14.1.4 背包问题：动态规划方案](./senior/backpack.html)


[1]: ./Graph/BFS(BreadthFirstSearch).html
[2]: ./Graph/DFS(Depth-First-Search).html
[3]:./Graph/TopologicalSorting(拓扑排序).html
[4]: ./senior/DP(dynamicProgramming).html
