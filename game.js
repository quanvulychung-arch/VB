/**
 * Game Core Simulation & Auto-Spectator Director
 * Đại Chiến Quán Nét: Toản vs Thầy
 */

class QuanNetBattleGame {
  constructor() {
    this.canvas = document.getElementById('battleCanvas');
    this.renderer = new CharacterRenderer(this.canvas);

    // Chỉ số người chơi
    this.maxHp = 1000;
    this.toanHp = this.maxHp;
    this.thayHp = this.maxHp;
    this.toanRage = 0;
    this.thayRage = 0;

    // Trạng thái trận đấu
    this.round = 1;
    this.scoreToan = 0;
    this.scoreThay = 0;
    this.gameState = 'IDLE'; // IDLE, ROUND_START, BANTER, PHYSICAL, ULTIMATE, KO, ROUND_END
    this.speed = 1.0;
    this.isPaused = false;
    this.autoLoop = true;

    // Dữ liệu cược & Khán giả
    this.netCoins = 1000;
    this.currentBet = { target: null, amount: 0 };
    this.saltIndex = { toan: 0, thay: 0 };

    // DOM Elements
    this.dom = {
      toanHpBar: document.getElementById('toanHpBar'),
      toanHpText: document.getElementById('toanHpText'),
      thayHpBar: document.getElementById('thayHpBar'),
      thayHpText: document.getElementById('thayHpText'),
      toanRageBar: document.getElementById('toanRageBar'),
      thayRageBar: document.getElementById('thayRageBar'),
      scoreText: document.getElementById('scoreText'),
      roundText: document.getElementById('roundText'),
      toanBubble: document.getElementById('toanSpeechBubble'),
      thayBubble: document.getElementById('thaySpeechBubble'),
      toanText: document.getElementById('toanSpeechText'),
      thayText: document.getElementById('thaySpeechText'),
      commentaryText: document.getElementById('commentaryText'),
      chatFeed: document.getElementById('chatFeed'),
      comedyBanner: document.getElementById('comedyBanner'),
      comedyTitle: document.getElementById('comedyTitle'),
      comedyDesc: document.getElementById('comedyDesc'),
      koBanner: document.getElementById('koBanner'),
      koWinnerText: document.getElementById('koWinnerText'),
      netCoinDisplay: document.getElementById('netCoinDisplay'),
      betStatus: document.getElementById('betStatus')
    };

    this.lastTime = performance.now();
    this.speechTypeTimer = null;
    this.stepTimeout = null;
    this.comedyTimeout = null;

    this.addChatMessage = this.addAudienceMessage.bind(this);

    this.initEvents();
    this.startChatSimulator();
    this.startRenderLoop();
  }

  initEvents() {
    // TỰ ĐỘNG BẬT TOÀN BỘ ÂM THANH & NHẠC NGAY KHI TẢI TRANG
    const autoStartAudio = () => {
      window.soundEngine.init();
      if (!window.soundEngine.bgmPlaying && !window.soundEngine.isMuted) {
        window.soundEngine.startBGM();
      }
    };

    // Khởi chạy ngay lập tức
    autoStartAudio();

    // Bắt thêm các tương tác tự nhiên (di chuột, cuộn trang, chạm màn hình, focus) để mở khóa âm thanh ngầm
    ['mousemove', 'mousedown', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel', 'focus'].forEach(evt => {
      window.addEventListener(evt, autoStartAudio, { once: false, passive: true });
    });

    // Nút Bơm Để Đấm Nhau (Kích động)
    const btnProvoke = document.getElementById('btnProvoke');
    if (btnProvoke) {
      btnProvoke.addEventListener('click', () => {
        autoStartAudio();
        this.forceProvokeBrawl();
      });
    }

    // Nút Gọi Cô Chủ Tiệm Vàng (Tình huống hài hước)
    const btnComedy = document.getElementById('btnComedy');
    if (btnComedy) {
      btnComedy.addEventListener('click', () => {
        autoStartAudio();
        this.triggerRandomComedySituation();
      });
    }

