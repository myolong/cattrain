// 꾸미기: 특별 털색, 모자, 꼬리 장식 그리기와 목록.
// 모자는 머리 중심 (0,0), 반지름 r, 위쪽(-y)이 앞(진행 방향)인 좌표에서 그린다.

export const FUR_COLORS = {
  rudolph: ['#a8754a', '#7a5030'],
  snow: ['#ffffff', '#9fd3f0'],
  gold: ['#ffd54a', '#e0a21a'],
  sakura: ['#ffd3e0', '#f59ab8'],
};
export const NOSE = { rudolph: '#e8352f' };

// 상점 목록: [종류, 키, 이름, 테마]
export const ITEMS = [
  ['hat', 'santa', '산타 모자', 'xmas'],
  ['hat', 'antler', '루돌프 뿔', 'xmas'],
  ['hat', 'party', '새해 고깔', 'newyear'],
  ['hat', 'jobawi', '설날 조바위', 'newyear'],
  ['hat', 'gat', '선비 갓', 'korea'],
  ['hat', 'sakura', '벚꽃 머리띠', 'world'],
  ['hat', 'cowboy', '카우보이', 'world'],
  ['hat', 'beret', '베레모', 'world'],
  ['hat', 'sombrero', '솜브레로', 'world'],
  ['fur', 'rudolph', '루돌프', 'xmas'],
  ['fur', 'snow', '눈송이', 'xmas'],
  ['fur', 'gold', '황금 복냥', 'newyear'],
  ['fur', 'sakura', '벚꽃', 'world'],
  ['tail', 'lights', '반짝이 전구', 'xmas'],
  ['tail', 'snow', '눈송이', 'xmas'],
  ['tail', 'firework', '새해 불꽃', 'newyear'],
  ['tail', 'saekdong', '색동 띠', 'korea'],
  ['tail', 'petals', '벚꽃잎', 'world'],
  ['tail', 'stars', '별 반짝', 'world'],
];
export const THEMES = {
  xmas: ['크리스마스', '#e23b3b'],
  newyear: ['연말·설날', '#7a5ae0'],
  korea: ['한국', '#2a7ae0'],
  world: ['세계', '#2fae8f'],
};

