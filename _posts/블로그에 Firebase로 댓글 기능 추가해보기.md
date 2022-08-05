---
title: "블로그에 Firebase로 댓글기능 개발하기"
excerpt: "Next.js를 이용해 이쁜 블로그를 개발했는데, 아직 댓글 기능이 없네요. 외부 서비스를 이용하지 않고 직접 개발해보려고 합니다."
date: "2022-08-04"
category: ["Firebase"]
---

> Next.js를 이용해 이쁜 블로그를 개발했는데, 아직 댓글 기능이 없네요. 외부 서비스를 이용하지 않고 직접 개발해보려고 합니다.

# Intro

보통 블로그를 개발할 때 사용하는 댓글 플랫폼으로는 `Utterance`, `Disqus` 등이 있습니다.

![Disqus](../img/블로그에_Firebase로_댓글,_좋아요_기능_추가해보기/Disqus.png)

![Utterance](../img/블로그에_Firebase로_댓글,_좋아요_기능_추가해보기/Utterances.png)

`Utterence`가 이쁘고 `Markdown` 입력도 가능해서 좋은데, 깃헙 로그인만 지원하는 문제가 있습니다. (댓글들은 특정 레포지토리의 issue로 관리된다는 킬러 기능이 있긴 하지만요)

> 로그인 없이, 간단하게 댓글을 남길수만 있었으면 좋겠다!

불필요한 로그인을 강요하고 싶지 않았기에 간단하게 닉네임과 댓글만 입력하면 되는 댓글 기능을 개발해보고자 합니다.

# Firebase

`Firebase`는 구글에서 제공하는 개발 플랫폼입니다. 저는 댓글을 저장하는 Backend로 아주 간편한 `Firestore`를 이용하기로 했습니다.

[`Firebase Console`](https://console.firebase.google.com/)에서 블로그 앱을 추가하며 시작합니다.

## DB Scheme

`Firestore`는 요즘 핫한 `NoSQL` 클라우드 데이터베이스입니다. 일반적인 RDB와는 달리 `Collection`과 `Document`로 구성된 모양인데요, 저는 아래와 같이 설계했습니다.

```code
📁 : Collection
📃 : Document

posts 📁
└───글 이름 📃
    └───comments 📁
        └───random id 📃
            │   comment: 댓글 내용
            │   createdAt: 작성 시간(in milliseconds)
            │   password: 비밀번호
            │   username: 닉네임
```

추후 좋아요 등의 추가 기능이 필요하다면 `comments` collection 내의 docs들에 data를 붙여주면 됩니다.

## 개발 환경 설정

Firestore의 데이터 접근 규칙을 약간 손봐주고, 다음으로 할 일은 블로그에 `firebase` module을 불러오는 일입니다.

```console
npm i firebase
```

저는 아래와 같이 `firebase`와 `firestore`를 initialize하는 코드를 추가했습니다.

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

initializeApp(firebaseConfig);

export const fireStore = getFirestore();
```

`firebaseConfig`에 들어갈 환경변수들은 `.env`로 관리합니다. 추후 Vercel에서 배포할 때 Vercel에 환경변수들을 추가해주면 됩니다. 개발 환경을 위해 로컬에도 `.env`파일을 root 디렉토리에 두었습니다.

> 참고로, `Next.js`에서 환경변수들 중 클라이언트에 노출돼도 되는 값들 앞에는 `NEXT_PUBLIC_`이라고 붙여줘야 합니다. 댓글 개발 시 댓글 데이터에 접근하는 주체는 Web Server가 아닌 클라이언트이므로 저는 이렇게 붙여줬습니다.

## Doc 생성, 수정, 삭제

이것 또한 정말 간단합니다. 예시로 Comment를 추가하는 코드를 보여드리겠습니다.

```ts
const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
  const commentCollectionRef = collection(
    fireStore,
    COLLECTION_POSTS,
    title,
    COLLECTION_COMMENTS
  );
  await addDoc(commentCollectionRef, {
    createdAt: Date.now(),
    password,
    comment,
    username,
  });
};
```

눈여겨 보실 부분은 `commentCollectionRef`입니다. `collection`, `doc`, `collection`, ... 이 반복돼 `collection reference`를 선언하고, 여기에 추가할 `doc`을 `object`형태로 넘겨주면 됩니다.

삭제나 수정 또한 간단합니다.

```ts
const commentDocRef = doc(
  fireStore,
  COLLECTION_POSTS,
  title,
  COLLECTION_COMMENTS,
  comment.id
);
await deleteDoc(commentDocRef); // doc 삭제
await updateDoc(commentDocRef, { comment: commentText }); // doc 수정
```

생성과는 달리 `collection`이 아닌 특정 `doc`에 대한 레퍼런스를 선언하고, `deleteDoc()`, `updateDoc()` 함수를 사용하면 됩니다. `updateDoc()`에서는 수정되는 `data`만 `object`에 넣어주면 됩니다. (기존에 없던 `key`에 대한 데이터여도 `updateDoc()`을 이용해 추가할 수 있습니다.)

## Doc 실시간 업데이트

`Firestore`의 강력한 기능 중 하나는 바로 '실시간 업데이트'가 가능하다는 점입니다. 저는 댓글을 불러오는 부분에 아래와 같이 코드를 작성해 실시간으로 수정되는 데이터를 불러오도록 했습니다.

```ts
interface ICommentData {
  id: string;
  comment: string;
  createdAt: number;
  password: string;
  username: string;
}

const [comments, setComments] = useState<ICommentData[]>([]);

useEffect(() => {
  onSnapshot(
    collection(fireStore, COLLECTION_POSTS, title, COLLECTION_COMMENTS),
    (snapshot) => {
      const commentsArr: ICommentData[] = [];
      snapshot.docs
        .sort((post1, post2) =>
          post1.data().createdAt > post2.data().createdAt ? -1 : 1
        )
        .map((doc) =>
          commentsArr.push({ ...(doc.data() as ICommentData), id: doc.id })
        );
      setComments((_) => [...commentsArr]);
    }
  );
}, []);
```

`onSnapshot()` 함수로 실시간 업데이트하길 원하는 `collection`을 지정하면 됩니다. 저는 거기에 더해 댓글을 생성시간순으로 정렬하고, 랜덤으로 생성된 `doc`의 `id`를 추가로 읽어왔습니다.

# 댓글 기능 개발, CSS 작업

이후로는 끝없는 CSS와 기능 개발의 연속입니다. 딱히 어려운 부분이 없는 로직이라 고민 자체는 오래 걸리지 않았는데, 이것 저것 구현할 것이 있다보니 시간이 조금 걸렸습니다.

특히, 비밀번호를 요구해야 하는 부분 때문에 코드가 조금 더러워졌는데, 추후 클린코드 한번 싹 해줘야겠습니다.

자세한 코드는 [본 블로그 레포지토리](https://github.com/custardcream98/custardcream98.github.io)를 참고해주세요.

결과물은 여러분이 보고 계시는 이 아래의 댓글창입니다. 원하던 모습이 나온 것 같아요. 댓글 비밀번호 설정, 수정 혹은 삭제 시 비밀번호 입력 등이 잘 구현돼서 아주 만족합니다. 보안은 취약하지만 이정도면 간단한 블로그 댓글 기능으로 충분합니다.

# ToDos

- 댓글별 좋아요 카운터
- 답글 기능
- 댓글 Pagenation

특히 댓글 Pagenation은 가장 먼저 추가로 개발해야 할 부분입니다. 아직 블로그 글조차 Pagenation이 안되고 있으니, 추후 해당 기능 개발 시에 같이 완성해 나가야겠네요!
