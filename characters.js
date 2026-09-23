/**
 * Character & Visual Effects Renderer (HTML5 Canvas 2D)
 * Vẽ nhân vật Toản và Thầy với animation, hiệu ứng chiêu thức, biểu cảm hài hước
 */

class CharacterRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Trạng thái nhân vật
    this.toan = {
      name: "Toản Chủ Nét Cỏ",
      x: 180,
      y: 340,
      state: "idle", // idle, talking, attacking, hurt, ultimate, ko
      frame: 0,
      flip: false,
      hurtTime: 0,
      attackType: null,
      weapon: "mouse",
      rageLevel: 0
    };

    this.thay = {
      name: "Thầy Cyber VIP",
      x: 620,
      y: 340,
      state: "idle",
      frame: 0,
      flip: true,
      hurtTime: 0,
      attackType: null,
      weapon: "keyboard",
      rageLevel: 0
    };

    // Quản lý hiệu ứng bay (Projectiles, Sparks, Noodles, etc.)
    this.projectiles = [];
    this.effects = [];
    this.floatingTexts = [];
    this.screenShake = 0;
    this.flashColor = null;
    this.flashAlpha = 0;

    // Resize handler
    this.setupResolution();
  }

  setupResolution() {
    this.canvas.width = 800;
    this.canvas.height = 480;
    this.width = 800;
    this.height = 480;
  }

  // Cập nhật trạng thái animation mỗi frame
  update(deltaTime) {
    this.toan.frame += deltaTime * 0.006;
    this.thay.frame += deltaTime * 0.006;

    if (this.toan.hurtTime > 0) this.toan.hurtTime -= deltaTime;
    if (this.thay.hurtTime > 0) this.thay.hurtTime -= deltaTime;

    if (this.screenShake > 0) {
      this.screenShake -= deltaTime * 0.05;
      if (this.screenShake < 0) this.screenShake = 0;
    }

    if (this.flashAlpha > 0) {
      this.flashAlpha -= deltaTime * 0.003;
      if (this.flashAlpha < 0) this.flashAlpha = 0;
    }

    // Cập nhật projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot || 0.1;
      p.life -= deltaTime;

      // Kiểm tra va chạm với mục tiêu
      if ((p.target === 'thay' && p.x >= this.thay.x - 30) ||
          (p.target === 'toan' && p.x <= this.toan.x + 30) ||
          p.life <= 0) {
        // Nổ hiệu ứng tại điểm va chạm
        this.addHitSparks(p.x, p.y, p.item);
        if (p.onHit) p.onHit();
        this.projectiles.splice(i, 1);
      }
    }

    // Cập nhật hiệu ứng hạt/sparks
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const eff = this.effects[i];
      eff.x += eff.vx;
      eff.y += eff.vy;
      eff.alpha -= deltaTime * 0.002;
      eff.size = Math.max(0, eff.size - deltaTime * 0.01);
      if (eff.alpha <= 0 || eff.size <= 0) {
        this.effects.splice(i, 1);
      }
    }

    // Cập nhật chữ bay (Floating damage text)
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= deltaTime * 0.0015;
      ft.scale = Math.min(1.4, ft.scale + deltaTime * 0.001);
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  // Thêm tia lửa / mảnh vỡ đòn đánh
  addHitSparks(x, y, item) {
    const colors = item === 'noodle' ? ['#ffcc00', '#ff4444', '#ffffff'] :
                   item === 'keyboard' ? ['#00ffff', '#ff00ff', '#ffff00', '#00ff66'] :
                   item === 'cup' ? ['#ff1144', '#ff88aa', '#ffffff'] :
                   ['#ffaa00', '#ff2200', '#ffffff'];

    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.effects.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5,
        alpha: 1
      });
    }
    this.screenShake = 12;
  }

  // Thêm chữ nhảy dame sát thương
  addFloatingText(text, x, y, isCrit = false, isRoast = false) {
    this.floatingTexts.push({
      text: text,
      x: x,
      y: y,
      vy: -1.2,
      color: isCrit ? '#ff0055' : (isRoast ? '#ffdd00' : '#00ffcc'),
      alpha: 1,
      scale: isCrit ? 1.4 : 1,
      isCrit: isCrit
    });
  }

  // Bắn vật thể (chuột bi, cốc sting, bát mì, bàn phím)
  spawnProjectile(from, to, item, onHit) {
    const startX = from === 'toan' ? this.toan.x + 30 : this.thay.x - 30;
    const startY = from === 'toan' ? this.toan.y - 30 : this.thay.y - 30;
    const targetX = to === 'thay' ? this.thay.x : this.toan.x;
    const dir = to === 'thay' ? 1 : -1;

    this.projectiles.push({
      x: startX,
      y: startY,
      vx: dir * 9,
      vy: -1.5,
      vRot: dir * 0.25,
      rotation: 0,
      item: item,
      target: to,
      life: 2000,
      onHit: onHit
    });
  }

  triggerScreenFlash(color = '#ffffff', alpha = 0.6) {
    this.flashColor = color;
    this.flashAlpha = alpha;
  }

  // VẼ TOÀN BỘ SÀN ĐẤU
  render() {
    this.ctx.save();

    // Rung lắc màn hình khi có hit mạnh
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      this.ctx.translate(shakeX, shakeY);
    }

    // 1. Background Quán Nét Chiến Trường (Nét Cỏ vs Cyber VIP)
    this.renderBackground();

    // 2. Vẽ 2 Đấu Thủ (Toản vs Thầy)
    this.renderToan();
    this.renderThay();

    // 3. Vẽ đạn bay / Projectiles
    this.renderProjectiles();

    // 4. Vẽ hiệu ứng hạt / Sparks
    this.renderEffects();

    // 5. Vẽ chữ sát thương nhảy số
    this.renderFloatingTexts();

    // 6. Flash màn hình khi K.O / Ultimate
    if (this.flashAlpha > 0) {
      this.ctx.fillStyle = this.flashColor || '#ffffff';
      this.ctx.globalAlpha = this.flashAlpha;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.globalAlpha = 1;
    }

    this.ctx.restore();
  }

  // Vẽ sàn đấu tiệm nét (Sạch sẽ, không rối mắt, đúng phong cách Arcade)
  renderBackground() {
    const ctx = this.ctx;

    // Nền tối sang trọng
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, '#0a0e1a');
    bgGrad.addColorStop(0.7, '#111827');
    bgGrad.addColorStop(1, '#030712');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // ================= NỬA TRÁI: NÉT TOẢN (Màu Hường, Ghế Da, Phòng Hút Thuốc) =================
    ctx.save();
    ctx.fillStyle = 'rgba(236, 72, 153, 0.05)';
    ctx.fillRect(0, 0, 400, this.height);
    
    // Biển hiệu tinh gọn bên Toản
    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText("🌸 NÉT TOẢN • ĐIỀU HÒA • GHẾ DA", 20, 30);

    // Màn hình máy Toản (Phím cơ, ghế da êm ái)
    for (let i = 0; i < 3; i++) {
      const mx = 30 + i * 85;
      const my = 260;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(mx, my, 65, 48);
      
      // Màn hình màu hồng cute
      ctx.fillStyle = i === 1 ? '#be185d' : '#831843';
      ctx.fillRect(mx + 4, my + 4, 57, 40);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 8px monospace';
      ctx.fillText(i === 1 ? "I LOVE U 💍" : "PHÍM CƠ", mx + 8, my + 24);

      // Ghế da bọc nệm đen/nâu xịn xò
      ctx.fillStyle = '#451a03';
      ctx.fillRect(mx + 12, my + 52, 40, 24);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(mx + 16, my + 54, 32, 20);
    }

    // Buồng phòng hút thuốc (Smoking Lounge) kính mờ
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.fillRect(295, 120, 95, 80);
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 1;
    ctx.strokeRect(295, 120, 95, 80);
    ctx.fillStyle = '#fbcfe8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText("🚬 HÚT THUỐC", 305, 140);
    
    // Khói bay lãng đãng
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(345, 165, 12, 0, Math.PI * 2);
    ctx.arc(365, 160, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // ================= NỬA PHẢI: NÉT THẦY (CHỦ ĐẠO NÉT CỎ GHẾ NHỰA SONG LONG) =================
    ctx.save();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.05)';
    ctx.fillRect(400, 0, 400, this.height);

    // Biển hiệu CHỦ ĐẠO GHẾ NHỰA bên Thầy
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText("🪑 VUA NÉT CỎ GHẾ NHỰA • THẦY GAMING", 415, 30);

    // Quạt trần quay cọt kẹt trên trần
    const fanX = 600;
    const fanY = 55;
    const fanAngle = Date.now() / 70;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(fanX, 0);
    ctx.lineTo(fanX, fanY);
    ctx.stroke();

    for (let f = 0; f < 3; f++) {
      const a = fanAngle + (f * Math.PI * 2) / 3;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(fanX, fanY);
      ctx.lineTo(fanX + Math.cos(a) * 34, fanY + Math.sin(a) * 12);
      ctx.stroke();
    }

    // Khói thuốc bay tự do khắp quán
    ctx.fillStyle = 'rgba(203, 213, 225, 0.12)';
    for (let k = 0; k < 3; k++) {
      const sx = 520 + k * 80 + Math.sin(Date.now() / 400 + k) * 10;
      const sy = 190 - k * 25 + Math.cos(Date.now() / 500 + k) * 8;
      ctx.beginPath();
      ctx.arc(sx, sy, 16 + k * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dàn máy nét cỏ + Ghế nhựa đỏ, xanh, vàng trước từng máy
    const chairColors = ['#dc2626', '#2563eb', '#ca8a04']; // Đỏ Song Long, Xanh Đại Đồng Tiến, Vàng
    for (let i = 0; i < 3; i++) {
      const mx = 485 + i * 85;
      const my = 260;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(mx, my, 65, 48);
      
      ctx.fillStyle = '#065f46';
      ctx.fillRect(mx + 4, my + 4, 57, 40);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 8px monospace';
      ctx.fillText("LOL: FLASH D", mx + 6, my + 24);

      // Gạt tàn thuốc nhỏ trên bàn
      ctx.fillStyle = '#64748b';
      ctx.fillRect(mx + 48, my + 42, 10, 5);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(mx + 54, my + 40, 2, 2);

      // Ghế nhựa trước mỗi máy (Đỏ, Xanh, Vàng)
      const cColor = chairColors[i % chairColors.length];
      ctx.fillStyle = cColor;
      ctx.fillRect(mx + 16, my + 52, 32, 16); // Mặt ghế nhựa
      // Lỗ thoát khí tròn giữa ghế nhựa
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(mx + 32, my + 60, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 2 chân ghế nhựa
      ctx.fillStyle = cColor;
      ctx.fillRect(mx + 18, my + 68, 4, 18);
      ctx.fillRect(mx + 42, my + 68, 4, 18);
    }

    // THÁP GHẾ NHỰA XẾP CHỒNG 8 TẦNG GÓC PHÒNG (Đặc trưng nét cỏ Việt Nam)
    for (let s = 0; s < 8; s++) {
      const tColor = s % 2 === 0 ? '#ef4444' : '#3b82f6';
      ctx.fillStyle = tColor;
      ctx.fillRect(738, 310 - s * 10, 34, 12);
      // Lỗ ghế
      ctx.fillStyle = '#000';
      ctx.fillRect(753, 314 - s * 10, 4, 4);
    }
    // Chữ bảng tháp ghế
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText("THÁP GHẾ", 735, 220);

    ctx.restore();

    // Đường phân cách giữa 2 sàn đấu
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(400, 10);
    ctx.lineTo(400, 440);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sàn nhà gạch tiệm nét
    const floorGrad = ctx.createLinearGradient(0, 360, 0, this.height);
    floorGrad.addColorStop(0, '#1e293b');
    floorGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, 360, this.width, this.height - 360);

    // Vạch kẻ sàn đấu
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 360);
    ctx.lineTo(this.width, 360);
    ctx.stroke();
  }

  // VẼ NHÂN VẬT TOẢN (Màu Hường, 3cm, Phím Cơ, Ghế Da)
  renderToan() {
    const ctx = this.ctx;
    const t = this.toan;
    const isHurt = t.hurtTime > 0;
    const isKO = t.state === 'ko';
    const bounce = Math.sin(t.frame * 8) * 3;

    ctx.save();
    ctx.translate(t.x, isKO ? t.y + 40 : t.y + bounce);

    if (isKO) {
      ctx.rotate(-Math.PI / 2.5);
    }

    // Bóng đổ dưới chân
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 55, 35, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hiệu ứng Nộ màu hồng tình yêu bốc cháy quanh Toản
    if (t.rageLevel >= 80 && !isKO) {
      ctx.fillStyle = 'rgba(244, 114, 182, 0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 65 + Math.sin(t.frame * 20) * 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Chân & Quần
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-18, 15, 14, 30);
    ctx.fillRect(4, 15, 14, 30);

    // Dép màu hồng cute
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(-22, 45, 18, 8);
    ctx.fillRect(4, 45, 18, 8);

    // Thân: Áo phông màu hường cánh sen yêu đời
    ctx.fillStyle = isHurt ? '#ef4444' : '#ec4899';
    ctx.fillRect(-20, -25, 40, 42);

    // Hình trái tim nhỏ trên ngực áo Toản
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px sans-serif';
    ctx.fillText("💖", -5, -4);

    // Cánh tay
    ctx.fillStyle = '#fbcfe8';
    ctx.fillRect(-28, -20, 10, 32);
    ctx.fillRect(18, -20, 10, 25);

    // Tay phải cầm Bàn phím cơ màu hồng hoặc Thước kẻ 3cm
    if (!isKO) {
      ctx.fillStyle = '#f472b6'; // Phím cơ hồng
      ctx.fillRect(20, 2, 16, 26);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 2, 16, 26);
      // Keycaps trắng hồng
      ctx.fillStyle = '#fff';
      ctx.fillRect(22, 6, 12, 3);
      ctx.fillRect(22, 12, 12, 3);
      ctx.fillRect(22, 18, 12, 3);
    }

    // Đầu & Mặt
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(0, -45, 20, 0, Math.PI * 2);
    ctx.fill();

    // Tóc sành điệu màu nâu hạt dẻ
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(-20, -55);
    ctx.lineTo(-24, -68);
    ctx.lineTo(-10, -62);
    ctx.lineTo(0, -72);
    ctx.lineTo(14, -64);
    ctx.lineTo(22, -66);
    ctx.lineTo(18, -50);
    ctx.fill();

    // Biểu cảm khuôn mặt Toản
    if (isKO) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.strokeText("X", -14, -40);
      ctx.strokeText("X", 2, -40);
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(-6, -34, 12, 8);
    } else if (isHurt) {
      // Mắt đỏ hoe cay cú vì bị trêu 3cm
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-12, -50, 8, 8);
      ctx.fillRect(4, -50, 8, 8);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-10, -48, 4, 4);
      ctx.fillRect(6, -48, 4, 4);
      // Mồm nghiến răng
      ctx.fillStyle = '#fff';
      ctx.fillRect(-8, -36, 16, 5);
    } else {
      // Mắt hình trái tim hoặc cười tự tin cua cô chủ tiệm vàng
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-10, -48, 6, 4);
      ctx.fillRect(4, -48, 6, 4);
      // Mép cười duyên
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(2, -37, 7, 0.2, Math.PI * 0.8);
      ctx.stroke();
    }

    // Kết thúc vẽ Toản
    ctx.restore();
  }

  // VẼ NHÂN VẬT THẦY (Đầu Trọc, Sửa Phím, Ghế Nhựa)
  renderThay() {
    const ctx = this.ctx;
    const t = this.thay;
    const isHurt = t.hurtTime > 0;
    const isKO = t.state === 'ko';
    const bounce = Math.sin(t.frame * 8 + 1) * 3;

    ctx.save();
    ctx.translate(t.x, isKO ? t.y + 40 : t.y + bounce);

    if (isKO) {
      ctx.rotate(Math.PI / 2.5);
    }

    // Bóng đổ
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 55, 35, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hào quang Nộ đỏ rực
    if (t.rageLevel >= 80 && !isKO) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.beginPath();
      ctx.arc(0, 0, 65 + Math.sin(t.frame * 20) * 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Chân & Quần tây
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(-18, 15, 14, 30);
    ctx.fillRect(4, 15, 14, 30);

    // Giày
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-22, 45, 18, 8);
    ctx.fillRect(4, 45, 18, 8);

    // Thân: Áo phông đỏ chủ nét bình dân
    ctx.fillStyle = isHurt ? '#ef4444' : '#b91c1c';
    ctx.fillRect(-20, -25, 40, 42);

    // Khăn lau bàn net màu xanh
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(8, -25, 8, 28);

    // Cánh tay
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-28, -20, 10, 25);
    ctx.fillRect(18, -20, 10, 32);

    // Tay cầm phím Fuhlen L411 liệt nút D
    if (!isKO) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-36, 2, 22, 30);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-36, 2, 22, 30);
      
      ctx.fillStyle = '#334155';
      ctx.fillRect(-34, 6, 18, 4);
      ctx.fillRect(-34, 13, 18, 4);
      ctx.fillRect(-34, 20, 18, 4);

      // Nút D màu đỏ cạy ra sửa
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-28, 13, 5, 4);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 6px sans-serif';
      ctx.fillText("D", -27, 17);
    }

    // QUẢ ĐẦU TRỌC LỐC CỦA THẦY (Bald Head)
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -45, 21, 0, Math.PI * 2);
    ctx.fill();

    // Vệt sáng phản quang lấp lánh trên đỉnh đầu trọc
    if (!isKO) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-6, -56, 7, 3, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Ngôi sao lấp lánh phản quang
      ctx.fillStyle = '#fef08a';
      ctx.font = '10px sans-serif';
      ctx.fillText("✨", 4, -58);
    }

    // Cây tua vít vàng sửa phím giắt sau vành tai
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(14, -60);
    ctx.lineTo(24, -40);
    ctx.stroke();

    // Biểu cảm Thầy
    if (isKO) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.strokeText("X", -14, -40);
      ctx.strokeText("X", 2, -40);
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(-6, -34, 12, 8);
    } else if (isHurt) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-14, -50, 8, 8);
      ctx.fillRect(2, -50, 8, 8);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-12, -48, 4, 4);
      ctx.fillRect(4, -48, 4, 4);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-6, -35, 12, 6);
    } else {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-10, -48, 5, Math.PI, 0);
      ctx.arc(6, -48, 5, Math.PI, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-2, -36, 7, 0.1, Math.PI * 0.9);
      ctx.stroke();
    }

    // Chiếc ghế nhựa đỏ Song Long hộ thân bên cạnh Thầy
    if (!isKO) {
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(20, 20, 26, 14); // Mặt ghế nhựa
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(33, 27, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(22, 34, 4, 18);
      ctx.fillRect(40, 34, 4, 18);
    }

    // Kết thúc vẽ Thầy
    ctx.restore();
  }

  // Vẽ các loại đạn / vật phẩm ném nhau
  renderProjectiles() {
    const ctx = this.ctx;
    this.projectiles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.item === 'ruler') {
        // Thước kẻ đo 3cm màu vàng
        ctx.fillStyle = '#facc15';
        ctx.fillRect(-14, -4, 28, 8);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 6px sans-serif';
        ctx.fillText("3cm", -6, 2);
      } else if (p.item === 'pink_keyboard') {
        // Phím cơ màu hồng xoay tròn
        ctx.fillStyle = '#f472b6';
        ctx.fillRect(-16, -10, 32, 20);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-16, -10, 32, 20);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText("PINK", -9, 3);
      } else if (p.item === 'smoke') {
        // Cụm khói phòng hút thuốc
        ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.arc(8, -4, 9, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.item === 'keyboard') {
        // Phím Fuhlen đen liệt nút D
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-18, -10, 36, 20);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-18, -10, 36, 20);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-4, -4, 8, 8);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText("D", -2, 3);
      } else if (p.item === 'chair') {
        // Ghế nhựa Song Long đỏ
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(-14, -14, 28, 16);
        ctx.fillRect(-12, 2, 5, 16);
        ctx.fillRect(7, 2, 5, 16);
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(0, -6, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.item === 'spray') {
        // Chai cồn 90 độ
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-8, -12, 16, 24);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-4, -18, 8, 6);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 7px sans-serif';
        ctx.fillText("90°", -6, 2);
      } else {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  // Vẽ hiệu ứng hạt vỡ
  renderEffects() {
    const ctx = this.ctx;
    this.effects.forEach(eff => {
      ctx.save();
      ctx.globalAlpha = eff.alpha;
      ctx.fillStyle = eff.color;
      ctx.beginPath();
      ctx.arc(eff.x, eff.y, eff.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // Vẽ chữ số sát thương tự ái nhảy tưng bừng
  renderFloatingTexts() {
    const ctx = this.ctx;
    this.floatingTexts.forEach(ft => {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.fillStyle = ft.color;
      ctx.font = ft.isCrit ? 'bold 20px "Impact", sans-serif' : 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 6;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });
  }
}

window.CharacterRenderer = CharacterRenderer;