export const HATS = {
  santa(g, r) {
    g.fillStyle = '#e23b3b'; g.beginPath(); g.moveTo(-r * 0.75, -r * 0.7); g.quadraticCurveTo(-r * 0.1, -r * 2.0, r * 0.95, -r * 1.35); g.quadraticCurveTo(r * 0.4, -r * 1.2, r * 0.75, -r * 0.7); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(0, -r * 0.72, r * 0.85, r * 0.2, 0, 0, 7); g.fill();
    g.beginPath(); g.arc(r * 0.98, -r * 1.33, r * 0.2, 0, 7); g.fill();
  },
  antler(g, r) {
    g.strokeStyle = '#8a5a2b'; g.lineWidth = r * 0.13; g.lineCap = 'round';
    for (const s of [-1, 1]) {
      g.beginPath(); g.moveTo(s * r * 0.35, -r * 0.8); g.lineTo(s * r * 0.55, -r * 1.55);
      g.moveTo(s * r * 0.45, -r * 1.15); g.lineTo(s * r * 0.85, -r * 1.3);
      g.moveTo(s * r * 0.52, -r * 1.4); g.lineTo(s * r * 0.3, -r * 1.7); g.stroke();
    }
    g.fillStyle = '#2f9e4f'; g.beginPath(); g.ellipse(0, -r * 0.82, r * 0.5, r * 0.1, 0, 0, 7); g.fill();
    g.fillStyle = '#e23b3b'; g.beginPath(); g.arc(0, -r * 0.84, r * 0.1, 0, 7); g.fill();
  },
  party(g, r) {
    g.save(); g.beginPath(); g.moveTo(-r * 0.45, -r * 0.75); g.lineTo(r * 0.05, -r * 1.85); g.lineTo(r * 0.45, -r * 0.75); g.closePath(); g.clip();
    const cs = ['#5a8dee', '#ffcf3f', '#e05a9b', '#2fae8f'];
    for (let i = 0; i < 6; i++) { g.fillStyle = cs[i % 4]; g.fillRect(-r, -r * 0.75 - (i + 1) * r * 0.2, r * 2, r * 0.2); }
    g.restore();
    g.fillStyle = '#ffcf3f'; g.beginPath(); g.arc(r * 0.05, -r * 1.88, r * 0.14, 0, 7); g.fill();
  },
  jobawi(g, r) {
    g.fillStyle = '#2b2530'; g.beginPath(); g.ellipse(0, -r * 0.78, r * 0.82, r * 0.36, 0, Math.PI, 0); g.fill();
    g.fillStyle = '#d93a5a'; g.fillRect(-r * 0.82, -r * 0.82, r * 1.64, r * 0.12);
    g.fillStyle = '#ffcf3f'; for (const s of [-1, 0, 1]) { g.beginPath(); g.arc(s * r * 0.45, -r * 0.98, r * 0.08, 0, 7); g.fill(); }
    // 술은 얼굴을 가리지 않게 옆으로 늘어뜨린다
    g.strokeStyle = '#e05a9b'; g.lineWidth = r * 0.07; g.beginPath(); g.moveTo(r * 0.6, -r * 0.95); g.quadraticCurveTo(r * 1.0, -r * 0.6, r * 0.98, -r * 0.2); g.stroke();
    g.fillStyle = '#e05a9b'; g.beginPath(); g.ellipse(r * 0.98, -r * 0.12, r * 0.08, r * 0.14, 0, 0, 7); g.fill();
  },
  gat(g, r) {
    g.fillStyle = 'rgba(30,26,30,.85)'; g.beginPath(); g.ellipse(0, -r * 0.82, r * 1.25, r * 0.22, 0, 0, 7); g.fill();
    g.fillStyle = '#1e1a1e'; g.beginPath(); g.moveTo(-r * 0.36, -r * 0.85); g.lineTo(-r * 0.3, -r * 1.55); g.quadraticCurveTo(0, -r * 1.65, r * 0.3, -r * 1.55); g.lineTo(r * 0.36, -r * 0.85); g.closePath(); g.fill();
    g.strokeStyle = '#1e1a1e'; g.lineWidth = Math.max(1, r * 0.06); g.beginPath(); g.moveTo(-r * 0.6, -r * 0.8); g.quadraticCurveTo(-r * 0.75, r * 0.2, -r * 0.3, r * 0.75); g.stroke();
  },
  sakura(g, r) {
    g.strokeStyle = '#e05a9b'; g.lineWidth = r * 0.09; g.beginPath(); g.arc(0, -r * 0.1, r * 0.92, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
    for (const [x, y, s] of [[-0.62, -0.78, 1], [-0.32, -1.0, 0.7]]) {
      g.save(); g.translate(x * r, y * r); g.fillStyle = '#ffb7cf';
      for (let i = 0; i < 5; i++) { g.rotate(Math.PI * 2 / 5); g.beginPath(); g.ellipse(0, -r * 0.16 * s, r * 0.11 * s, r * 0.16 * s, 0, 0, 7); g.fill(); }
      g.fillStyle = '#ffcf3f'; g.beginPath(); g.arc(0, 0, r * 0.06 * s, 0, 7); g.fill(); g.restore();
    }
  },
  cowboy(g, r) {
    g.fillStyle = '#b07a42'; g.beginPath(); g.moveTo(-r * 1.2, -r * 0.95); g.quadraticCurveTo(0, -r * 0.55, r * 1.2, -r * 0.95); g.quadraticCurveTo(0, -r * 0.7, -r * 1.2, -r * 0.95); g.fill();
    g.beginPath(); g.moveTo(-r * 0.5, -r * 0.8); g.quadraticCurveTo(-r * 0.6, -r * 1.6, 0, -r * 1.4); g.quadraticCurveTo(r * 0.6, -r * 1.6, r * 0.5, -r * 0.8); g.closePath(); g.fill();
    g.fillStyle = '#6a4224'; g.fillRect(-r * 0.52, -r * 0.98, r * 1.04, r * 0.14);
    g.fillStyle = '#ffcf3f'; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.05 : r * 0.12; g.lineTo(Math.cos(a) * rr, -r * 0.91 + Math.sin(a) * rr); } g.fill();
  },
  beret(g, r) {
    g.fillStyle = '#c8304a'; g.beginPath(); g.ellipse(-r * 0.1, -r * 0.92, r * 0.85, r * 0.32, -0.15, 0, 7); g.fill();
    g.strokeStyle = '#c8304a'; g.lineWidth = r * 0.08; g.beginPath(); g.moveTo(-r * 0.1, -r * 1.2); g.lineTo(-r * 0.05, -r * 1.38); g.stroke();
  },
  sombrero(g, r) {
    g.fillStyle = '#f2c14e'; g.beginPath(); g.ellipse(0, -r * 0.82, r * 1.45, r * 0.3, 0, 0, 7); g.fill();
    g.strokeStyle = '#e05a3a'; g.lineWidth = r * 0.07; g.beginPath(); g.ellipse(0, -r * 0.82, r * 1.3, r * 0.24, 0, 0, 7); g.stroke();
    g.fillStyle = '#f2c14e'; g.beginPath(); g.moveTo(-r * 0.45, -r * 0.85); g.quadraticCurveTo(-r * 0.4, -r * 1.7, 0, -r * 1.65); g.quadraticCurveTo(r * 0.4, -r * 1.7, r * 0.45, -r * 0.85); g.closePath(); g.fill();
    g.fillStyle = '#2fae8f'; g.fillRect(-r * 0.46, -r * 1.02, r * 0.92, r * 0.12);
  },
};

