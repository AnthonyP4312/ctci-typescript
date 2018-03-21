export class List {
  head = new Node(null);

  // Add element to head of list
  add(data: any) {
    if (!this.head.next) {
      // Empty List
      this.head.next = new Node(data);
    } else {
      this.head.next = new Node(data, this.head.next);
    }
  }

  // Pretty print string
  public toString() {
    const pp = (l: string, n: Node): string => n ? pp(l += n.data + ' ', n.next as Node) : l += ')';
    return pp('( ', this.head.next as Node);
  }

  // Return list length
  get length() {
    const run = (n: Node, s: number): number => n ? run(n.next as Node, ++s) : s;
    return run(this.head.next as Node, 0);
  }

  public includes (data: any) {
    const run = (n: Node): boolean => {
      if (n) {
        return n.data !== data ? run(n.next as Node) : true;
      } else {
        return false;
      }
    };
    return run(this.head.next as Node);
  }

  public reverse() {

  }

  /////////////////////////////////////////////////////////////
  // 2.1 
  // Remove duplicate elements

  // Using a temporary buffer, a Hash Set
  public uniq() {
    const set = new Set();
    const run = (prev: Node, n: Node) => {
      if (!n) {
        return set;
      } else {
        if (set.has(n.data)) {
          prev.next = n.next;
          run(prev as Node, n.next as Node);
        } else {
          set.add(n.data);
          run(n, n.next as Node);
        }
      }
    };
    run(this.head, this.head.next as Node);
  }

  // Only uses the List data structure
  public uniqNoHash() {
    const run = (set: List, prev: Node, n: Node) => {
      if (!n) {
        return set;   
      } else {
        if (set.includes(n.data)) {
          prev.next = n.next;
          run(set, prev as Node, n.next as Node);
        } else {
          set.add(n.data);
          run(set, n, n.next as Node);
        }
      }
    };

    return run(new List(), this.head, this.head.next as Node);
  }

  public uniqInPlace() {
    const run = (n: Node, prev: Node, matcher: Node): void => {
      if (!n) return;
      if (!matcher) {
        if (n.next) {
          run(n.next, n.next, n.next.next as Node);
        }
      } else {
        if (n.data === matcher.data) {
          // Remove matched element
          prev.next = matcher.next;
          run(n, prev, matcher.next as Node);
        } else {
          run(n, matcher, matcher.next as Node);
        }
      }
    };
    run(this.head, this.head, this.head.next as Node);
  }

  ///////////////////////////////////////////////////////////////
  // 2.2
  // Return the element k - 1 nodes from the last
  public fromLast(k: number) {
    const run = (slow: Node, fast: Node): Node => fast ? run(slow.next as Node, fast.next as Node) : slow;
    let fastNode = this.head.next; 
    for (let i = 0; i < k; i++) {
      if (fastNode) {
        fastNode = fastNode.next as Node;
      } else {
        throw new Error('Out of Bounds');
      }
    }
    return run(this.head.next as Node, fastNode as Node);
  }

  /////////////////////////////////////////////////////////////////
  // 2.4
  // Partition around a value. All nodes less than value come before, 
  public partition(data: any) {
    const run = (p: Node, n: Node) => {
      if (!n) return;
      if (n.data < data) {
        p.next = n.next;
        this.add(n.data);
        if (p === this.head) {
          p = p.next as Node;
        }
        run(p, p.next as Node);
      } else {
        run(n, n.next as Node);
      }
    };
    run(this.head, this.head.next as Node);
  }

  ////////////////////////////////////////////////////////////////////////
  // 2.6 Determine is list is a palindrome
  public isPalindrome() {
    let half = 0;
    let m = this.head as Node;
    let palindrome = true;
    const run = (n: Node, length: number) => {
      if (n && n.next) {
        run(n.next, ++length);
      } else {
        half = Math.floor(length / 2);
      }

      if (length >= half) {
        m = m.next as Node;
        if (m.data !== n.data) {
          palindrome = false;
        }
      }
    };
    run(this.head.next as Node, 0);
    return palindrome;
  }

  public loopHead(){
    const set = new Set();
    let corrupt = false;
    const run = (n: Node): Node | undefined => {
      if (set.has(n)) return n;
      set.add(n);
      if (n.next === undefined) {
        return;
      }
      return run(n.next as Node);
    };
    return run(this.head.next as Node);
  }
}

