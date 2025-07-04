# 미션 4

네이버 부스트캠프 [미션 4](https://lucas.codesquad.kr/boostcamp-2025-basic/course/u/%EB%B2%A0%EC%9D%B4%EC%A7%81/%EB%AF%B8%EC%85%984.-%ED%95%B4%EC%8B%9C%EB%A7%B5%EA%B3%BC-%EC%82%AC%EC%A0%84/%ED%95%B4%EC%8B%9C%EB%A7%B5%EA%B3%BC-%EC%82%AC%EC%A0%84) 풀이과정입니다.

## 풀이

HashMap 클래스를 만들어서 문제에서 요구한 함수들을 구현해보려고 했습니다. 클래스 필드는 `hashcodeList`, `keyList`, `valueList`, `capacity`, `loadFactor` 5개가 있습니다. 클래스 메소드는 미션에서 요구한 8개의 메소드를 public으로 만들었고, 추가로 `hash()`, `rehashAll()`를 private으로 만들었습니다.

- JS 클래스에서 메소드 이름 앞에 #을 붙이면 private이 된다고 합니다.

`capacity` 필드는 `bucket`의 크기를, `loadFactor` 필드는 해시맵의 크기와 실제로 저장된 데이터 수의 비율입니다. 만약 해시맵에 저장된 데이터의 수 비율이 `loadFactor`를 넘어가면 `capacity` 필드를 2배로 늘리고 `rehashAll()` 메소드로 해시를 다시 수행합니다.

`hash()` 메소드의 경우 미션에서 나만의 해시 함수를 만들라고 해서 만들었습니다. 다만 해시값을 고유하게 만들어야 할텐데, 이 부분은 Copilot의 도움을 좀 받았네요. 그래도 해시 충돌을 완전히 회피하기엔 부족해서, 만약 `put()` 메소드로 키와 값을 저장하다가 해시 충돌 발생 시 `capacity` 필드를 2배로 늘리고 `rehashAll()` 메소드로 해시를 다시 수행하게 했습니다. 해시 충돌은 `rehashAll()` 메소드 실행 중에도 일어날 수 있으므로, 마찬가지로 `capacity`를 늘리고 다시 해시를 진행할 수 있도록 재귀함수로 구현했습니다.

```js
  ...
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
  ...
```

사실 매번 해시를 다시 하는 것보다 더 좋은 방법이 있을텐데, 구현이 어렵네요 ㅠㅠ