// 모자 맨 위 높이 (왕관을 그 위에 얹으려고)
export const HAT_TOP = { santa: 1.5, antler: 1.75, party: 1.95, jobawi: 1.15, gat: 1.6, sakura: 1.1, cowboy: 1.5, beret: 1.3, sombrero: 1.7 };

function star(g, x, y, r1, r2) {
  g.beginPath();
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r2 : r1; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.fill();
}

// 꼬리 장식. pts: 머리부터 꼬리까지 [{x, y, a}] (a는 앞쪽을 보는 방향), kr: 아기냥 반지름, clock: 초.
// under: 아기냥 아래에 깔리는 것(색동 띠), over: 아기냥 위에 뜨는 것.
// 옆으로 f만큼(아기냥 반지름 단위) 비켜난 자리. 머리(p.hr: 머리가 아기냥보다 큰 배율)는 더 바깥으로 빼서 가리지 않게.
function beside(p, kr, f, side) {
  const d = kr * (f + (p.hr ? p.hr - 1 : 0)) * side;
  return { x: p.x - Math.sin(p.a) * d, y: p.y + Math.cos(p.a) * d };
}

export const TAILS = {
  saekdong: {
    under(g, pts, kr) {
      const cs = ['#e8352f', '#ffcf3f', '#2fae5a', '#3a7ae0', '#e05a9b'];
      g.lineCap = 'round'; g.lineJoin = 'round';
      for (let j = 0; j < 5; j++) {
        g.strokeStyle = cs[j]; g.lineWidth = kr * 0.5;
        const off = (j - 2) * kr * 0.48;
        g.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i], nx = -Math.sin(p.a), ny = Math.cos(p.a);
          const x = p.x + nx * off, y = p.y + ny * off;
          i ? g.lineTo(x, y) : g.moveTo(x, y);
        }
        g.stroke();
      }
    },
  },
  lights: {
    // 전구 줄은 아기냥 뒤로 지나가고, 전구는 양옆으로 번갈아 삐져나오게 (얼굴을 가리지 않게)
    under(g, pts, kr, clock) {
      const cs = ['#ff4d4d', '#ffd23f', '#4dd2ff', '#7cff6b'];
      const bulbs = [];
      g.strokeStyle = '#2f6b3a'; g.lineWidth = Math.max(1.5, kr * 0.12); g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const q = beside(pts[i], kr, 1.4, i % 2 ? 1 : -1);
        i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y);
        bulbs.push(q);
      }
      g.stroke();
      const blink = Math.floor(clock * 2.5);
      for (let i = 0; i < bulbs.length; i++) {
        const q = bulbs[i], c = cs[i % 4];
        const on = (i + blink) % 3 !== 0;
        if (on) { g.globalAlpha = 0.3; g.fillStyle = c; g.beginPath(); g.arc(q.x, q.y, kr * 0.5, 0, 7); g.fill(); g.globalAlpha = 1; }
        g.fillStyle = on ? c : '#8a8a8a';
        g.beginPath(); g.arc(q.x, q.y, kr * 0.3, 0, 7); g.fill();
      }
    },
  },
  snow: {
    over(g, pts, kr, clock) {
      g.strokeStyle = '#fff'; g.lineWidth = Math.max(1.2, kr * 0.1); g.lineCap = 'round';
      const s = kr * 0.45;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], side = i % 2 ? 1 : -1, f = 1.15 + 0.2 * Math.sin(clock * 2 + i);
        const q = beside(p, kr, f, side);
        g.save(); g.translate(q.x, q.y); g.rotate(clock * 0.8 + i);
        for (let j = 0; j < 3; j++) { g.rotate(Math.PI / 3); g.beginPath(); g.moveTo(-s, 0); g.lineTo(s, 0); g.stroke(); }
        g.restore();
      }
    },
  },
  firework: {
    over(g, pts, kr, clock) {
      const cs = ['#ffcf3f', '#ff5a8a', '#5ad0ff', '#9bff6b'];
      g.lineCap = 'round'; g.lineWidth = Math.max(1.5, kr * 0.12);
      // 머리부터 꼬리까지 모든 자리에서 박자를 엇갈려 차례로 터진다
      for (let j = 0; j < pts.length; j++) {
        const p = pts[j];
        const ph = (clock * 0.9 + j * 0.37) % 1;
        const q = beside(p, kr, 1.4, j % 2 ? 1 : -1);
        const r1 = kr * (0.2 + ph * 0.9), r2 = kr * (0.45 + ph * 1.1);
        g.globalAlpha = 1 - ph; g.strokeStyle = cs[j % 4];
        g.beginPath();
        for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.moveTo(q.x + Math.cos(a) * r1, q.y + Math.sin(a) * r1); g.lineTo(q.x + Math.cos(a) * r2, q.y + Math.sin(a) * r2); }
        g.stroke();
      }
      g.globalAlpha = 1;
    },
  },
  petals: {
    over(g, pts, kr, clock) {
      g.fillStyle = '#ffb7cf';
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (const [f, side, ph] of [[1.2, -1, 0], [1.3, 1, 2.1]]) {
          const ff = f + 0.15 * Math.sin(clock * 1.6 + i + ph);
          const q = beside(p, kr, ff, side);
          g.save(); g.translate(q.x, q.y); g.rotate(clock + i + ph);
          g.beginPath(); g.ellipse(0, 0, kr * 0.22, kr * 0.36, 0, 0, 7); g.fill();
          g.restore();
        }
      }
    },
  },
  stars: {
    over(g, pts, kr, clock) {
      g.fillStyle = '#ffe066';
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], side = i % 2 ? 1 : -1;
        const tw = 0.6 + 0.4 * Math.sin(clock * 5 + i * 1.7);
        const q = beside(p, kr, 1.25, side);
        star(g, q.x, q.y, kr * 0.48 * tw, kr * 0.2 * tw);
      }
    },
  },
};
