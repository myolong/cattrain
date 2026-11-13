# 냥이 꼬리기차

대장 냥이가 길 잃은 아기냥이를 모아 줄줄이 기차를 만드는 무료 웹게임.

- 사이트: https://myolong.github.io/cattrain/
- `index.html` 소개, `guide.html` 플레이 방법, `about.html` 소개·문의, `privacy.html` 개인정보처리방침
- `play/` 게임 (`sim.js`는 같이 하기 서버와 같은 규칙 코드)
- `assets/ads.js` 보상형 광고 도우미 (Google H5 Games Ads 구조). `assets/ads-config.js`의 `client`가 비어 있으면 가짜 테스트 광고를 띄운다.
- 같이 하기 서버: Fly.io 도쿄 `nyangnyang-cattrain` (서버 코드는 pet-games 저장소의 `server/`). 사이트 주소를 바꾸면 서버의 허용 주소 목록(ALLOWED_ORIGINS)에도 넣어야 한다.

## 배포
main 브랜치를 GitHub Pages(루트)로 공개한다.

## 애드센스 승인 후 할 일
1. `assets/ads-config.js`에 게시자 ID를 넣고 `test: false`로 바꾼다.
2. 루트에 `ads.txt`를 만든다: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
