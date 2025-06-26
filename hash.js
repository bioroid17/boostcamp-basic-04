class HashMap {
  constructor() {
    this.keyList = [];
    this.valueList = [];
  }
  clear() {
    this.keyList = [];
    this.valueList = [];
  }

  containsKey(key) {
    const index = this.keyList.indexOf(key);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  get(key) {
    if (this.containsKey(key)) {
      const index = this.keyList.indexOf(key);
      return this.valueList[index];
    } else {
      throw new Error("해당 key가 존재하지 않습니다.");
    }
  }

  isEmpty() {
    return this.keyList.length === 0;
  }

  keys() {
    return String(this.keyList);
  }

  put(key, value) {
    if (this.containsKey(key)) {
      const index = this.keyList.indexOf(key);
      this.valueList[index] = value;
    } else {
      this.keyList.push(key);
      this.valueList.push(value);
    }
  }

  remove(key) {
    if (this.containsKey(key)) {
      const index = this.keyList.indexOf(key);
      const removedKey = this.keyList.splice(index, 1);
      const removedValue = this.valueList.splice(index, 1);
    }
  }

  size() {
    return this.keyList.length;
  }
}

const hashmap = new HashMap();
console.log(hashmap);
console.log(hashmap.isEmpty()); // true
hashmap.put("name", "Alice");
hashmap.put("age", 30);
console.log(hashmap);
console.log(hashmap.isEmpty()); // false
console.log(hashmap.size()); // 2
console.log(hashmap.containsKey("age")); // true
console.log(hashmap.get("age")); // 30
console.log(hashmap.containsKey("name")); // true
console.log(hashmap.get("name")); // Alice
console.log(hashmap.keys()); // name,age
hashmap.remove("age");
console.log(hashmap.size()); // 1
console.log(hashmap);
console.log(hashmap.containsKey("age")); // false
hashmap.clear();
console.log(hashmap);
console.log(hashmap.isEmpty()); // true
