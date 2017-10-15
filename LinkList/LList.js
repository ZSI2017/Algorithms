function Node(element) {
   this.element = element;
   this.next = null;
}

function LList(){
    this.head= new Node('head');
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}

function remove(item) {
   var prevNode = this.findPrevious(item);
   if(!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next;
   }
}

function findPrevious(){
   var currNode = this.head;
   while(!(currNode。next))
}
