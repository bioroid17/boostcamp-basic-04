class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.hashcodeList = [];
    this.keyList = [];
    this.valueList = [];
    this.capacity = capacity; // 초기 용량 설정
    this.loadFactor = loadFactor; // 로드 팩터 설정
  }

  #hash(key) {
    const strKey = String(key);
    let hash = 0;
    for (let i = 0; i < strKey.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.capacity;
  }

  #rehashAll() {
    this.hashcodeList = [];
    for (let i = 0; i < this.keyList.length; i++) {
      const key = this.keyList[i];
      const index = this.#hash(key);
      if (this.hashcodeList.includes(index)) {
        this.capacity *= 2; // 용량을 두 배로 증가
        this.#rehashAll(); // 충돌이 발생하면 재해시
        return;
      } else {
        this.hashcodeList.push(index);
      }
    }
  }

  clear() {
    this.hashcodeList = [];
    this.keyList = [];
    this.valueList = [];
    this.capacity = 16; // 초기 용량으로 재설정
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
      const hash = this.#hash(key);
      if (
        this.hashcodeList.includes(hash) ||
        this.size() >= this.capacity * this.loadFactor
      ) {
        this.capacity *= 2; // 용량을 두 배로 증가
        this.#rehashAll(); // 충돌이 발생하거나 해시맵 크기가 일정 이상이 되면 재해시
      }
      this.hashcodeList.push(this.#hash(key));
    }
  }

  remove(key) {
    if (this.containsKey(key)) {
      const index = this.keyList.indexOf(key);
      this.keyList.splice(index, 1);
      this.valueList.splice(index, 1);
      this.hashcodeList.splice(index, 1);
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
hashmap.put("name", "Jack");
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
