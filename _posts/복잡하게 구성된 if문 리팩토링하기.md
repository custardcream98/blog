---
title: "복잡하게 구성된 if문 리팩토링하기"
excerpt: "연구실 과제용 웹페이지 개발중 복잡한 모양의 if else 구문이 필요한 경우가 있었는데, 어떻게 하면 더 보기 좋은 코드가 될지 고민했습니다."
date: "2022-11-05"
category: ["TypeScript"]
series: "Refactoring"
---

> 연구실 과제용 웹페이지 개발중 복잡한 모양의 if else 구문이 필요한 경우가 있었는데, 어떻게 하면 더 보기 좋은 코드가 될지 고민했습니다.

# 리팩토링할 코드

연구실 과제로 개발중인 설문 페이지에서는 사용자가 입력한 답안이 유효한지 여부를 판단하는 로직이 들어갑니다.

그 중, 숫자를 하나 받아 숫자의 크기에 따라 증감된 값을 리턴하는 함수가 필요했습니다. 실제 코드는 아래와 같습니다.

```ts
/**
 * 1 미만 여부 확인하여 increasedElement, decreasedElement 계산하는 함수
 */
function getChangedRowDelta(numToChange: number): {
  increasedElement: number;
  decreasedElement: number;
} {
  let isInversed = false;

  if (numToChange < 1) {
    isInversed = true;
    numToChange = 1 / numToChange;
  }

  let increasedElement = numToChange,
    decreasedElement = numToChange;

  if (numToChange === 1) {
    increasedElement++;
    decreasedElement /= 2;
  } else if (numToChange >= 8) {
    if (isInversed) {
      decreasedElement = 9;
      increasedElement--;
    } else {
      increasedElement = 9;
      decreasedElement--;
    }
  } else if (numToChange <= 2) {
    if (isInversed) {
      decreasedElement++;
      increasedElement = 1;
    } else {
      increasedElement++;
      decreasedElement = 1;
    }
  } else {
    if (isInversed) {
      decreasedElement++;
      increasedElement--;
    } else {
      increasedElement++;
      decreasedElement--;
    }
  }

  return isInversed
    ? {
        increasedElement: 1 / increasedElement,
        decreasedElement: 1 / decreasedElement,
      }
    : {
        increasedElement,
        decreasedElement,
      };
}
```

`numToChange`라는 변수 하나를 가지고, 역수인지 여부를 판단 후 (역수라면 분모가) 1 ~ 9 범위 내에서 증감하도록 하는 코드입니다.

다중 `if else`문이 들어가는 탓에 보기에 굉장히 복잡합니다. 어떻게 하면 `if else`문을 제거하고 가독성을 높일 수 있을까요?

# 조건문 클린코딩 방법

리팩토링에 앞서 조건문과 관련된 클린코딩 기법, 설명들을 찾아봤습니다.

