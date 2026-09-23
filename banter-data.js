/**
 * Kho dữ liệu Cà Khịa, Đòn Đánh, Chiêu Cuối & Khán Giả Chat
 * Đại Chiến Quán Nét: Toản vs Thầy
 */

const BANTER_DATABASE = {
  // Hội thoại đấu khẩu phân loại theo chủ đề
  categories: [
    {
      id: "toan_3cm_tiem_vang",
      name: "Toản Có Vợ Nhưng Mê Cua Cô Chủ Tiệm Vàng & Nỗi Đau 3cm",
      dialogues: [
        {
          thay: "Bạn trẻ TN có vợ ở nhà dữ như sư tử rồi mà ngày nào cũng lén lút mặc áo phông màu hường xịt nước hoa đứng trước cửa vẫy tay cua cô chủ tiệm vàng, để Thầy rút điện thoại mách vợ bạn trẻ sang vặn tai!",
          toan: "Vợ em chỉ quản lý tiền net thôi Thầy ơi, còn trái tim em thuộc về cô chủ tiệm vàng! Thầy đầu trọc ế cả đời ôm tháp ghế nhựa thì làm sao hiểu được sự lãng mạn!",
          dmgToan: 190,
          dmgThay: 140,
          reaction: "cay_cu"
        },
        {
          thay: "Hôm qua Thầy thấy vợ bạn trẻ TN cầm cây lăn bột phát hiện quỹ đen bạn trẻ giấu dưới đáy phím cơ màu hường đem đi mua nhẫn Shopee tặng cô tiệm vàng, bị vợ rượt chạy 8 vòng quanh quán nét kìa!",
          toan: "Em tập thể dục cho khỏe người thôi Thầy! Còn hơn Thầy ngày nào cũng cặm cụi lấy cồn 90 độ lau phím cơ Fuhlen D liệt nút D mà khách vẫn mắng vốn!",
          dmgToan: 195,
          dmgThay: 150,
          reaction: "soc_nang"
        },
        {
          thay: "Cô chủ tiệm vàng người ta bảo thà lấy Thầy đầu trọc nét cỏ còn hơn lấy bạn trẻ TN có vợ rồi mà thước đo có đúng 3cm lại còn đem nhẫn xi mạ 29k đi gạ tình!",
          toan: "Thước em 3cm nhưng là 3cm thép đặc gánh cả dàn Cyber VIP Thầy ơi! Quả đầu trọc của Thầy soi gương rọi đèn pha chói mắt người ta thả chó ra đuổi kìa!",
          dmgToan: 180,
          dmgThay: 160,
          reaction: "cay_cu"
        },
        {
          toan: "Quán em có điều hòa 16 độ mát lạnh, mở xuyên đêm 24/7 đón cô chủ tiệm vàng sang trú nóng! Nhìn sang quán Thầy 22h tối vác chổi đuổi khách như đuổi tà!",
          thay: "Bạn trẻ TN mở 24/7 để trốn về nhà nhìn mặt vợ thì có! Thầy đúng 22h đóng cửa đi ngủ điều độ giữ gìn nhan sắc đầu trọc bóng loáng!",
          dmgToan: 150,
          dmgThay: 190,
          reaction: "cay_cu"
        }
      ]
    },
    {
      id: "thay_dau_troc_phim_fuhlen",
      name: "Thầy Đầu Trọc, Hút Thuốc Không Điều Hòa & Phím Fuhlen D",
      dialogues: [
        {
          toan: "Quán Thầy không có điều hòa mà bật quạt trần cọt kẹt, gió thổi tàn thuốc lá bay thẳng vào bát mì tôm 18k của khách kìa Thầy ơi!",
          thay: "Tàn thuốc tăng thêm hương vị đậm đà dân dã cho các cháu! Còn hơn quán bạn trẻ TN máy lạnh phà phà mà vắng hoe, ngồi đếm ruồi cả ngày!",
          dmgToan: 150,
          dmgThay: 180,
          reaction: "cay_cu"
        },
        {
          toan: "Ngày nào em cũng thấy Thầy đầu trọc ngồi lấy nhíp với cồn 90 độ cạy switch phím cơ Fuhlen D ra lau, khách chơi LMHT bấm nút D Tốc Biến không ăn bị gõ đầu kìa Thầy!",
          thay: "Phím cơ Fuhlen D quang học bất tử của Thầy bấm cả triệu lần chỉ kẹt đúng nút D! Còn hơn bạn trẻ TN dùng phím cơ màu hường khách gõ lún cả switch!",
          dmgToan: 140,
          dmgThay: 175,
          reaction: "chua_chat"
        },
        {
          thay: "Bạn trẻ TN mở phòng hút thuốc cho lắm vào, khói thuốc bay sang tiệm vàng làm cô chủ tiệm vàng đeo 3 lớp khẩu trang đóng cửa sắt từ chối gặp bạn trẻ kìa!",
          toan: "Người ta đóng cửa đếm vàng chứ ai như Thầy! Quán Thầy không có điều hòa mồ hôi nhỏ tong tòng xuống phím Fuhlen chập cả mạch nút D!",
          dmgToan: 185,
          dmgThay: 140,
          reaction: "cay_cu"
        }
      ]
    },
    {
      id: "ban_quyen_may_moc",
      name: "Phím Cơ Màu Hường vs Phím Cơ Fuhlen D",
      dialogues: [
        {
          toan: "Dàn máy em lên full phím cơ Custom màu hường gõ tanh tách giòn giã! Dàn phím cơ Fuhlen D lỗi cảm biến nút D của Thầy tuổi gì so sánh với em!",
          thay: "Phím cơ màu hường của bạn trẻ TN gõ điếc tai mà bạn trẻ 'ngắn 3cm' nên bấm nút cũng bị hụt! Phím Fuhlen D của Thầy tuy kẹt nút D nhưng vỏ kim loại đập không vỡ!",
          dmgToan: 195,
          dmgThay: 130,
          reaction: "cay_cu"
        },
        {
          thay: "Quán bạn trẻ TN ghế da bọc nệm nứt toác, khách ngồi lâu dính chặt mồ hôi, đứng dậy kéo theo cả mảng da rách kìa!",
          toan: "Ghế da em nhập khẩu êm như sofa phòng khách Thầy ơi! Còn ghế nhựa của Thầy khách ngồi lâu chân ghế choãi ra trượt té dập mông!",
          dmgToan: 135,
          dmgThay: 165,
          reaction: "bat_luc"
        }
      ]
    },
    {
      id: "xuyen_dem_vs_22h_duoi_khach",
      name: "Nét Toản Mở Xuyên Đêm 24/7 vs Nét Thầy 22h Đóng Cửa Đuổi Khách",
      dialogues: [
        {
          toan: "Quán em mở xuyên đêm 24/7 phục vụ anh em leo rank thâu đêm suốt sáng, combo đêm mì trứng sting dâu tưng bừng! Nhìn sang quán Thầy đúng 22h tối là vác chổi quét nhà đuổi khách như đuổi tà!",
          thay: "Thầy đuổi là giữ gìn sức khỏe cho các cháu bạn trẻ TN à! Đúng 22h là Thầy sập cầu dao, kéo cửa sắt đi ngủ! Thức đêm cày rank teo não hại thận, chơi bời gì giờ đấy!",
          dmgToan: 195,
          dmgThay: 145,
          reaction: "cay_cu"
        },
        {
          thay: "Bạn trẻ TN mở xuyên đêm cho lắm vào rồi nửa đêm khách ngủ gật gục mặt xuống bàn phím màu hường dính đầy dãi! 22h đóng cửa như Thầy vừa ngủ ngon vừa không sợ trộm!",
          toan: "Khách đang combat rồng ngàn tuổi với Baron mà đúng 22h Thầy ra giật phích cắm tắt phụt máy đuổi về, cả quán ùa sang nét em mua combo đêm kìa Thầy!",
          dmgToan: 140,
          dmgThay: 200,
          reaction: "soc_nang"
        },
        {
          toan: "22h tối Thầy cầm chổi chà gõ từng máy quát 'Hết giờ rồi về ngủ mai đi học!', khách cay cú bảo Thầy keo kiệt không dám trả tiền điện đêm kìa!",
          thay: "Quán nét cỏ của Thầy có gia phong nguyên tắc! Đúng 22h là dẹp ghế nhựa, tắt quạt trần, đứa nào cù nhây ở lại Thầy lấy cồn 90 độ xịt đuổi thẳng cổ bạn trẻ TN nhé!",
          dmgToan: 180,
          dmgThay: 155,
          reaction: "bat_luc"
        }
      ]
    }
  ],

  // Đòn đánh vật lý thường (Physical Actions)
  physicalAttacks: {
    toan: [
      {
        name: "Phang Thước Kẻ Đo 3cm",
        quote: "Thầy bảo em 3cm hả? Nhận lấy đòn sát thương tự ái cực hạn này Thầy ơi!",
        damage: 190,
        rageGain: 25,
        type: "projectile",
        item: "ruler"
      },
      {
        name: "Vung Bàn Phím Cơ Màu Hường",
        quote: "Phím cơ màu hường cánh sen của em phang thẳng vào quả đầu trọc bóng loáng của Thầy!",
        damage: 230,
        rageGain: 35,
        type: "smash",
        item: "pink_keyboard"
      },
      {
        name: "Combo Xuyên Đêm 24/7",
        quote: "Quán em mở xuyên đêm 24/7 kính tặng Thầy cả bát mì tôm trứng xúc xích vào đầu!",
        damage: 240,
        rageGain: 35,
        type: "projectile",
        item: "noodle"
      },
      {
        name: "Thổi Khói Phòng Hút Thuốc",
        quote: "Khói thuốc phòng lạnh của em che mờ quả đầu trọc của Thầy!",
        damage: 220,
        rageGain: 30,
        type: "splash",
        item: "smoke"
      }
    ],
    thay: [
      {
        name: "Vác Chổi Đuổi Khách 22H",
        quote: "22h rồi bạn trẻ TN ơi! Hết giờ chơi! Thầy vác chổi quét sạch phòng net màu hường!",
        damage: 230,
        rageGain: 35,
        type: "smash",
        item: "broom"
      },
      {
        name: "Ném Phím Cơ Fuhlen D Liệt Nút D",
        quote: "Phím cơ Fuhlen D nát switch nút D của Thầy nện vỡ kính phòng hút thuốc của bạn trẻ TN!",
        damage: 200,
        rageGain: 25,
        type: "smash",
        item: "keyboard"
      },
      {
        name: "Phang Ghế Nhựa Song Long Đỏ Bất Tử",
        quote: "Thời đại 4.0 Thầy vẫn dùng ghế nhựa Song Long nện bay màu dàn ghế da của bạn trẻ TN!",
        damage: 240,
        rageGain: 35,
        type: "projectile",
        item: "chair"
      },
      {
        name: "Xịt Cồn 90 Độ Sửa Cảm Biến Switch D",
        quote: "Cồn 90 độ chuyên thông mạch switch của Thầy rửa sạch sự màu hường của bạn trẻ TN!",
        damage: 220,
        rageGain: 30,
        type: "spray",
        item: "spray"
      }
    ]
  },

  // Tuyệt kỹ chiêu cuối (Ultimate Moves)
  ultimates: {
    toan: [
      {
        name: "BÃO MÀU HƯỜNG 3CM & CUA CÔ CHỦ TIỆM VÀNG",
        quote: "EM ƠI TIỆM VÀNG ĐỐI DIỆN ƠI! ANH TOẢN PHÍM CƠ MÀU HƯỜNG TỚI ĐÂY!",
        damage: 510,
        sound: "laser_blast",
        effect: "pink_storm",
        description: "Toản phóng xuất hào quang màu hường trái tim và chiếc nhẫn vàng Shopee thiêu đốt đối thủ!"
      },
      {
        name: "COMBO XUYÊN ĐÊM 24/7 ĐÈ BẸP GIỜ GIỚI NGHIÊM",
        quote: "NET TOẢN KHÔNG BAO GIỜ NGỦ! COMBO ĐÊM 24/7 QUÉT SẠCH 22H ĐÓNG CỬA CỦA THẦY!",
        damage: 540,
        sound: "laser_blast",
        effect: "night_storm",
        description: "Bão combo đêm mì trứng sting dâu 24/7 bùng nổ cuốn phăng quán nét cỏ của Thầy!"
      },
      {
        name: "SẬP NGUỒN ĐIỀU HÒA & PHÒNG HÚT THUỐC",
        quote: "MẤT ĐIỆN TOÀN KHU! Khói phòng hút thuốc của em ngập tràn thiêu rụi quán Thầy!",
        damage: 520,
        sound: "power_cut",
        effect: "blackout",
        description: "Cầu dao tổng sập, khói thuốc mù mịt bóp nghẹt toàn bộ dàn ghế nhựa của Thầy!"
      }
    ],
    thay: [
      {
        name: "ĐÚNG 22:00 SẬP CẦU DAO & VÁC CHỔI ĐUỔI HẾT VỀ",
        quote: "22 GIỜ RỒI BẠN TRẺ TN ƠI! SẬP CẦU DAO! VỀ NHÀ VỚI VỢ ĐI!",
        damage: 570,
        sound: "power_cut",
        effect: "blackout",
        description: "Đúng 22h Thầy giật sập cầu dao tổng, vác chổi chà quét sạch cả sàn đấu không chừa một ai!"
      },
      {
        name: "ĐẦU TRỌC PHẢN QUANG MÙ MẮT TOÀN DIỆN",
        quote: "HÀO QUANG ĐẦU TRỌC 10.000 LUMEN CHIẾU THẲNG VÀO NỖI ĐAU 3CM CỦA BẠN TRẺ TN!",
        damage: 520,
        sound: "laser_blast",
        effect: "bald_flash",
        description: "Quả đầu trọc của Thầy rực sáng như mặt trời làm Toản mù mắt cay cú gục ngã!"
      },
      {
        name: "TRẬN ĐỒ GHẾ NHỰA & 100 PHÍM CƠ FUHLEN D",
        quote: "GHẾ NHỰA ĐẠI ĐỒNG TIẾN BẤT TỬ! CƠN MƯA PHÍM CƠ FUHLEN D LIỆT NÚT D CHÔN VÙI MÀU HƯỜNG!",
        damage: 550,
        sound: "keyboard_fury",
        effect: "chair_fury",
        description: "Trận địa ghế nhựa đỏ và phím cơ Fuhlen D đè nẹp toàn bộ quán nét ghế da của Toản!"
      }
    ]
  },

  // Dòng bình luận ảo của khán giả (Livestream Chat Feed)
  audienceComments: [
    { user: "Vợ_Toản_Sư_Tử", text: "TOẢN! Tối nay về nhà biết tay bà, dám trích tiền net đi mua nhẫn tặng tiệm vàng à!" },
    { user: "Cô_Chủ_Tiệm_Vàng", text: "Toản ơi đem nhẫn đồng mạ vàng sang đây bà lấy búa đập nát bây giờ =)))" },
    { user: "Hội_Những_Người_Sợ_Vợ", text: "Anh Toản gan to bằng trời, có vợ rồi mà công khai cua gái tiệm vàng =)))" },
    { user: "Dân_Cày_Đêm", text: "22h đang combat rồng ngàn tuổi bị Thầy tắt phụt điện cay vãi chưởng =))))" },
    { user: "Khách_Quen_Toản", text: "Sang quán anh Toản combo đêm 35k mì trứng sting dâu cày tới 6h sáng sướng vãi!" },
    { user: "Học_Sinh_Gương_Mẫu", text: "Thầy 22h vác chổi đuổi về là có tâm đấy, để các cháu còn ngủ mai đi học =))" },
    { user: "Chó_Corgi_Tiệm_Vàng", text: "Gâu gâu! Anh Toản 3cm lại lén lút đứng trước cửa tiệm vàng kìa!" },
    { user: "Thánh_Đo_3cm", text: "Anh Toản cay cú vụ 3cm đỏ hết cả mặt kìa anh em =))))" },
    { user: "Dân_Chơi_Fuhlen_D", text: "Thầy ơi phím cơ Fuhlen D máy 7 lại liệt nút D rồi, thay switch quang đi Thầy!" },
    { user: "Team_Cú_Đêm", text: "Nét Toản mở 24/7 phòng hút thuốc ghế da ngủ luôn tại quán được!" },
    { user: "Hội_Yêu_Ghế_Nhựa", text: "Ghế nhựa Song Long ngồi bao đời vẫn bền, 22h xếp chồng lên nhau thành tháp luôn!" },
    { user: "Đầu_Trọc_Phản_Quang", text: "Quả đầu Thầy láng bóng như gương soi rõ mặt cô chủ tiệm vàng luôn" },
    { user: "Kèo_Cược_Tiệm_Vàng", text: "Kèo này ai thắng được cô chủ tiệm vàng cho sang ngồi ké điều hòa uống nước ngọt!" }
  ],

  // KHO TÌNH HUỐNG HÀI HƯỚC ĐẶC BIỆT (COMEDY SITUATIONS)
  comedySituations: [
    {
      id: "vo_toan_bat_qua_tang",
      title: "👰 SƯ TỬ HÀ ĐÔNG: VỢ TOẢN XUẤT HIỆN TÚM TAI VỀ NẤU CƠM!",
      desc: "Vợ Toản cầm cây lăn bột phi từ trong nhà ra túm chặt tai Toản: 'Mày có vợ rồi còn mặc áo hường sang đây cua tiệm vàng hả!'. Toản quỳ rạp xin tha, mất 220 HP vì bị véo tai!",
      target: "toan",
      dmgToan: 220,
      dmgThay: 0,
      rageToan: 80,
      rageThay: 50,
      sound: "slap_ear",
      visual: "wife_attack"
    },
    {
      id: "thay_mach_vo_toan",
      title: "📞 THẦY RÚT ĐIỆN THOẠI MÁCH VỢ TOẢN: 'CHỒNG CHỊ LẠI MẶC ÁO HỒNG SANG ĐÂY!'",
      desc: "Thầy gọi loa ngoài mách vợ Toản, tiếng vợ Toản gầm qua loa điện thoại làm Toản giật bắn mình té khỏi ghế da, mất 180 HP tự ái!",
      target: "toan",
      dmgToan: 180,
      dmgThay: 0,
      rageToan: 50,
      rageThay: 60,
      sound: "alarm_whistle",
      visual: "phone_call"
    },
    {
      id: "thu_nhan_vang_gia",
      title: "💍 CÔ CHỦ TIỆM VÀNG MANG CÂN TIỂU LY SANG THỬ NHẪN TOẢN TẶNG!",
      desc: "Cô chủ tiệm vàng nhỏ dung dịch axit thử chiếc nhẫn 3 chỉ Toản đem gạ tình, nhẫn sủi bọt đen xì lộ ra đồng thau Shopee 29k! Cô chủ dọa mách vợ Toản!",
      target: "toan",
      dmgToan: 180,
      dmgThay: 0,
      rageToan: 30,
      rageThay: 50,
      sound: "gold_clink",
      visual: "gold_test"
    },
    {
      id: "tha_cho_tiem_vang",
      title: "🐕 CÔ CHỦ TIỆM VÀNG THẢ CHÓ CORGI SANG CẮN MÔNG TOẢN!",
      desc: "Thấy Toản đứng gáy 3cm trước cửa sổ, cô chủ thả ngay chó cưng phi sang ngoạm rách quần đùi màu hường của Toản! Toản khóc thét nhảy tưng bừng!",
      target: "toan",
      dmgToan: 160,
      dmgThay: 0,
      rageToan: 60,
      rageThay: 40,
      sound: "dog_bark",
      visual: "dog_attack"
    },
    {
      id: "thay_muon_can_tiem_vang",
      title: "⚖️ THẦY SANG TIỆM VÀNG MƯỢN CÂN TIỂU LY CÂN MÌ TÔM!",
      desc: "Thầy cầm vắt mì Hảo Hảo sang tiệm vàng mượn cân điện tử cân đúng 75g cho khách nét cỏ, bị cô chủ lấy cán chổi gõ đầu đuổi về!",
      target: "thay",
      dmgToan: 0,
      dmgThay: 150,
      rageToan: 50,
      rageThay: 40,
      sound: "broom_hit",
      visual: "scale_mishap"
    },
    {
      id: "thay_22h_sap_dien_tiem_vang",
      title: "⚡ THẦY 22H SẬP CẦU DAO LÀM CHÁY APTOMAT CẢ TIỆM VÀNG!",
      desc: "Đúng 22h Thầy giật cầu dao net cỏ làm đoản mạch cả khu phố, tủ kính tiệm vàng hú còi ầm ĩ! Cô chủ tiệm vàng vác dép ném u đầu cả hai!",
      target: "both",
      dmgToan: 130,
      dmgThay: 160,
      rageToan: 40,
      rageThay: 40,
      sound: "alarm_whistle",
      visual: "blackout_alarm"
    },
    {
      id: "toan_do_thuoc_3cm_lac_vang",
      title: "📏 TOẢN MANG THƯỚC KẺ 3CM SANG ĐO ĐỘ DÀY LẮC VÀNG 9999!",
      desc: "Toản sang gạ: 'Thước 3cm của anh chuẩn milimet từng góc cạnh', cô chủ tiệm vàng tạt nguyên xô nước rửa bát đuổi chạy té khói!",
      target: "toan",
      dmgToan: 170,
      dmgThay: 0,
      rageToan: 50,
      rageThay: 30,
      sound: "water_splash",
      visual: "water_splash"
    }
  ],

  // Bình luận viên (Commentary Announcements)
  announcements: {
    start: [
      "TIẾNG TRỐNG ĐẠI CHIẾN CHỦ TIỆM NET - VÀNG BẮT ĐẦU!",
      "TOẢN MÀU HƯỜNG VS THẦY GHẾ NHỰA - AI SẼ CHIẾM ĐƯỢC TRÁI TIM CÔ CHỦ TIỆM VÀNG?",
      "CÔ CHỦ TIỆM VÀNG ĐÃ MỞ CỬA SỔ HÓNG BIẾN HAI CHỦ QUÁN NÉT!"
    ],
    ko: [
      "K.O NỐC AO RỒI! CÔ CHỦ TIỆM VÀNG ĐÃ CHẤM ĐIỂM NGƯỜI THẮNG CUỘC!",
      "ĐÃ CÓ NGƯỜI GỤC NGÃ! TIỆM VÀNG THẢ CHÓ SANG DỌN DẸP CHIẾN TRƯỜNG!",
      "CHIẾN THẮNG ÁP ĐẢO! KẺ THUA PHẢI SANG TIỆM VÀNG QUÉT RÁC 1 THÁNG!"
    ],
    climax: [
      "CẢ HAI ĐÃ ĐẠT ĐỈNH ĐIỂM CAY CÚ! TIỆM VÀNG ĐỐI DIỆN ĐANG ĐÓNG CỬA TRÁNH ĐẠN!",
      "CHUẨN BỊ XẢ NỘ! CÔ CHỦ TIỆM VÀNG VÁC GẬY RA PHÁN XỬ!"
    ]
  }
};

window.BANTER_DATABASE = BANTER_DATABASE;
