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
          // throw new Error("Passed argument is not a function! callback is required");
          console.log(typeof callback);
        }

        queue = [this.root]
        while (queue.length !== 0) {
          curr = queue.shift();
          curr = callback(curr);
          if (curr?.left && curr.left !== null) {
            queue.push(curr.left);
          }
          if (curr?.right && curr.right !== null) {
            queue.push(curr.right);
          }
        }

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