아래의 예제들은 [Clean Code In A Nutshell](https://brentmarquez.com/in-a-nutshell-series/clean-code/)에 있는 코드입니다.

## 단순한 조건문이라면 삼항 연산자를 사용하자!

```js
// 아래의 방법 보다는
if (user.id) {
  userLoggedIn = true;
} else {
  userLoggedIn = false;
}

// 이렇게 적는게 보기 좋습니다.
userLoggedIn = user.id ? true : false;
```

단순한 조건문이라면 조건문을 사용하기보다 삼항 연산자로 바꿔쓰는게 좋습니다.

> 삼항 연산자는 다중으로 쓰지 말아요!

## 하나의 코드블록으로 이뤄진 다중 조건문을 피하자!

코딩을 하다보면 특정 값이 nullish한지 여부를 확인하는 로직이 자주 필요합니다. 이 때 하나의 코드블록 (if문 만으로 이뤄진)으로 구성된 다중 조건문을 작성하기 쉽상인데요, 이럴땐 아래의 테크닉을 사용하도록 합니다.

```js
// 하나의 코드블록으로 이뤄진 조건문일 경우
if (user) {
  if (user.id) {
    // ...
  }
}

// 테크닉1: && 연산자를 사용하자!
if (user && user.id) {
  // ...
}

// 테크닉2: 함수 안에서라면
// 필요한 값이 nullish한지 확인 후 빨리 리턴시켜버리자!
function verifyUser(user) {
  if (!user || !user.id) {
    return;
  }
  // ...
}
// 이렇게 하면 if문을 한 겹 벗겨낼 수 있다는 장점도 있다.
```

## 특정 조건이 다중 조건문에서 반복적으로 나오면 논리 연산자로 줄이자!

```js
if (userIsGoldMember) {
  if (itemsInCart) {
    applyDiscount = true;
  }
}
if (totalCost > 100) {
  if (itemsInCart) {
    applyDiscount = true;
  }
}

// 리팩토링
applyDiscount = itemsInCart && (totalCost > 100 || userIsGoldMember);
```

위 예제에서는 할인 여부를 판단하기 위한 조건문이 공통된 `if` 조건문을 가지고 있습니다. 이럴 경우 공통된 부분을 밖으로 빼고, `&&`과 `||` 연산자를 적절히 사용해 이렇게 간결하게 나타낼 수 있습니다.

## 복잡한 계산이 필요한 조건은 함수로 분리하자!

```js
// 아래의 조건문은 복잡한 시간 계산식이 들어가있다.
if (Date.now() >= new Date(2022, 10, 5).getTime() + 24 * 60 * 60 * 1000) {
  // ...code
}

// 이렇게 복잡한 계산이 필요한 조건은
// boolean 값을 리턴하는 함수로 분리해 작성하고,
// 함수의 이름으로 어떤 조건을 확인하는 것인지 설명하는 것이 좋다.
const isNowLaterThan24HoursAfter = (datetime) => {
  const twentyFourHours = 24 * 60 * 60 * 1000;
  return Date.now() >= datetime + twentyFourHours;
};

const deadline = new Date(2022, 10, 5).getTime();

if (isNowLaterThan24HoursAfter(deadline)) {
  // ...code
}
```

> 이 규칙에서 저는 '클린 코드란 코드를 줄이는 것이 아닌 가독성과 유지보수성을 향상시키고자 하는 과정'임을 알 수 있었습니다!

# 적용해보기

## 코드 전반부

**클린코드 전**

```js
let isInversed = false;

if (numToChange < 1) {
  isInversed = true;
  numToChange = 1 / numToChange;
}
```

**클린코드 후**

```js
let isInversed = numToChange < 1;
numToChange = isInversed ? 1 / numToChange : numToChange;
```

## 코드 후반부

**클린코드 전**

```js
let increasedElement = numToChange,
  decreasedElement = numToChange;
if (numToChange === 1) {
  increasedElement++;
  decreasedElement /= 2;
} else if (numToChange >= 8) {
  if (isInversed) {
    decreasedElement = 9;
    increasedElement--;
  } else {
    increasedElement = 9;
    decreasedElement--;
  }
} else if (numToChange <= 2) {
  if (isInversed) {
    decreasedElement++;
    increasedElement = 1;
  } else {
    increasedElement++;
    decreasedElement = 1;
  }
} else {
  if (isInversed) {
    decreasedElement++;
    increasedElement--;
  } else {
    increasedElement++;
    decreasedElement--;
  }
}
```

**클린코드 1단계 후**

*단순한 조건문이라면 삼항 연산자를 사용하자!*는 법칙에 따라 아래처럼 바꿨습니다.

```js
let increasedElement = numToChange,
  decreasedElement = numToChange;
if (numToChange === 1) {
  increasedElement++;
  decreasedElement /= 2;
} else if (numToChange >= 8) {
  increasedElement = isInversed ? increasedElement - 1 : 9;
  decreasedElement = isInversed ? 9 : decreasedElement - 1;
} else if (numToChange <= 2) {
  increasedElement = isInversed ? 1 : increasedElement + 1;
  decreasedElement = isInversed ? decreasedElement + 1 : 1;
} else {
  increasedElement = isInversed ? increasedElement - 1 : increasedElement + 1;
  decreasedElement = isInversed ? decreasedElement + 1 : decreasedElement - 1;
}
```

여전히 부족한 부분이 보입니다. 한번 더 리팩토링해보겠습니다.

**클린코드 2단계 후**

필요없는 변수(`increasedElement`, `decreasedElement`) 제거하고, 범위를 판단하는 부분을 배열로 변경해 구간 순서대로 직관적으로 볼 수 있도록 했습니다.

이 때, 배열 안에 수식이 위치하면 가독성에 문제가 생길것을 감안해 `numToChange`의 증감 값을 나타내는 `increasedNum`, `decreasedNum` 상수를 추가 선언했습니다.

또한, `numToChange === 1`인 경우 빠르게 결과를 리턴해 이후 이 경우의 수는 생각하지 않아도 되게끔 했습니다.

```js
const increasedNum = numToChange + 1,
  decreasedNum = numToChange - 1;

if (numToChange === 1) {
  return {
    increasedElement: increasedNum,
    decreasedElement: numToChange / 2,
  };
} // early return

const numInRange = [numToChange >= 8, numToChange < 8 && numToChange > 2, numToChange <= 2];
// 0, 1, 2번째 구간으로 나눠 직관적으로 판단
const rangeIndex = numInRange.indexOf(true);

// 범위별로 증감, 값 부여 판단에 사용되는 배열
const incrementArr = [9, increasedNum, increasedNum];
const decrementArr = [decreasedNum, decreasedNum, 1];

if (isInversed) {
  return {
    increasedElement: 1 / decrementArr[rangeIndex],
    decreasedElement: 1 / incrementArr[rangeIndex],
  };
}

return {
  increasedElement: incrementArr[rangeIndex],
  decreasedElement: decrementArr[rangeIndex],
};
```

# 클린 코드가 문제가 아니다

이렇게 중첩된 조건문을 많이 제거하고, 꽤 '고급 기술처럼 보이는' 코드를 짰습니다. 그런데, 그래도 반복되는 코드가 계속 눈에 밟혔습니다.

_내가 지금 비효율적인 로직을 짠게 아닐까?_

그렇게 뚫어져라 쳐다보다가, 중요한 사실을 하나 깨달았습니다. 저 코드는 필요없는 판단을 포함하고 있었습니다.

문제를 발견한 부분은 이곳입니다.

```js
const numInRange = [numToChange >= 8, numToChange < 8 && numToChange > 2, numToChange <= 2];
const rangeIndex = numInRange.indexOf(true);

const incrementArr = [9, increasedNum, increasedNum];
const decrementArr = [decreasedNum, decreasedNum, 1];

// ...

return {
  increasedElement: incrementArr[rangeIndex],
  decreasedElement: decrementArr[rangeIndex],
};
```

`numToChange`에 따라 숫자 범위마다 인덱스를 부여하고 `incrementArr`, `decrementArr`에 인덱스와 매치해 결과값을 얻고자 한 부분입니다.

하지만 잘 생각해보면 리턴의 `increasedElement`를 얻기 위해 필요한 판단은 `numToChange >= 8` 뿐입니다. 마찬가지로 `decreasedElement`를 얻기 위해 필요한 판단은 `numToChange <= 2` 뿐이고요.

이런 아이디어에 기반해 최종적으로 아래의 코드가 됐습니다.

```js
if (numToChange === 1) {
  return {
    increasedElement: numToChange + 1,
    decreasedElement: numToChange / 2,
  };
} // early return

const decreasedNum = numToChange < 2 ? 1 : numToChange - 1;
const increasedNum = numToChange > 8 ? 9 : numToChange + 1;

if (isInversed) {
  return {
    increasedElement: 1 / decreasedNum,
    decreasedElement: 1 / increasedNum,
  };
}

return {
  increasedElement: increasedNum,
  decreasedElement: decreasedNum,
};
```

완성된 함수의 전체적인 모습은 다음과 같습니다. [처음](#리팩토링할-코드)에 비하면 훨씬 간결한 모습입니다.

```ts
function getChangedRowDelta(numToChange: number): {
  increasedElement: number;
  decreasedElement: number;
} {
  let isInversed = numToChange < 1;
  numToChange = isInversed ? 1 / numToChange : numToChange;

  if (numToChange === 1) {
    return {
      increasedElement: numToChange + 1,
      decreasedElement: numToChange / 2,
    };
  } // early return

  const decreasedNum = numToChange < 2 ? 1 : numToChange - 1;
  const increasedNum = numToChange > 8 ? 9 : numToChange + 1;

  if (isInversed) {
    return {
      increasedElement: 1 / decreasedNum,
      decreasedElement: 1 / increasedNum,
    };
  }

  return {
    increasedElement: increasedNum,
    decreasedElement: decreasedNum,
  };
}
```

# 생각 정리

처음 리팩토링을 시작할 때는 조건문을 줄이는데에 치중했지만 그 과정 덕분에 로직의 중복되는 부분을 찾아 더 효율적인 코드를 완성했습니다.

그러나 다음에 다시 비슷한 코드를 마주친다면 무조건 `if else`를 줄이겠다는 시선으로 바라보기보다 **중복되는 판단이 있지는 않은지를 중점적으로 찾아야겠다**는 생각이 들었습니다. 다중 조건문에서 비슷한 코드가 반복된다면 분명 로직이 반복되고 있다는 뜻이라는걸 알았으니까요!
