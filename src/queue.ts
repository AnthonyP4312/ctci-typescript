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
}

// 3.6
// Actually uses queues
export class AnimalShelter {
  dogs = new Queue();
  cats = new Queue();

  enqueue(pet: 'cat' | 'dog') {
    if (pet === 'cat') {
      this.cats.enqueue(Date.now());
    } else {
      this.dogs.enqueue(Date.now());
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

// Doesnt actually use stacks or queues but uh
// it said I could use the language's List
export class AnimalShelter2 {
  pets: ('cat' | 'dog')[] = [];

  add(pet: 'cat' | 'dog') {
    this.pets.push(pet);
  }

  any() {
    this.pets.splice(0, 1);
  }

  cat() {
    this.pets.splice(this.pets.indexOf('cat'), 1);
  }

  dog() {
    this.pets.splice(this.pets.indexOf('dog'), 1);    
  }

  toString() {
    return `<- ${this.pets.join(', ')} <-`;
  }
}
