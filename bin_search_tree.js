function Node(data) {
    return {
        data: data,
        left: null,
        right: null,
    }
}

function Tree(arr = []) {
    return {
        root: buildTree(arr),
        insert(root, key) {
          if (root === null) {
            return Node(key);
          }

          if (root.data > key) {
            root.left = this.insert(root.left, key)
          } else {
            root.right = this.insert(root.right, key)
          }

          return root
        },
        delete(root, x) {
        if (root === null)
          return root;

        if (root.data > x)
          root.left = delNode(root.left, x);
        else if (root.data < x)
          root.right = delNode(root.right, x);
        else {
          // Node with 0 or 1 child
          if (root.left === null)
            return root.right;
          if (root.right === null)
            return root.left;

          // Node with 2 children
          const succ = getSuccessor(root);
          root.data = succ.data;
          root.right = delNode(root.right, succ.data);
        }
        return root;
      },
      find(value) {
        let root = this.root;

        while (root) {
          if (root.data === value) {
            return root;
          } else if (root.data < value) {
            root = root.right;
          } else if (root.data > value) {
            root = root.left;
          }
        }

        return root;
      },
      levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
          throw new Error("Passed argument is not a function! callback is required");
        }

        if (!this.root) return;

        const queue = [this.root]
        while (queue.length !== 0) {
          let curr = queue.shift();
          callback(curr);
          console.log(curr.data);
          if (curr?.left) {
            queue.push(curr.left);
          }
          if (curr?.right) {
            queue.push(curr.right);
          }
        }
      },
      levelOrderForEachRec(callback) {
        if (typeof callback !== 'function') {
          throw new Error("Passed argument is not a function! callback is required");
        }

        if (!this.root) return;

        const queue = [this.root]
        console.log(this.root.data);
        function rec() {
          if (queue.length === 0) {
            return;
          }

          let curr = queue.shift();
          callback(curr);
          
          if (curr?.left) {
            queue.push(curr.left);
            console.log(curr.left.data);
          }

          if (curr?.right) {
            queue.push(curr.right);
            console.log(curr.right.data);
          }

          rec();
        }
        
        rec();
      },
      preOrderForEach(callback) {
        if (typeof callback !== 'function') {
          throw new Error("Passed argument is not a function! callback is required");
        }

        if (!this.root) return;

        const queue = []

        function rec(root) {
          callback(root);
          queue.push(root);
          console.log(root.data);

          if (root?.left) {
            rec(root.left);
          }

          if (root?.right) {
            rec(root.right);
          }

          return root
        }
        
        rec(this.root);
      },
      inOrderForEach(callback) {
        if (typeof callback !== 'function') {
          throw new Error("Passed argument is not a function! callback is required");
        }

        if (!this.root) return;

        const queue = []

        function rec(root) {
          if (root?.left) {
            rec(root.left);
          }
          
          callback(root);
          queue.push(root);
          console.log(root.data);

          if (root?.right) {
            rec(root.right);
          }

          return root
        }
        
        rec(this.root);
      },
      postOrderForEach(callback) {
        if (typeof callback !== 'function') {
          throw new Error("Passed argument is not a function! callback is required");
        }

        if (!this.root) return;

        const queue = []

        function rec(root) {
          if (root?.left) {
            rec(root.left);
          }

          if (root?.right) {
            rec(root.right);
          }

          callback(root);
          queue.push(root);
          console.log(root.data);

          return root
        }
        
        rec(this.root);
      },
      height(value) {
        let currNode = this.find(value);

        if (!currNode) {
          return null;
        }

        function findHeight(node) {
          if (node === null) return null;
          return 1 + Math.max(findHeight(node.left), findHeight(node.right));
        }

        let height = findHeight(currNode);

        return height
      },
      depth(value) {
        let root = this.root;

        let depth = 0;

        while (root) {
          if (root.data === value) {
            return depth;
          } else if (root.data < value) {
            root = root.right;
            depth++;
          } else if (root.data > value) {
            root = root.left;
            depth++;
          }
        }

        return null;
      },
      isBalanced() {
        let root = this.root;

        const checkBalance = (root) => {
          if (!root.left || !root.right) {
            return
          }
          else if (this.height(root.left.data) + 1 < this.height(root.right.data) 
          || this.height(root.left.data) > this.height(root.right.data) + 1) {
            return false
          }

          checkBalance(root.left);
          checkBalance(root.right)

          return true
        }

        return checkBalance(root)
      }
  }
}

function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null)
        curr = curr.left;
    return curr;
}

function buildTree(arr) {
    arr.sort();
    arr = [...new Set(arr)].sort((a, b) => a - b);

    function sortedArrayToBSTRec(arr, start, end) {
      if (start > end) return null;

      let mid = start + Math.floor((end - start) / 2);
      let root = Node(arr[mid]);

      root.left = sortedArrayToBSTRec(arr, start, mid - 1);
      root.right = sortedArrayToBSTRec(arr, mid + 1, end);

      return root;
    }

    const root = sortedArrayToBSTRec(arr, 0, arr.length - 1);

    return root
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// buildTree([9, 8, 9, 3, 4, 1, 34, 3, 22, 22, 2]);
tree = Tree([9, 8, 9, 3, 4, 1, 34, 3, 22, 22, 2]);
prettyPrint(tree.root);
tree.insert(tree.root, 13);
console.log(tree.root);
prettyPrint(tree.root);
// prettyPrint(tree.root);
console.log(tree.find(13));
console.log(tree.find(15));
console.log(tree.find(30));
console.log(tree.find(34));
console.log(tree.find(8));
tree.levelOrderForEach((node) => {
  node.data *= 2;
  return node;
});
prettyPrint(tree.root);
tree.levelOrderForEachRec((node) => {
  node.data /= 2;
  return node;
});
prettyPrint(tree.root);
// try {
//   tree.levelOrderForEach();
// } catch(e) {
//   console.log(e);
// }
console.log("level order");
tree.levelOrderForEach((node) => {
  return node;
});
console.log("level order rec");
tree.levelOrderForEachRec((node) => {
  return node;
});
console.log("pre order");
tree.preOrderForEach((node) => {
  return node;
});
console.log("in order");
tree.inOrderForEach((node) => {
  return node;
});
console.log("post order");
tree.postOrderForEach((node) => {
  return node;
});

console.log(tree.height(4));
console.log(tree.height(9));
console.log(tree.height(8));
console.log(tree.height(13));
console.log(tree.height(213));
console.log(tree.height(23));

console.log(tree.depth(4));
console.log(tree.depth(9));
console.log(tree.depth(8));
console.log(tree.depth(13));
console.log(tree.depth(213));
console.log(tree.depth(23));

console.log(tree.isBalanced());
tree.insert(tree.root, 36);
console.log(tree.isBalanced());

