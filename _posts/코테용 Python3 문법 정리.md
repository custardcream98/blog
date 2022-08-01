---
title: "코테용 Python3 문법 / 모듈 정리"
excerpt: "코딩테스트를 준비하며 정리한 유용한 Python3 문법 / 모듈들입니다."
date: "2022-08-01"
---

> 코딩테스트를 준비하며 정리한 유용한 Python3 문법 / 모듈들입니다.

# input

입력 개수가 한 개여도 `input()`보다 `sys.stdin.readline()`이 더 빠르다.

```python
import sys
a = int(sys.stdin.readline())
li = list(map(int, sys.stdin.readline().split()))
```

타입캐스팅 없이 문자열로 사용할 경우 반드시 `.rstrip()`함수를 호출해 줄바꿈 기호를 제거해야 한다.

# append

빈 리스트에 `append`보다는 초기화된 리스트에 인덱스로 접근해 입력하는것이 더 빠르다.

```python
li = []
for i in range(10):
    li.append(i)
li = [0] * 10
for i in range(10):
    li[i] = i # 이쪽이 더 빠름
```

list.append()의 반환은 `null`이다.

# print

줄바꿈할 때는 print()가 아니라 `\n`을 이용해 한번에 출력하자.

# sorted

`key` 속성으로 정렬 기준을 명시할 수 있다.

```python
result = sorted([("A", 2), ("B", 3), ("C", 1)], key = lambda x: x[1])
# 각 투플의 1번째 원소로 정렬
result = sorted(["aaa", "bb", "c"], key=len)
# 각 원소의 길이로 정렬
```

`reverse` 속성으로 정렬을 뒤집을 수 있다.

`sorted()`보다 `list.sort()`가 더 빠르다. 단, 이 경우 반환값은 null이다.

# itertools

## itertools.permutations

iterable 객체에서 r개의 데이터를 뽑아 일렬로 나열하는 모든 경우(순열)를 계산해준다.

```python
from itertools import permutations
data = ['a', 'b', 'c']
result = list(permutations(data, 3))
```

## itertools.combinations

iterable 객체에서 r개의 데이터를 뽑아 순서를 고려하지 않고 나열하는 모든 경우(조합)를 계산해준다.

```python
from itertools import combinations

data = ['a', 'b', 'c']
result = list(combinations(data, 2))
```

itertools.product

iterable 객체에서 r개의 데이터를 **중복하여** 뽑아 일렬로 나열하는 모든 경우를 계산해준다.

```python
from itertools import product

data = ['a', 'b', 'c']
result = list(product(data, repeat=2))
```

## itertools.combinations_with_replacement

iterable 객체에서 r개의 데이터를 **중복하여** 뽑아 순서를 고려하지 않고 나열하는 모든 경우를 계산해준다.

```python
from itertools import combinations_with_replacement

data = ['a', 'b', 'c']
result = list(combinations_with_replacement(data, 2))
```

# random

`random()`은 0 ~ 1을 리턴한다.

```python
import random
random.random()
```

범위 지정 난수는 `random.randrange(a, b)`이며, a이상 b 미만 난수를 리턴한다.

`random.shuffle(a)`는 iterable 객체 a를 섞는다.

`random.choice(a)`는 iterable 객체 원소 중 하나를 뽑는다.

```python
random.choice([True, False])
```

# collections

## collections.Counter

`dict`를 이용한 카운팅이 필요할 때 써먹으면 아주 유용하다.

```python
def countLetters(word):
    counter = {}
    for letter in word:
        if letter not in counter:
            counter[letter] = 0
        counter[letter] += 1
    return counter

from collections import Counter
Counter('hello world')
countLetters('hello world') # 위와 같다.
```

dictionary를 확장하고 있기 떄문에 dict type의 API를 모두 사용할 수 있다.

`Counter().most_common()` 메서드를 사용하면 데이서 개수가 많은 순으로 정렬된 배열을 리턴한다.

```python
from collections import Counter

Counter('hello world').most_common()
# [('l', 3), ('o', 2), ('h', 1), ('e', 1), (' ', 1), ('w', 1), ('r', 1), ('d', 1)]
Counter('hello world').most_common(1) # 인자로 넘긴 수만큼만 리턴하기도 한다.
# [('l', 3)]
```

## collections.defaultdict

디폴트값이 정해지는 dict

```python
from collections import defaultdict
dic = defaultdict(10) # 없는 키에 대해 접근할 경우 디폴트로 10이 value로 들어감
```

## collections.deque

Queue를 구현할 수 있는 라이브러리이다.

```python
from collections import deque

queue = deque([1, 3, 4])

queue.append(5)
queue.popleft()
queue.reverse()
```

데이터의 삽입, 삭제가 list에 비해 효율적이다.

# dict

## sort

dict를 Key 기준으로 정렬하기 - `dict.items()`는 `[(key, value), ...]` 형식의 Tuple Pair로 이루어진 리스트를 리턴한다.

```python
my_dict = {'c': 3, 'a': 1, 'b': 2, 'e': 1, 'd': 2}

sorted_dict = sorted(my_dict.items())
```

`dict.items()`와 `sort()`의 key 인자를 적절히 사용하여 원하는 정렬이 가능하다.

## 투플 리스트를 이용해 생성

투플로 이뤄진 리스트를 이용해서도 생성할 수 있다. zip() 함수와 같이 이용하면 강력하다.

```python
keys = [1, 2, 3]
values = ["A", "B", "C"]
dict(zip(keys, values))
```

# map(function, iterable)

iterable의 각 원소를 function에 대입해 함수를 실행한다. map을 리턴하므로 list 혹은 tuple로 형변환해 사용해야 한다.

```python
# 리스트에 값을 하나씩 더해서 새로운 리스트를 만드는 작업
myList = [1, 2, 3, 4, 5]

# for 반복문 이용
result1 = []
for val in myList:
    result1.append(val + 1)

# map 함수 이용
def add_one(n):
    return n + 1

result2 = list(map(add_one, myList))  # map반환을 list 로 변환
```

function에 lambda함수도 대입이 가능하다.

```python
list(map(lambda x: x * 2, [5, 4, 3, 2, 1]))
```

# filter(function, iterable)

function의 값에 따라 iterable을 filter하는 함수. filter를 리턴하므로 list 혹은 tuple로 형변환해 사용해야 함.

map과 마찬가지로 lambda함수를 사용하는것이 편할 것.

# zip()

여러개의 iterable들을 인자로 받아 각 객체의 원소를 tuple의 형태로 묶어 iterable로 반환한다.

```python
numbers = [1, 2, 3]
letters = ["A", "B", "C"]
for pair in zip(numbers, letters):
    print(pair)
# (1, 'A')
# (2, 'B')
# (3, 'C')
```

여러 그룹의 데이터를 한 번의 루프로 처리할 수 있다.

```python
for number, upper, lower in zip("12345", "ABCDE", "abcde"):
    print(number, upper, lower)
# 1 A a
# 2 B b
# 3 C c
# 4 D d
# 5 E e
```

zip()을 이용해 묶은 데이터를 다시 해체할 수도 있다.

```python
numbers = (1, 2, 3)
letters = ("A", "B", "C")
pairs = list(zip(numbers, letters))

numbers, letters = zip(*pairs) # unpacking 연산자인 *을 붙이면 된다.
```

# math

## math.floor()

버림

## math.ceil()

올림

# enumerate

예시 보면 바로 알 수 있음 겁나 유용함

```python
a = [1, 2, 3]
for index, item in enumerate(a):
    print(f'인덱스는 {index}, 아이템은 {item}')
```
