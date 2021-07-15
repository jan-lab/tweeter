const keysMatch = function(obj1, obj2, keys) {
  for (const elem of keys) {
    if (obj1[elem] !== obj2[elem]) {
      return false;
    }
  }
  return true;
};

console.log(keysMatch({a: 1, b: 2}, {a: 1}, ['a'])); // => true
console.log(keysMatch({a: 1, b: 2}, {a: 1}, ["a", "b"])); // => false

//It will use the strings to look up the key-value pair in each object and compare the values. If all the values are explicitly equal to each other, return true, otherwise return false.