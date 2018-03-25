import { List, Node } from './list';

export class Stack {
  data = new List();
  length = 0;

  pop() {
    if (this.data.head.next) {
      const popped = this.data.head.next;
      this.data.head.next = popped.next;
      this.length--;
      return popped.data;
    }
  }

  push(data: any) {
    this.length++;
    this.data.add(data);
    return this;
  }

  peek() {
    if (this.data.head.next) {
      return this.data.head.next.data;
    }
  }

  isEmpty() {
    return !this.data.head.next;  
  }

  toString() {
    if (this.isEmpty()) {
      return '[]';
    } else if (this.data.head.next) {
      const pp = (n: Node, s: string): string => n ? pp(n.next as Node, (s + n.data.toString() + ' ')) : s + ']';
      return pp(this.data.head.next.next as Node, `[ ${this.data.head.next.data.toString()} | `);
    }
  }
}
/////////////////////////////////////////////////////////////////
// 3.2
// Stack with min method
export class MinStack extends Stack {
  minStack = new Stack();

  pop() {
    const popped = super.pop();
    if (popped === this.minStack.peek()) {
      this.minStack.pop();
    }
    return popped;
  }

  push(data: any) {
    if (data < this.minStack.peek() || this.minStack.isEmpty()) {
      this.minStack.push(data);
    }
    return super.push(data);
  }

  min() {
    return this.minStack.peek();
  }
}

//////////////////////////////////////////////////////////////////
// 3.3
// Set of Stacks
export class Stacks {
  set = new List();

  constructor(public size: number) {}
  
  pop(): any {
    const headStack = this.set.at(0) as Stack;
    if (headStack && headStack.length === 0) {
      this.set.remove();
      return this.pop();
    } else {
      return headStack.pop();
    }   
  }

  push(data: any) {
    const headStack = this.set.at(0) as Stack;
    if (headStack && headStack.length < this.size) {
      headStack.push(data);
    } else {
      let newStack = new Stack();
      newStack.push(data);
      this.set.add(newStack);
    }
  }

  peek() {
    const headStack = this.set.at(0) as Stack;
    if (headStack) {
      return headStack.peek();
    }
  }

  isEmpty() {
    return !this.set.head.next;
  }

  toString() {
    return this.set.toString();
  }

  popAt(i: number) {
    const stack = this.set.at(i);
    if (stack) {
      return stack.pop();
    }
  }
}

export function sort(stack: Stack) {
  if (stack.isEmpty()) return stack;
  const tempStack = new Stack();

  const run = (a: Stack, b: Stack, swapped: boolean): Stack => {
    if (swapped) {
      // performed a swap
      swapped = atob(a, b, a.pop());
      return run(a, b, swapped);
    } else {
      // No more swaps, done
      return a;
    }
  };
  return run(stack, tempStack, true);
}

function atob(a: Stack, b: Stack, temp?: any, swapped = false): boolean {
  // console.log('--- ', temp, ' ? ',  a.toString(), b.toString());
  
  if (a.isEmpty()) {
    // console.log('exit call');
    a.push(temp);
    while (!b.isEmpty()) {
      a.push(b.pop());
    }
    // console.log('===', a.toString());
    return swapped;
  }
  if (a.peek() < temp) {
    // console.log('swapped here!');
    b.push(a.pop());
    return atob(a, b, temp, true);
  } else {
    b.push(temp);
    temp = a.pop();
    return atob(a, b, temp, swapped);
  }
}

