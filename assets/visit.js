// 하루 접속자 수 세기용 (운영자만 봄). 이 브라우저에만 저장되는 무작위 번호를 서버에 보낸다. 이름·연락처는 보내지 않는다.
// 운영자 기기(?owner=on)는 세지 않는다.
(function () {
  var SERVER = 'https://nyangnyang-cattrain.fly.dev';
  var vid = '', owner = false;
  try {
    vid = localStorage.getItem('ct-vid') || '';
    if (!/^[a-z0-9]{8,32}$/.test(vid)) {
      vid = '';
      for (var i = 0; i < 16; i++) vid += 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)];
      localStorage.setItem('ct-vid', vid);
    }
    var q = new URLSearchParams(location.search);
    if (q.get('owner') === 'on') localStorage.setItem('ct-owner', '1');
    if (q.get('owner') === 'off') localStorage.removeItem('ct-owner');
    if (q.get('key')) localStorage.setItem('ct-owner-key', q.get('key'));
    owner = localStorage.getItem('ct-owner') === '1';
  } catch (e) { return; }
  window.CT_VISIT = { vid: vid, owner: owner };
  if (owner) {
    var show = function () { var a = document.getElementById('owner-stats'); if (a) a.hidden = false; };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
  }
  // 하루에 한 번만 보낸다 (한국 날짜)
  var day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  try { if (localStorage.getItem('ct-vday') === day && !owner) return; } catch (e) {}
  try {
    fetch(SERVER + '/hit?v=' + vid + (owner ? '&o=1' : ''), { mode: 'cors', keepalive: true, cache: 'no-store' })
      .then(function () { try { localStorage.setItem('ct-vday', day); } catch (e) {} }, function () {});
  } catch (e) {}
})();
