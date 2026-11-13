// 입체감 있는 고양이 얼굴 (3D 애니메이션 느낌). 미리 한 번 그려 두고 쓰므로 게임 중 부담은 없다.
// g: 그릴 곳, 가운데 (0,0), 반지름 r. colors: [주 털색, 진한 털색], nose: 코 색(없으면 분홍)

function mix(hex, to, t) {
  const a = parseInt(hex.slice(1), 16), b = parseInt(to.slice(1), 16);
  const r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
  const gg = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
  const bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
  return 'rgb(' + r + ',' + gg + ',' + bl + ')';
}

export function drawCatFace3D(g, r, fur, colors, face, nose) {
  const [m, d] = colors;
  const dark = fur === 'black';
  const line = mix(d, '#000000', dark ? 0.2 : 0.45);
  g.save();
  g.lineJoin = 'round';
  g.lineCap = 'round';

  // 바닥 그림자
  g.save();
  g.fillStyle = 'rgba(40, 60, 30, 0.28)';
  g.beginPath(); g.ellipse(0, r * 0.82, r * 0.82, r * 0.22, 0, 0, 7); g.fill();
  g.restore();

  // 귀 (바깥 → 안쪽 분홍, 위가 밝게)
  for (const s of [-1, 1]) {
    const eg = g.createLinearGradient(0, -r * 1.2, 0, -r * 0.3);
    eg.addColorStop(0, mix(m, '#ffffff', 0.25)); eg.addColorStop(1, mix(m, d, 0.35));
    g.fillStyle = eg;
    g.beginPath();
    g.moveTo(s * r * 0.9, -r * 0.2);
    g.quadraticCurveTo(s * r * 0.95, -r * 0.95, s * r * 0.72, -r * 1.18);
    g.quadraticCurveTo(s * r * 0.4, -r * 0.98, s * r * 0.12, -r * 0.78);
    g.closePath(); g.fill();
    g.strokeStyle = line; g.lineWidth = r * 0.05; g.stroke();
    const ig = g.createLinearGradient(0, -r * 1.05, 0, -r * 0.5);
    ig.addColorStop(0, '#ffc7d2'); ig.addColorStop(1, '#f093a8');
    g.fillStyle = ig;
    g.beginPath();
    g.moveTo(s * r * 0.72, -r * 0.42);
    g.quadraticCurveTo(s * r * 0.76, -r * 0.88, s * r * 0.66, -r * 1.0);
    g.quadraticCurveTo(s * r * 0.45, -r * 0.86, s * r * 0.3, -r * 0.7);
    g.closePath(); g.fill();
  }

  // 머리 기본 색
  const head = () => { g.beginPath(); g.ellipse(0, 0, r, r * 0.9, 0, 0, Math.PI * 2); };
  head(); g.fillStyle = m; g.fill();
  g.save();
  head(); g.clip();
  // 무늬
  if (fur === 'calico') {
    g.fillStyle = '#e08a3c'; g.beginPath(); g.ellipse(-r * 0.62, -r * 0.5, r * 0.62, r * 0.55, 0.3, 0, 7); g.fill();
    g.fillStyle = '#3b3a40'; g.beginPath(); g.ellipse(r * 0.72, -r * 0.42, r * 0.46, r * 0.5, -0.3, 0, 7); g.fill();
  } else {
    g.strokeStyle = mix(d, m, 0.15); g.lineWidth = r * 0.13;
    for (const s of [-1, 0, 1]) { g.beginPath(); g.moveTo(s * r * 0.24, -r * 0.92); g.quadraticCurveTo(s * r * 0.26, -r * 0.72, s * r * 0.2, -r * 0.55); g.stroke(); }
    for (const s of [-1, 1]) {
      g.lineWidth = r * 0.09;
      for (const k of [0, 1]) { g.beginPath(); g.moveTo(s * r * 0.98, -r * 0.05 + k * r * 0.2); g.lineTo(s * r * 0.75, -r * 0.02 + k * r * 0.18); g.stroke(); }
    }
  }
  // 주둥이 (밝고 볼록하게)
  const mg = g.createRadialGradient(0, r * 0.32, r * 0.05, 0, r * 0.32, r * 0.55);
  mg.addColorStop(0, dark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.75)');
  mg.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = mg;
  g.beginPath(); g.ellipse(0, r * 0.32, r * 0.62, r * 0.42, 0, 0, 7); g.fill();
  // 입체 그림자: 위 왼쪽은 밝게, 아래 오른쪽은 어둡게
  const sh = g.createRadialGradient(-r * 0.35, -r * 0.45, r * 0.1, 0, 0, r * 1.15);
  sh.addColorStop(0, 'rgba(255,255,255,0.38)');
  sh.addColorStop(0.45, 'rgba(255,255,255,0)');
  sh.addColorStop(0.8, 'rgba(0,0,0,0.06)');
  sh.addColorStop(1, 'rgba(0,0,0,0.28)');
  g.fillStyle = sh; g.fillRect(-r * 1.2, -r * 1.2, r * 2.4, r * 2.4);
  // 아래쪽 반사광
  const bl = g.createLinearGradient(0, r * 0.5, 0, r * 0.95);
  bl.addColorStop(0, 'rgba(255,255,255,0)'); bl.addColorStop(1, 'rgba(255,255,255,0.18)');
  g.fillStyle = bl; g.fillRect(-r, r * 0.5, r * 2, r * 0.5);
  g.restore();
  // 테두리 (털색보다 조금 진하게)
  head(); g.strokeStyle = line; g.lineWidth = r * 0.06; g.stroke();
  // 위쪽 반짝임
  g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = r * 0.07;
  g.beginPath(); g.ellipse(0, 0, r * 0.84, r * 0.74, 0, Math.PI * 1.12, Math.PI * 1.42); g.stroke();

  // 볼 홍조
  for (const s of [-1, 1]) {
    const cg = g.createRadialGradient(s * r * 0.6, r * 0.3, 0, s * r * 0.6, r * 0.3, r * 0.2);
    cg.addColorStop(0, 'rgba(255,110,140,0.55)'); cg.addColorStop(1, 'rgba(255,110,140,0)');
    g.fillStyle = cg; g.beginPath(); g.arc(s * r * 0.6, r * 0.3, r * 0.2, 0, 7); g.fill();
  }

  // 눈
  const iris = dark ? '#e8c03a' : fur === 'white' || fur === 'snow' ? '#5aa8e0' : fur === 'gray' ? '#6cc070' : '#c98a2a';
  g.strokeStyle = dark ? '#ffe9a0' : '#2b2118';
  g.lineWidth = r * 0.09;
  if (face === 'dizzy') {
    for (const s of [-1, 1]) {
      const ex = s * r * 0.38;
      g.beginPath(); g.moveTo(ex - r * 0.12, -r * 0.12); g.lineTo(ex + r * 0.12, r * 0.08); g.moveTo(ex + r * 0.12, -r * 0.12); g.lineTo(ex - r * 0.12, r * 0.08); g.stroke();
    }
  } else if (face === 'angry' || face === 'grumpy') {
    // 화남: 눈썹이 가운데로 내려온 눈. 짜증: 반쯤 감은 눈으로 옆을 흘겨봄
    for (const s of [-1, 1]) {
      const ex = s * r * 0.38, ey = -r * 0.0;
      g.save();
      g.beginPath();
      if (face === 'angry') { g.moveTo(ex - r * 0.25, ey - r * 0.3 + (s < 0 ? -r * 0.1 : r * 0.1)); g.lineTo(ex + r * 0.25, ey - r * 0.3 + (s < 0 ? r * 0.1 : -r * 0.1)); g.lineTo(ex + r * 0.25, ey + r * 0.3); g.lineTo(ex - r * 0.25, ey + r * 0.3); }
      else g.rect(ex - r * 0.25, ey - r * 0.04, r * 0.5, r * 0.4);
      g.clip();
      g.fillStyle = '#1c1612';
      g.beginPath(); g.ellipse(ex, ey, r * 0.17, r * 0.21, 0, 0, 7); g.fill();
      const px = face === 'grumpy' ? ex + r * 0.06 : ex;
      const ig2 = g.createRadialGradient(px, ey + r * 0.08, 0, px, ey + r * 0.06, r * 0.17);
      ig2.addColorStop(0, iris); ig2.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = ig2; g.beginPath(); g.ellipse(px, ey, r * 0.15, r * 0.19, 0, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(px + r * 0.05, ey + r * 0.05, r * 0.045, 0, 7); g.fill();
      g.restore();
      g.lineWidth = r * 0.075;
      g.beginPath();
      if (face === 'angry') { g.moveTo(ex + s * r * 0.22, ey - r * 0.4); g.lineTo(ex - s * r * 0.2, ey - r * 0.18); }
      else { g.moveTo(ex - r * 0.2, ey - r * 0.04); g.lineTo(ex + r * 0.2, ey - r * 0.04); }
      g.stroke();
    }
    if (face === 'angry') {
      // 이마 위 빨간 화남 표시
      g.save(); g.translate(r * 0.55, -r * 0.55); g.strokeStyle = '#e8352f'; g.lineWidth = r * 0.07;
      for (const [a, b] of [[[-1, -0.35], [-0.35, -1]], [[0.35, -1], [1, -0.35]], [[1, 0.35], [0.35, 1]], [[-0.35, 1], [-1, 0.35]]]) {
        g.beginPath(); g.moveTo(a[0] * r * 0.16, a[1] * r * 0.16); g.quadraticCurveTo(0, 0, b[0] * r * 0.16, b[1] * r * 0.16); g.stroke();
      }
      g.restore();
    } else {
      // 짜증: 이마에 파란 그늘 줄
      g.save(); g.strokeStyle = 'rgba(70,110,200,0.55)'; g.lineWidth = r * 0.045;
      for (const x of [-0.18, 0, 0.18]) { g.beginPath(); g.moveTo(x * r, -r * 0.72); g.lineTo(x * r, -r * 0.45); g.stroke(); }
      g.restore();
    }
  } else if (face === 'cry') {
    // 울음: 꼭 감은 눈과 흘러내리는 눈물
    for (const s of [-1, 1]) {
      const ex = s * r * 0.38;
      g.beginPath(); g.moveTo(ex - r * 0.15, -r * 0.04); g.quadraticCurveTo(ex, r * 0.08, ex + r * 0.15, -r * 0.04); g.stroke();
      g.beginPath(); g.moveTo(ex - s * r * 0.18, -r * 0.24); g.lineTo(ex + s * r * 0.12, -r * 0.16); g.stroke();
      const tg = g.createLinearGradient(0, 0, 0, r * 0.75);
      tg.addColorStop(0, 'rgba(120,200,255,0.95)'); tg.addColorStop(1, 'rgba(120,200,255,0.55)');
      g.fillStyle = tg;
      g.beginPath();
      g.moveTo(ex - r * 0.07, r * 0.06);
      g.quadraticCurveTo(ex - r * 0.1, r * 0.4, ex - r * 0.05, r * 0.72);
      g.quadraticCurveTo(ex, r * 0.8, ex + r * 0.05, r * 0.72);
      g.quadraticCurveTo(ex + r * 0.1, r * 0.4, ex + r * 0.07, r * 0.06);
      g.closePath(); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.8)';
      g.beginPath(); g.ellipse(ex - r * 0.02, r * 0.3, r * 0.02, r * 0.08, 0, 0, 7); g.fill();
    }
    g.strokeStyle = dark ? '#ffe9a0' : '#2b2118';
  } else if (face === 'happy') {
    for (const s of [-1, 1]) { g.beginPath(); g.arc(s * r * 0.38, r * 0.02, r * 0.14, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
  } else {
    for (const s of [-1, 1]) {
      const ex = s * r * 0.38, ey = -r * 0.02;
      g.fillStyle = '#1c1612';
      g.beginPath(); g.ellipse(ex, ey, r * 0.17, r * 0.21, 0, 0, 7); g.fill();
      const ig2 = g.createRadialGradient(ex, ey + r * 0.08, 0, ex, ey + r * 0.06, r * 0.17);
      ig2.addColorStop(0, iris); ig2.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = ig2; g.beginPath(); g.ellipse(ex, ey, r * 0.15, r * 0.19, 0, 0, 7); g.fill();
      g.fillStyle = '#fff';
      g.beginPath(); g.ellipse(ex + r * 0.05, ey - r * 0.08, r * 0.07, r * 0.08, 0, 0, 7); g.fill();
      g.beginPath(); g.arc(ex - r * 0.06, ey + r * 0.09, r * 0.03, 0, 7); g.fill();
    }
  }
  // 코와 입
  const nc = nose || '#f07a92';
  const ng = g.createRadialGradient(-r * 0.03, r * 0.17, 0, 0, r * 0.2, r * (nose ? 0.17 : 0.11));
  ng.addColorStop(0, mix(nc, '#ffffff', 0.45)); ng.addColorStop(1, nc);
  g.fillStyle = ng;
  if (nose) { g.beginPath(); g.arc(0, r * 0.22, r * 0.16, 0, 7); g.fill(); }
  else { g.beginPath(); g.moveTo(-r * 0.1, r * 0.15); g.quadraticCurveTo(0, r * 0.12, r * 0.1, r * 0.15); g.quadraticCurveTo(r * 0.04, r * 0.27, 0, r * 0.28); g.quadraticCurveTo(-r * 0.04, r * 0.27, -r * 0.1, r * 0.15); g.fill(); }
  g.strokeStyle = dark ? '#bbb' : line; g.lineWidth = r * 0.055;
  g.beginPath();
  if (face === 'angry') {
    // 이를 앙다문 입
    g.moveTo(-r * 0.17, r * 0.45); g.quadraticCurveTo(0, r * 0.32, r * 0.17, r * 0.45);
  } else if (face === 'grumpy') {
    // 삐죽한 입
    g.moveTo(-r * 0.15, r * 0.4); g.lineTo(-r * 0.05, r * 0.36); g.lineTo(r * 0.05, r * 0.4); g.lineTo(r * 0.15, r * 0.36);
  } else if (face === 'cry') {
    g.stroke();
    // 엉엉 벌린 입
    g.fillStyle = '#7a2a2a';
    g.beginPath(); g.ellipse(0, r * 0.43, r * 0.12, r * 0.1, 0, 0, 7); g.fill();
    g.fillStyle = '#f07a92';
    g.beginPath(); g.ellipse(0, r * 0.48, r * 0.07, r * 0.04, 0, 0, 7); g.fill();
    g.beginPath();
  } else {
    g.moveTo(0, r * 0.29); g.quadraticCurveTo(-r * 0.08, r * 0.43, -r * 0.2, r * 0.37);
    g.moveTo(0, r * 0.29); g.quadraticCurveTo(r * 0.08, r * 0.43, r * 0.2, r * 0.37);
  }
  g.stroke();
  // 수염
  g.strokeStyle = dark ? 'rgba(255,255,255,0.5)' : 'rgba(90,60,40,0.35)'; g.lineWidth = r * 0.025;
  for (const s of [-1, 1]) for (const k of [-1, 1]) {
    g.beginPath(); g.moveTo(s * r * 0.42, r * 0.3 + k * r * 0.04); g.lineTo(s * r * 0.92, r * 0.24 + k * r * 0.12); g.stroke();
  }
  g.restore();
}
