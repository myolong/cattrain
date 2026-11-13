// 광고 설정.
// client: 애드센스 승인 후 받은 게시자 ID (예: 'ca-pub-0000000000000000'). 비어 있으면 가짜 테스트 광고를 보여 준다.
// test: true면 구글 광고도 테스트 모드(data-adbreak-test="on")로 불러 수익이 생기지 않는다. 실제 운영 때 false로 바꾼다.
window.CATTRAIN_ADS = {
  client: '',
  test: true,
  // decoFree: true면 꾸미기를 광고 없이 모두 열어 둔다. H5 게임 광고(보상형) 승인이 나면 false로 바꾼다.
  decoFree: true,
  // breakAd: 판이 끝나고 '다시 출발'을 누를 때 판 사이 광고를 부른다 (게시자 ID가 있을 때만).
  breakAd: true,
};
