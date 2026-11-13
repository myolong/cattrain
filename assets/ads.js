// 보상형 광고 도우미 (Google H5 Games Ads, Ad Placement API 구조).
// 쓰는 법: const ok = await window.showRewardedAd('unlock_santa', '산타 모자');  // true면 보상 지급
// 게시자 ID가 없으면 같은 흐름의 가짜 테스트 광고를 띄운다.
(function () {
  const cfg = window.CATTRAIN_ADS || {};
  window.adsbygoogle = window.adsbygoogle || [];
  const adBreak = (window.adBreak = window.adConfig = function (o) { window.adsbygoogle.push(o); });
  const real = !!cfg.client;

  if (real) {
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(cfg.client);
    if (cfg.test !== false) s.setAttribute('data-adbreak-test', 'on');
    document.head.appendChild(s);
    window.adConfig({ preloadAdBreaks: 'on', sound: 'on' });
  }

  const css = `
.adx-back{position:fixed;inset:0;z-index:9999;background:rgba(30,20,10,.72);display:flex;align-items:center;justify-content:center;padding:16px;font-family:inherit}
.adx-box{background:#fff;color:#3b2a20;border-radius:20px;max-width:340px;width:100%;padding:22px 18px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.3)}
.adx-box h3{margin:0 0 6px;font-size:19px}.adx-box p{margin:0 0 14px;color:#8a7566;font-size:14px}
.adx-row{display:flex;gap:8px}.adx-row button{flex:1;border:0;border-radius:12px;padding:12px;font:inherit;font-size:15px;cursor:pointer}
.adx-yes{background:#22a35a;color:#fff}.adx-no{background:#f1e6da;color:#3b2a20}
.adx-fake{position:fixed;inset:0;z-index:10000;background:#222;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-family:inherit}
.adx-fake .tag{position:absolute;top:14px;left:14px;background:#ffd23f;color:#222;border-radius:6px;padding:2px 8px;font-size:12px;font-weight:700}
.adx-fake .close{position:absolute;top:10px;right:12px;background:none;border:0;color:#fff;font-size:15px;opacity:.85;cursor:pointer}
.adx-fake .big{font-size:56px}.adx-fake .count{font-size:15px;opacity:.85}`;
  function addCss() {
    if (document.getElementById('adx-css')) return;
    const st = document.createElement('style');
    st.id = 'adx-css';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // 광고를 볼지 묻는 창. 사용자가 '보기'를 누른 그 클릭에서 광고를 띄워야 한다(정책).
  function ask(label) {
    addCss();
    return new Promise((res) => {
      const back = document.createElement('div');
      back.className = 'adx-back';
      back.innerHTML = '<div class="adx-box"><h3></h3><p>짧은 광고를 끝까지 보면 바로 열려요.</p>' +
        '<div class="adx-row"><button class="adx-no" type="button">다음에</button><button class="adx-yes" type="button">🎬 광고 보기</button></div></div>';
      back.querySelector('h3').textContent = label ? label + ' 열기' : '보상 받기';
      const done = (v) => { back.remove(); res(v); };
      back.querySelector('.adx-yes').onclick = () => done(true);
      back.querySelector('.adx-no').onclick = () => done(false);
      document.body.appendChild(back);
    });
  }

  function notice(text) {
    addCss();
    const back = document.createElement('div');
    back.className = 'adx-back';
    back.innerHTML = '<div class="adx-box"><p></p><div class="adx-row"><button class="adx-no" type="button">확인</button></div></div>';
    back.querySelector('p').textContent = text;
    back.querySelector('button').onclick = () => back.remove();
    document.body.appendChild(back);
  }

  function fakeAd() {
    addCss();
    return new Promise((res) => {
      let left = 5;
      const el = document.createElement('div');
      el.className = 'adx-fake';
      el.innerHTML = '<span class="tag">테스트 광고</span><button class="close" type="button">✕ 닫기</button>' +
        '<div class="big">📺</div><div>여기에 광고가 나와요</div><div class="count"></div>';
      const count = el.querySelector('.count');
      const tick = () => { count.textContent = left > 0 ? left + '초 뒤 보상' : '보상 받기 완료! 닫아 주세요'; };
      tick();
      const timer = setInterval(() => { left--; tick(); if (left <= 0) clearInterval(timer); }, 1000);
      el.querySelector('.close').onclick = () => { clearInterval(timer); el.remove(); res(left <= 0); };
      document.body.appendChild(el);
    });
  }

  // 판과 판 사이 광고(H5 게임 광고 'next'). 구글이 보여 줄지·얼마나 자주·언제 건너뛸 수 있는지를 정한다.
  // 게시자 ID가 없으면 아무것도 안 하고 바로 넘어간다. 광고가 끝나거나 없으면 Promise가 풀린다.
  window.showBreakAd = function (name) {
    if (!real || cfg.breakAd === false) return Promise.resolve(false);
    return new Promise((res) => {
      let started = false, done = false;
      const finish = (v) => { if (!done) { done = true; res(v); } };
      // 광고 스크립트가 막혀 있으면(광고 차단 등) 응답이 없으므로 3초 안에 시작 안 하면 그냥 넘어간다
      setTimeout(() => { if (!started) finish(false); }, 3000);
      adBreak({
        type: 'next',
        name: String(name || 'next').replace(/[^a-z0-9_]/gi, '_'),
        beforeAd() { started = true; },
        afterAd() {},
        adBreakDone(info) { finish(!!(info && info.breakStatus === 'viewed')); },
      });
    });
  };

  window.showRewardedAd = function (name, label) {
    if (!real) {
      return ask(label).then((yes) => (yes ? fakeAd() : false));
    }
    return new Promise((res) => {
      let viewed = false;
      adBreak({
        type: 'reward',
        name: String(name || 'reward').replace(/[^a-z0-9_]/gi, '_'),
        beforeReward(showAdFn) {
          ask(label).then((yes) => { if (yes) showAdFn(); });
        },
        adViewed() { viewed = true; },
        adDismissed() { viewed = false; },
        adBreakDone(info) {
          if (!viewed && info && info.breakStatus !== 'viewed' && info.breakStatus !== 'dismissed' && info.breakStatus !== 'ignored') {
            notice('지금은 볼 수 있는 광고가 없어요. 잠시 뒤 다시 눌러 주세요.');
          }
          res(viewed);
        },
      });
    });
  };
})();
