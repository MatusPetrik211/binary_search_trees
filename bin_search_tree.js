function Node() {
    return {
        data,
        left,
        right,
    }
}

function Tree(arr = []) {
    return {
        root,
    }
}

function buildTree(arr) {
    arr.sort();
    arr = [...new Set(arr)].sort((a, b) => a - b);

    console.log(arr);
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

buildTree([9,8,9,3,4,1,34, 3,22, 22, 2]);