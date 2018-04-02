import { Stack } from './stack';
import { Node } from './list';

// 3.4
// Queue implemented using two stacks
export class Queue {
  input = new Stack();
  output = new Stack();

  enqueue(data: any) {
    this.input.push(data);
  }

  dequeue() {
    if (this.output.isEmpty()) {
      this.fillOut();
    }
    return this.output.pop();
  }

  peek() {
    if (this.output.isEmpty()) {
      this.fillOut();
    }
    return this.output.peek();
  }

  private fillOut() {
    let val = this.input.pop();
    if (val) {
      this.output.push(val);
      this.fillOut();
    }
  }

  toString() {
    let str = '-> ';
    const runIn = (n: Node | undefined, s: string) => {
      if (n) {
        str = s + n.data + ' ';
        runIn(n.next, str);
      }
    };
    const runOut = (n: Node | undefined) => {
      if (n) {
        runOut(n.next);
        str = str + n.data + ' ';
      }
    };
    runIn(this.input.data.head.next, str);
    runOut(this.output.data.head.next);
    return str + '->';
  }

  isEmpty() {
    return this.input.isEmpty() && this.output.isEmpty();
  }
}

// 3.6

export class AnimalShelter {
  dogs = new Queue();
  cats = new Queue();
  order = 0;

  enqueue(pet: 'cat' | 'dog') {
    if (pet === 'cat') {
      this.cats.enqueue(this.order++);
    } else {
      this.dogs.enqueue(this.order++);
    }
  }

  dequeueCat() {
    return this.cats.dequeue();
  }

  dequeueDog() {
    return this.dogs.dequeue();
  }

  dequeueAny() {
    if (this.cats.peek() > this.dogs.peek()) {
      return this.dequeueCat();
    } else {
      return this.dequeueDog();
    }
  }

  toString() {
    return `
    cats: ${this.cats.toString()}
    dogs: ${this.dogs.toString()}
    `;
  }
}

