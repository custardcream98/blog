---
title: "Git CLI 명령어 정리 1"
excerpt: "매번 Git을 편하게 쓰고 싶어서 GUI로만 다뤄왔는데, Git 명령어를 정리해 CLI 환경에서도 Git을 얼마든지 사용할 수 있게 공부했습니다."
date: "2022-09-01"
category: ["Git"]
---

> 매번 Git을 편하게 쓰고 싶어서 GUI로만 다뤄왔는데, Git 명령어를 정리해 CLI 환경에서도 Git을 얼마든지 사용할 수 있게 공부했습니다.

# Git이란

[공식 문서](https://git-scm.com/docs)

- 소스코드, 파일 등의 변경 내역을 저장하는 **분산 버전 관리 시스템**
- Git을 기반으로 하는 **버전 관리 호스팅 서비스**들이 많이 나와 있습니다. 대표적으로 `GitHub`, `Bitbucket`, `Gitlab` 등이 있습니다.

여기에서는 용어 설명보다는 명령어 위주로 기록하려고 합니다.

# Git을 처음 설치한 경우

```console
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
$ git config --global core.editor "editor 이름"
$ git config --global core.editor "code --wait" # VSC를 기본 에디터로 설정하는 명령어입니다. 이렇게 하면 메세지를 편집할 때 VSC를 사용하게 됩니다.
```

# GitHub 연결

> 2021년 8월 13일부터 비밀번호가 아닌 **token**이나 **SSH**로만 연결이 가능하게 바뀌었습니다. GitHub에서 token을 발급받거나, **SSH** 키를 등록하는 등의 과정을 거쳐야 합니다.

```console
git init
# 로컬에 git 저장소를 생성합니다.

git remote add origin https://github.com/custardcream98/githubtest.git
# https://github.com/custardcream98/githubtest.git 저장소를 origin이라는 이름으로 연결 등록한다는 의미입니다.
# 파일 경로를 입력해 로컬에 위치한 저장소를 연결할수도 있습니다.

git branch -M main
# 로컬 기본 브랜치의 이름을 main으로 바꾼다는 의미입니다.
# git config --global init.defaultBranch main 등의 명령어로 기본 브랜치 이름을 바꿔뒀다면 생략 가능합니다.

git push -u origin main
# origin 원격 저장소의 main 브랜치에 현재 브랜치를 연결합니다.
# -u는 --set-upstream 옵션의 줄임입니다.
```

참고로, `master`라는 기본 브랜치 이름은 `main`으로 바꿔 사용하는 추세라고 합니다. 노예제를 떠올리게 한다는 이유라고 하네요.

## git clone

원격 저장소의 코드를 로컬로 받아오는 명령어입니다.

```console
git clone https://github.com/custardcream98/githubtest.git .
# 마지막에 붙는 . 은 현재 폴더에 클론을 받는다는 의미로, 점을 찍지 않으면 새 폴더를 생성합니다.
# 여기서도 마찬가지로 파일 경로로 로컬에 위치한 저장소를 가져올수도 있습니다.
```

**`git clone`과 `git remote`가 헷갈릴 수 있는데요,** `git remote add origin`는 특정 원격 저장소의 레퍼런스(`origin`)를 만드는 명령어이고, 여기에 `git push -u origin main`을 하면 `origin` 원격 저장소의 `main` 브랜치에 로컬에서 현재 선택돼 있는 브랜치를 연결한다는 의미입니다.

반면 `git clone`은 클론 대상인 원격 저장소를 복사해서 새로운 저장소를 로컬에 생성합니다. 그래서 `git init` 명령어를 사용해 저장소를 새로 시작할 필요가 없습니다. 따라서 타인의 저장소를 클론해 온 후, `git remote add`로 내 저장소와 연결하면 내 저장소에 `push`가 가게 됩니다.

# 자주 쓰이는 명령어

## git pull

원격 저장소에 업데이트 된 데이터를 받아오고, 병합합니다.

```console
git pull origin main
```

### 코드 수정 후 push 하려는데 다른 사람이 이미 push해서 pull 받아야 하는 경우

이 경우 그냥 push하면 pull을 받지 않았기 때문에 오류가 발생합니다. 아래의 방법 중 하나로 병합하면 됩니다.

```console
git pull --no-rebase
# 로컬의 main 브랜치와 원격의 main 브랜치를 다른 브랜치로 보고 병합합니다.

git pull --rebase
# 시간상 순서대로 병합합니다.
```

## git add, commit, push

```console
git add .
git commit -m "커밋 메세지"
git push origin main
```

원격 저장소와 로컬 저장소의 싱크가 맞지 않아 로컬 저장소로 강제로 맞추고 싶다면 아래처럼 `--force` 옵션을 추가하면 됩니다. 혼자만의 저장소일 때만 쓰고, **절대로 협업시에는 사용하면 안됩니다.**

```console
git push --force
```
