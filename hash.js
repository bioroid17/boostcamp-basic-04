class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.keyList = [];
    this.valueList = [];
    this.capacity = capacity; // 초기 용량 설정
    this.loadFactor = loadFactor; // 로드 팩터 설정
  }

  // private 메소드
  #hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    console.log(`key: ${key}, hash: ${hash}`);
    return hash % this.capacity;
  }

  clear() {
    this.keyList = [];
    this.valueList = [];
  }

  containsKey(key) {
    const index = this.keyList.indexOf(this.#hash(key));
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  get(key) {
    if (this.containsKey(key)) {
      const index = this.keyList.indexOf(this.#hash(key));
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

    if (this.size() >= this.capacity * this.loadFactor) {
      this.capacity *= 2; // 용량을 두 배로 증가
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