export class Node {
  constructor(
    public data: any,
    public next?: Node
  ) { }
}

////////////////////////////////////////////////////////////////
// 2.3
// Remove any middle node, given only access to that node
export function removeMiddle(node: Node) {
  if (!node || !node.next) {
    throw new Error('Not a middle node');
  }
  const run = (p: Node, n: Node) => {
    if (n) {
      p.data = n.data;
      if (n.next) {
        run(n, n.next as Node);
      } else {
        delete p.next;
      }
    }
  };
  run(node, node.next as Node);
}

//////////////////////////////////////////////////////////////////////
// 2.5
// Sum list where each element is a digit
export function sumReverse(list_a: List, list_b: List) {
  const sum = new List();
  const run = (a: Node, b: Node, carry: number, sumNode: Node) => {
    if (!a && !b && carry === 0) return;
    if (!a) a = { data: 0 };
    if (!b) b = { data: 0 };
    const digitSum = (a.data + b.data + carry) % 10;
    const newCarry = ((a.data + b.data + carry) - digitSum) / 10;
    sumNode.next = new Node(digitSum);
    run(a.next as Node, b.next as Node, newCarry, sumNode.next);
  };
  run(list_a.head.next as Node, list_b.head.next as Node, 0, sum.head);
  return sum;
}

export function sumList(list_a: List, list_b: List) {
  const sum = new List();
  const len_a = list_a.length;
  const len_b = list_b.length;
  let carry = 0;

  console.log(len_a);
  console.log(len_b);
  if (len_a > len_b) {
    for (let i = 0; i < len_a - len_b; i++) {
      list_b.add(0);
    }
  } else {
    for (let i = 0; i < len_b - len_a; i++) {
      list_a.add(0);
    }
  }

  const run = (a: Node, b: Node) => {
    if (!a && !b && carry === 0) return;
    if (!a) a = { data: 0 };
    if (!b) b = { data: 0 };
    run(a.next as Node, b.next as Node);

    const digitSum = (a.data + b.data + carry) % 10;
    carry = ((a.data + b.data + carry) - digitSum) / 10;
    sum.add(digitSum);
  };
  run(list_a.head.next as Node, list_b.head.next as Node);

  if (carry > 0) {
    sum.add(carry);
  }
  return sum;
}

//////////////////////////////////////////////////////////////////////////////
// 2.7 Test if two lists intersect
export function intersect(a: List, b: List) {
  const run = (n: Node, m: Node): boolean  => {
    if (n.next === undefined && m.next === undefined) {
      return m === n;
    }
    if (n.next === undefined) return run(n, m.next as Node);
    if (m.next === undefined) return run(n, n.next as Node);
    return run(n.next as Node, m.next as Node);
  };
  return run(a.head.next as Node, b.head.next as Node);
}

export function intersector(a: List, b: List) {
  let intersection;
  const len_a = a.length;
  const len_b = b.length;
  let offset;

  const run = (n: Node, m: Node) => {
    if (n.next === undefined && m.next === undefined) {
      return;
    } else if (n.next === undefined) {
      run(n, m.next as Node);
    } else if (m.next === undefined) {
      run(n.next, m as Node);
    } else {
      run(n.next as Node, m.next as Node);
    }
    if (m === n) {
      intersection = m;
      return;
    } else {
      return;
    }
  };
  let aNode = a.head.next as Node;
  let bNode = b.head.next as Node;
  if (len_a > len_b) {
    for (let i = 0; i < len_a - len_b; i++) {
      aNode = aNode.next as Node;
    }
    run(aNode as Node, bNode as Node);
  } else {
    for (let i = 0; i < len_b - len_a; i++) {
      bNode = bNode.next as Node;
    }
    run(aNode as Node, bNode as Node);
  }
  return intersection;
}

