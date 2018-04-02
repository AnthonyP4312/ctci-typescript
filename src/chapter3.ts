import { sort, Stacks, Stack, MinStack } from './stack';
import { List } from './list';
import { Queue, AnimalShelter, AnimalShelter2 } from './queue';


let stack = new Stack();
console.log(stack.toString());
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.toString());


let minStack = new MinStack();
console.log(minStack.toString());
minStack.push(3);
minStack.push(2);
minStack.push(1);
minStack.push(4);
console.log(minStack.toString());
console.log(minStack.min());
minStack.pop();
minStack.pop();
console.log(minStack.toString());
console.log(minStack.min());

let stacks = new Stacks(4);
stacks.push(3);
stacks.push(2);
stacks.push(3);
stacks.push(1);
stacks.push(4);
stacks.push(1);
stacks.push(3);
stacks.push(2);
stacks.push(2);
stacks.push(1);
stacks.push(4);
stacks.push(2);
stacks.push(3);
console.log(stacks.toString());
console.log(stacks.popAt(3));
console.log(stacks.toString());

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(3);
console.log(queue.toString());
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.toString());

let unsorted = new Stack();
unsorted.push(8);
unsorted.push(1);
unsorted.push(6);
unsorted.push(8);
unsorted.push(4);
unsorted.push(8);
unsorted.push(2);
console.log(unsorted.toString());
console.log(sort(unsorted).toString());

let shelter = new AnimalShelter();
shelter.enqueue('cat');
shelter.enqueue('dog');
shelter.enqueue('cat');
shelter.enqueue('dog');
shelter.enqueue('dog');
shelter.enqueue('cat');
shelter.enqueue('cat');
shelter.enqueue('dog');
console.log(shelter.toString());