    // Nút Tăng Tốc Độ
    const speedButtons = document.querySelectorAll('.speed-btn');
    speedButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        speedButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.speed = parseFloat(e.target.dataset.speed || '1');
        this.addCommentary(`⏩ Đã chỉnh tốc độ trận đấu: ${this.speed}x`);
      });
    });

    // Nút Bật/Tắt Âm Thanh
    const btnSound = document.getElementById('btnSound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const muted = window.soundEngine.toggleMute();
        btnSound.textContent = muted ? '🔇 Âm thanh: Tắt' : '🔊 Âm thanh: Bật';
        btnSound.classList.toggle('muted', muted);
      });
    }

    // Nút Bật/Tắt Nhạc Nền 8-bit
    const btnBgm = document.getElementById('btnBgm');
    if (btnBgm) {
      btnBgm.addEventListener('click', () => {
        if (window.soundEngine.bgmPlaying) {
          window.soundEngine.stopBGM();
          btnBgm.textContent = '🎵 Nhạc nền: Tắt';
        } else {
          window.soundEngine.startBGM();
          btnBgm.textContent = '🎶 Nhạc nền: Bật';
        }
      });
    }

    // Nút Cược Cho Toản / Thầy
    const btnBetToan = document.getElementById('btnBetToan');
    const btnBetThay = document.getElementById('btnBetThay');
    if (btnBetToan) {
      btnBetToan.addEventListener('click', () => this.placeBet('toan'));
    }
    if (btnBetThay) {
      btnBetThay.addEventListener('click', () => this.placeBet('thay'));
    }

    // Nút Tạm Dừng / Tiếp Tục
    const btnPause = document.getElementById('btnPause');
    if (btnPause) {
      btnPause.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        btnPause.textContent = this.isPaused ? '▶️ Tiếp tục' : '⏸️ Tạm dừng';
      });
    }
  }

  // Đặt cược điểm nét
  placeBet(target) {
    if (this.currentBet.target) {
      this.addCommentary("⚠️ Bạn đã đặt cược cho hiệp này rồi!");
      return;
    }
    if (this.netCoins < 200) {
      this.addCommentary("⚠️ Không đủ Điểm Nét! Được tặng thêm 500 điểm miễn phí!");
      this.netCoins += 500;
      this.updateCoinDisplay();
    }
    const betAmount = 200;
    this.netCoins -= betAmount;
    this.currentBet = { target, amount: betAmount };
    this.updateCoinDisplay();

    const targetName = target === 'toan' ? 'Toản Máy Cỏ' : 'Thầy Cyber';
    this.dom.betStatus.innerHTML = `Đã cược <b style="color:#facc15">200 Điểm</b> vào: <b style="color:#38bdf8">${targetName}</b> (Tỉ lệ 1 ăn 2)`;
    this.addAudienceMessage("Hệ Thống", `Khán giả vừa chốt kèo 200 Điểm Nét vào cửa ${targetName}!`);
  }

  updateCoinDisplay() {
    if (this.dom.netCoinDisplay) {
      this.dom.netCoinDisplay.textContent = this.netCoins.toLocaleString();
    }
  }

  // Khởi động vòng lặp vẽ Canvas 60 FPS
  startRenderLoop() {
    const loop = (time) => {
      const deltaTime = (time - this.lastTime) * this.speed;
      this.lastTime = time;

      if (!this.isPaused) {
        this.renderer.update(deltaTime);
      }
      this.renderer.render();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // Bắt đầu trận đấu mới
  startMatch() {
    this.toanHp = this.maxHp;
    this.thayHp = this.maxHp;
    this.toanRage = 0;
    this.thayRage = 0;
    this.renderer.toan.rageLevel = 0;
    this.renderer.thay.rageLevel = 0;
    this.renderer.toan.state = 'idle';
    this.renderer.thay.state = 'idle';
    this.renderer.toan.hurtTime = 0;
    this.renderer.thay.hurtTime = 0;

    this.currentBet = { target: null, amount: 0 };
    if (this.dom.betStatus) {
      this.dom.betStatus.textContent = "Chưa đặt cược (Click chọn bên dưới)";
    }

    this.updateHUD();
    this.hideSpeechBubbles();
    this.dom.koBanner.classList.remove('show');

    this.gameState = 'ROUND_START';
    window.soundEngine.playRoundStart();
    const starts = BANTER_DATABASE.announcements.start;
    const startMsg = starts[Math.floor(Math.random() * starts.length)];
    this.addCommentary(`🔥 ROUND ${this.round}: ${startMsg}`);

    // Bắt đầu chuỗi hành động tự động sau 1.2s
    this.scheduleNextStep(() => {
      this.runNextActionStep();
    }, 1200);
  }

  // Lựa chọn hành động tự động theo tình huống
  runNextActionStep() {
    if (this.gameState === 'KO') return;

    // 1. Nếu một trong 2 người đầy nộ (Rage >= 100) -> Tung Chiêu Cuối BÁ ĐẠO
    if (this.toanRage >= 100) {
      this.executeUltimate('toan');
      return;
    }
    if (this.thayRage >= 100) {
      this.executeUltimate('thay');
      return;
    }

    // 2. Xác suất 22% kích hoạt Tình Huống Hài Hước Tiệm Vàng, 38% đòn đánh vật lý, 40% đấu khẩu
    const roll = Math.random();
    if (roll < 0.22 && BANTER_DATABASE.comedySituations) {
      this.triggerRandomComedySituation();
    } else if (roll < 0.60) {
      this.executePhysicalBrawl();
    } else {
      this.executeBanterExchange();
    }
  }

  // GIAI ĐOẠN 1: ĐẤU KHẨU CÀ KHỊA (Banter)
  executeBanterExchange() {
    this.gameState = 'BANTER';
    const cat = BANTER_DATABASE.categories[Math.floor(Math.random() * BANTER_DATABASE.categories.length)];
    const dialogue = cat.dialogues[Math.floor(Math.random() * cat.dialogues.length)];

    const whoStarts = Math.random() < 0.5 ? 'toan' : 'thay';

    if (whoStarts === 'toan') {
      // Toản khịa trước
      this.showBanterStep('toan', dialogue.toan, () => {
        // Thầy dính sát thương tự ái
        this.applyDamage('thay', dialogue.dmgThay, true, "Cay Cú!");
        this.addRage('thay', 25);

        this.scheduleNextStep(() => {
          // Thầy đáp trả cực gắt
          this.showBanterStep('thay', dialogue.thay, () => {
            this.applyDamage('toan', dialogue.dmgToan, true, "Tự Ái!");
            this.addRage('toan', 25);

            this.scheduleNextStep(() => {
              this.hideSpeechBubbles();
              this.checkMatchStatus();
            }, 1000);
          });
        }, 1200);
      });
    } else {
      // Thầy khịa trước
      this.showBanterStep('thay', dialogue.thay, () => {
        this.applyDamage('toan', dialogue.dmgToan, true, "Bị Bóc Phốt!");
        this.addRage('toan', 25);

        this.scheduleNextStep(() => {
          this.showBanterStep('toan', dialogue.toan, () => {
            this.applyDamage('thay', dialogue.dmgThay, true, "Quá Thấm!");
            this.addRage('thay', 25);

            this.scheduleNextStep(() => {
              this.hideSpeechBubbles();
              this.checkMatchStatus();
            }, 1000);
          });
        }, 1200);
      });
    }
  }

  // Hiển thị bong bóng thoại chữ chạy + âm thanh chíp chíp retro arcade
  showBanterStep(who, text, onComplete) {
    this.hideSpeechBubbles();
    const bubble = who === 'toan' ? this.dom.toanBubble : this.dom.thayBubble;
    const textEl = who === 'toan' ? this.dom.toanText : this.dom.thayText;
    const char = who === 'toan' ? this.renderer.toan : this.renderer.thay;

    bubble.classList.add('show');
    textEl.textContent = "";
    char.state = 'talking';

    let idx = 0;
    const pitch = who === 'toan' ? 520 : 380;

    clearInterval(this.speechTypeTimer);
    this.speechTypeTimer = setInterval(() => {
      if (idx < text.length) {
        textEl.textContent += text[idx];
        if (idx % 2 === 0) {
          window.soundEngine.playSpeechBlip(pitch);
        }
        idx++;
      } else {
        clearInterval(this.speechTypeTimer);
        char.state = 'idle';
        if (onComplete) onComplete();
      }
    }, Math.max(12, 28 / this.speed));
  }

  // GIAI ĐOẠN 2: XIÊN XỎ / ĐÒN ĐÁNH VẬT LÝ
  executePhysicalBrawl() {
    this.gameState = 'PHYSICAL';
    const attacker = Math.random() < 0.5 ? 'toan' : 'thay';
    const defender = attacker === 'toan' ? 'thay' : 'toan';
    const attacks = BANTER_DATABASE.physicalAttacks[attacker];
    const atk = attacks[Math.floor(Math.random() * attacks.length)];

    const atkName = attacker === 'toan' ? 'Toản' : 'Thầy';
    this.addCommentary(`💥 [${atkName}] tung đòn: ${atk.name}!`);

    // Hiện câu gáy khi tung đòn
    this.showBanterStep(attacker, atk.quote, () => {
      // Bắn vũ khí sang đối phương
      this.renderer.spawnProjectile(attacker, defender, atk.item, () => {
        window.soundEngine.playPhysicalHit();
        const defObj = defender === 'toan' ? this.renderer.toan : this.renderer.thay;
        defObj.hurtTime = 600;

        this.applyDamage(defender, atk.damage, false, atk.name);
        this.addRage(attacker, atk.rageGain);

        this.scheduleNextStep(() => {
          this.hideSpeechBubbles();
          this.checkMatchStatus();
        }, 800);
      });
    });
  }

  // GIAI ĐOẠN 3: CHIÊU CUỐI TỐI THƯỢNG (Ultimate Move)
  executeUltimate(user) {
    this.gameState = 'ULTIMATE';
    const victim = user === 'toan' ? 'thay' : 'toan';
    const ultis = BANTER_DATABASE.ultimates[user];
    const ulti = ultis[Math.floor(Math.random() * ultis.length)];

    const userName = user === 'toan' ? 'TOẢN MÁY CỎ' : 'THẦY CYBER';
    this.addCommentary(`🚨🚨 TUYỆT KỸ BÙNG NỔ! ${userName} KÍCH HOẠT: ${ulti.name}!`);

    // Flash màn hình
    this.renderer.triggerScreenFlash(user === 'toan' ? '#ff4400' : '#c026d3', 0.8);
    window.soundEngine.playUltimateSound(ulti.sound);

    // Reset Nộ
    if (user === 'toan') this.toanRage = 0;
    else this.thayRage = 0;
    this.updateHUD();

    this.showBanterStep(user, `⚡ ${ulti.name} ⚡: ${ulti.quote}`, () => {
      // Gây sát thương cực lớn
      this.applyDamage(victim, ulti.damage, false, "CHÍ MẠNG ULTIMATE!");
      const victimObj = victim === 'toan' ? this.renderer.toan : this.renderer.thay;
      victimObj.hurtTime = 1000;
      this.renderer.addHitSparks(victimObj.x, victimObj.y - 30, 'keyboard');

      this.scheduleNextStep(() => {
        this.hideSpeechBubbles();
        this.checkMatchStatus();
      }, 1200);
    });
  }

  // Nút Kích Động cưỡng ép đánh nhau ngay lập tức
  forceProvokeBrawl() {
    this.addCommentary("📢 KHÁN GIẢ NÉM GẠCH KÍCH ĐỘNG! CẢ HAI BÊN LAO VÀO BẬT CHIÊU CUỐI!");
    this.toanRage = 100;
    this.thayRage = 100;
    this.updateHUD();
    this.executeUltimate(Math.random() < 0.5 ? 'toan' : 'thay');
  }

  // Tình Huống Hài Hước Đặc Biệt (Tiệm Vàng, Chó Corgi, Cân Vàng, Sập Điện)
  triggerRandomComedySituation() {
    if (this.gameState === 'KO') return;
    this.gameState = 'COMEDY';
    this.hideSpeechBubbles();

    const situations = BANTER_DATABASE.comedySituations;
    if (!situations || situations.length === 0) return;
    const sit = situations[Math.floor(Math.random() * situations.length)];

    // Hiển thị Pop-up Banner
    if (this.dom.comedyTitle && this.dom.comedyDesc && this.dom.comedyBanner) {
      this.dom.comedyTitle.textContent = sit.title;
      this.dom.comedyDesc.textContent = sit.desc;
      this.dom.comedyBanner.classList.add('show');
    }

    // Phát âm thanh và hiệu ứng visual
    window.soundEngine.playComedySound(sit.sound);
    this.renderer.triggerComedyVisual(sit.visual);

    // Bình luận viên & Chat khán giả
    this.addCommentary(`🎭 [TÌNH HUỐNG HÀI HƯỚC] ${sit.title}`);
    this.addAudienceMessage("Cô_Chủ_Tiệm_Vàng", sit.desc);

    // Xử lý sát thương & Nộ
    if (sit.dmgToan > 0) {
      this.applyDamage('toan', sit.dmgToan, true, "SỰ CỐ TIỆM VÀNG!");
    }
    if (sit.dmgThay > 0) {
      this.applyDamage('thay', sit.dmgThay, true, "SỰ CỐ TIỆM VÀNG!");
    }
    if (sit.rageToan > 0) this.addRage('toan', sit.rageToan);
    if (sit.rageThay > 0) this.addRage('thay', sit.rageThay);

    // Sau 3.5s tắt banner và tiếp tục trận đấu tự động
    clearTimeout(this.comedyTimeout);
    this.comedyTimeout = setTimeout(() => {
      if (this.dom.comedyBanner) {
        this.dom.comedyBanner.classList.remove('show');
      }
      this.scheduleNextStep(() => {
        this.checkMatchStatus();
      }, 500);
    }, Math.max(1600, 3200 / this.speed));
  }

  // Áp dụng sát thương & hiện số bay
  applyDamage(target, dmg, isRoast = false, label = "") {
    let actualDmg = dmg + Math.floor(Math.random() * 40 - 20);
    if (actualDmg < 10) actualDmg = 10;

    if (target === 'toan') {
      this.toanHp = Math.max(0, this.toanHp - actualDmg);
      this.saltIndex.toan += Math.floor(actualDmg / 5);
      const text = `-${actualDmg} ${label}`;
      this.renderer.addFloatingText(text, this.renderer.toan.x, this.renderer.toan.y - 60, actualDmg > 300, isRoast);
      if (isRoast) window.soundEngine.playMentalHit();
    } else {
      this.thayHp = Math.max(0, this.thayHp - actualDmg);
      this.saltIndex.thay += Math.floor(actualDmg / 5);
      const text = `-${actualDmg} ${label}`;
      this.renderer.addFloatingText(text, this.renderer.thay.x, this.renderer.thay.y - 60, actualDmg > 300, isRoast);
      if (isRoast) window.soundEngine.playMentalHit();
    }

    this.updateHUD();
  }

  addRage(who, amount) {
    if (who === 'toan') {
      this.toanRage = Math.min(100, this.toanRage + amount);
      this.renderer.toan.rageLevel = this.toanRage;
    } else {
      this.thayRage = Math.min(100, this.thayRage + amount);
      this.renderer.thay.rageLevel = this.thayRage;
    }
    this.updateHUD();
  }

  // Kiểm tra thắng thua hoặc tiếp tục
  checkMatchStatus() {
    if (this.toanHp <= 0 || this.thayHp <= 0) {
      this.handleKnockout();
    } else {
      // Tiếp tục chuỗi hành động tự động
      this.scheduleNextStep(() => {
        this.runNextActionStep();
      }, 700);
    }
  }

  // Xử lý khi có K.O (Knockout)
  handleKnockout() {
    this.gameState = 'KO';
    window.soundEngine.playKOSound();
    this.renderer.triggerScreenFlash('#ff0055', 0.9);

    let winner = "";
    let loser = "";

    if (this.toanHp <= 0 && this.thayHp <= 0) {
      // Hòa cùng gục
      this.renderer.toan.state = 'ko';
      this.renderer.thay.state = 'ko';
      winner = "HÒA NHAU! CẢ HAI QUÁN CÙNG SẬP!";
    } else if (this.toanHp <= 0) {
      this.renderer.toan.state = 'ko';
      this.renderer.thay.state = 'idle';
      this.scoreThay++;
      winner = "THẦY CYBER VIP THẮNG ÁP ĐẢO!";
      loser = "toan";
    } else {
      this.renderer.thay.state = 'ko';
      this.renderer.toan.state = 'idle';
      this.scoreToan++;
      winner = "TOẢN CHỦ QUÁN CỎ CHIẾN THẮNG!";
      loser = "thay";
    }

    // Trả thưởng cược
    if (this.currentBet.target) {
      if ((this.currentBet.target === 'toan' && loser === 'thay') ||
          (this.currentBet.target === 'thay' && loser === 'toan')) {
        const reward = this.currentBet.amount * 2;
        this.netCoins += reward;
        this.updateCoinDisplay();
        this.addCommentary(`🎉 CHÚC MỪNG! Bạn đã thắng cược nhận được +${reward} Điểm Nét!`);
      } else {
        this.addCommentary(`💸 TIẾC QUÁ! Bạn đã mất ${this.currentBet.amount} Điểm Nét trong hiệp này!`);
      }
    }

    this.dom.koWinnerText.textContent = winner;
    this.dom.koBanner.classList.add('show');
    this.addCommentary(`🏆 ${winner}`);

    // Tự động sang Round tiếp theo sau 3.5s
    if (this.autoLoop) {
      this.scheduleNextStep(() => {
        this.round++;
        this.startMatch();
      }, 3500);
    }
  }

  hideSpeechBubbles() {
    this.dom.toanBubble.classList.remove('show');
    this.dom.thayBubble.classList.remove('show');
  }

  updateHUD() {
    // HP Toản
    const toanPct = (this.toanHp / this.maxHp) * 100;
    this.dom.toanHpBar.style.width = `${toanPct}%`;
    this.dom.toanHpText.textContent = `${this.toanHp}/${this.maxHp} HP`;
    if (toanPct < 30) this.dom.toanHpBar.style.background = '#ef4444';
    else this.dom.toanHpBar.style.background = 'linear-gradient(90deg, #eab308, #22c55e)';

    // HP Thầy
    const thayPct = (this.thayHp / this.maxHp) * 100;
    this.dom.thayHpBar.style.width = `${thayPct}%`;
    this.dom.thayHpText.textContent = `${this.thayHp}/${this.maxHp} HP`;
    if (thayPct < 30) this.dom.thayHpBar.style.background = '#ef4444';
    else this.dom.thayHpBar.style.background = 'linear-gradient(90deg, #38bdf8, #a855f7)';

    // Nộ (Rage)
    this.dom.toanRageBar.style.width = `${this.toanRage}%`;
    this.dom.thayRageBar.style.width = `${this.thayRage}%`;

    // Tỉ số & Hiệp đấu
    this.dom.scoreText.textContent = `${this.scoreToan} - ${this.scoreThay}`;
    this.dom.roundText.textContent = `ROUND ${this.round}`;
  }

  addCommentary(text) {
    if (this.dom.commentaryText) {
      this.dom.commentaryText.innerHTML = text;
    }
  }

  // Mô phỏng Livestream Chat của cộng đồng game thủ
  startChatSimulator() {
    setInterval(() => {
      if (Math.random() < 0.7) {
        const item = BANTER_DATABASE.audienceComments[
          Math.floor(Math.random() * BANTER_DATABASE.audienceComments.length)
        ];
        this.addAudienceMessage(item.user, item.text);
      }
    }, 2200);
  }

  addAudienceMessage(user, text) {
    if (!this.dom.chatFeed) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message';
    msgDiv.innerHTML = `<span class="chat-user">${user}:</span> <span class="chat-text">${text}</span>`;
    this.dom.chatFeed.appendChild(msgDiv);
    this.dom.chatFeed.scrollTop = this.dom.chatFeed.scrollHeight;

    // Giữ số lượng tin nhắn không quá 40
    if (this.dom.chatFeed.children.length > 40) {
      this.dom.chatFeed.removeChild(this.dom.chatFeed.children[0]);
    }
  }

  scheduleNextStep(callback, delayMs) {
    if (this.stepTimeout) clearTimeout(this.stepTimeout);
    this.stepTimeout = setTimeout(() => {
      if (!this.isPaused) {
        callback();
      } else {
        // Đợi hết pause
        const waitInterval = setInterval(() => {
          if (!this.isPaused) {
            clearInterval(waitInterval);
            callback();
          }
        }, 200);
      }
    }, delayMs / this.speed);
  }
}

// Khởi chạy khi tài liệu sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  window.game = new QuanNetBattleGame();
  // Khởi động trận đầu tiên
  setTimeout(() => {
    window.game.startMatch();
  }, 500);
});
