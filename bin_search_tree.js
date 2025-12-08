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
    }
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
