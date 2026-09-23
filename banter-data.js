/**
 * Kho dữ liệu Cà Khịa, Đòn Đánh, Chiêu Cuối & Khán Giả Chat
 * Đại Chiến Quán Nét: Toản vs Thầy
 */

const BANTER_DATABASE = {
  // Hội thoại đấu khẩu phân loại theo chủ đề
  categories: [
    {
      id: "toan_3cm_tiem_vang",
      name: "Toản 3cm, Màu Hường & Cô Chủ Tiệm Vàng",
      dialogues: [
        {
          thay: "Toản ơi, sắm dàn phím cơ Custom đắt tiền bọc đệm da điều hòa 16 độ mà nghe đồn thước đo của chú mày có đúng 3cm phải không?",
          toan: "3cm nhưng là 3cm thép đặc gánh team! Còn hơn cái đầu trọc lốc của Thầy soi gương rọi đèn pha chói mắt cả khu phố!",
          dmgToan: 180,
          dmgThay: 140,
          reaction: "cay_cu"
        },
        {
          thay: "Hôm qua thấy chú Toản mặc nguyên cây áo màu hường cánh sen đứng trước cửa tiệm vàng đối diện vẫy tay cua cô chủ tiệm vàng, người ta thả chó ra đuổi kìa!",
          toan: "Người ta gọi đấy là tình yêu màu hồng lãng mạn chân chính! Thầy đầu trọc chỉ biết ngồi ôm đống phím cơ Fuhlen D liệt nút D thì làm sao hiểu được tình yêu!",
          dmgToan: 190,
          dmgThay: 150,
          reaction: "soc_nang"
        },
        {
          toan: "Quán tao có điều hòa 16 độ mát lạnh, phòng hút thuốc kính cách âm riêng! Nhìn sang quán Thầy không có điều hòa, trưa nắng 40 độ khách cởi trần ngồi ghế nhựa rít thuốc khói mù mịt như lò xông hơi!",
          thay: "Đấy là không gian phóng khoáng tự do! Khách vừa phì phèo thuốc lá vừa combat LMHT cảm xúc thăng hoa, cần gì chui vào cái hộp kính 2 mét vuông ngột ngạt của chú!",
          dmgToan: 140,
          dmgThay: 185,
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
          thay: "Tàn thuốc tăng thêm hương vị đậm đà dân dã! Còn hơn quán mày máy lạnh phà phà mà vắng hoe, chú mày ngồi đếm ruồi cả ngày!",
          dmgToan: 150,
          dmgThay: 180,
          reaction: "cay_cu"
        },
        {
          toan: "Ngày nào cũng thấy Thầy đầu trọc ngồi cặm cụi lấy nhíp với cồn 90 độ cạy switch quang phím cơ Fuhlen D ra lau, khách chơi LMHT bấm nút D Tốc Biến không ăn bị gõ đầu kìa!",
          thay: "Phím cơ Fuhlen D quang học bất tử của tao bấm cả triệu lần chỉ kẹt đúng nút D! Còn hơn ai kia dùng phím cơ màu hường mà khách gõ lún cả switch!",
          dmgToan: 140,
          dmgThay: 175,
          reaction: "chua_chat"
        },
        {
          thay: "Chú Toản mở phòng hút thuốc cho lắm vào, khói thuốc bay sang tiệm vàng làm cô chủ tiệm vàng đeo 3 lớp khẩu trang đóng cửa sắt từ chối gặp!",
          toan: "Người ta đóng cửa đếm vàng chứ ai như Thầy! Quán không điều hòa mồ hôi nhỏ tong tòng xuống phím Fuhlen chập cả mạch nút D!",
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
          toan: "Dàn máy tao lên full phím cơ Custom màu hường gõ tanh tách giòn giã! Dàn phím cơ Fuhlen D lỗi cảm biến nút D của Thầy tuổi gì so sánh!",
          thay: "Phím cơ màu hường gõ điếc tai mà chú mày 'ngắn 3cm' nên bấm nút cũng bị hụt! Phím cơ Fuhlen D của tao tuy hay hỏng nút D nhưng vỏ kim loại đập không vỡ!",
          dmgToan: 195,
          dmgThay: 130,
          reaction: "cay_cu"
        },
        {
          thay: "Quán chú Toản ghế da bọc nệm nứt toác, khách ngồi lâu dính chặt mồ hôi, đứng dậy kéo theo cả mảng da rách kìa!",
          toan: "Ghế da nhập khẩu êm như sofa phòng khách! Còn ghế nhựa của Thầy khách ngồi lâu chân ghế choãi ra trượt té dập mông!",
          dmgToan: 135,
          dmgThay: 165,
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
        quote: "Ai bảo 3cm? Nhận lấy đòn sát thương tự ái cực hạn này Thầy!",
        damage: 190,
        rageGain: 25,
        type: "projectile",
        item: "ruler"
      },
      {
        name: "Vung Bàn Phím Cơ Màu Hường",
        quote: "Phím cơ màu hường cánh sen phang thẳng vào quả đầu trọc bóng loáng!",
        damage: 230,
        rageGain: 35,
        type: "smash",
        item: "pink_keyboard"
      },
      {
        name: "Thổi Khói Phòng Hút Thuốc",
        quote: "Khói thuốc mù mịt che mắt đầu trọc của Thầy!",
        damage: 240,
        rageGain: 40,
        type: "splash",
        item: "smoke"
      }
    ],
    thay: [
      {
        name: "Ném Phím Cơ Fuhlen D Liệt Nút D",
        quote: "Phím cơ Fuhlen D nát switch nút D nện vỡ kính phòng hút thuốc!",
        damage: 200,
        rageGain: 25,
        type: "smash",
        item: "keyboard"
      },
      {
        name: "Phang Ghế Nhựa Song Long Đỏ Bất Tử",
        quote: "Thời đại 4.0 vẫn dùng ghế nhựa nện bay màu dàn ghế da!",
        damage: 240,
        rageGain: 35,
        type: "projectile",
        item: "chair"
      },
      {
        name: "Xịt Cồn 90 Độ Sửa Cảm Biến Switch D",
        quote: "Cồn 90 độ chuyên thông mạch switch phím cơ Fuhlen D rửa sạch sự màu hường của chú!",
        damage: 230,
        rageGain: 40,
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
        description: "Toản phóng xuất hào quang màu hường trái tim và chiếc nhẫn vàng giả thiêu đốt đối thủ!"
      },
      {
        name: "SẬP NGUỒN ĐIỀU HÒA & PHÒNG HÚT THUỐC",
        quote: "MẤT ĐIỆN TOÀN KHU! Khói phòng hút thuốc ngập tràn thiêu rụi quán Thầy!",
        damage: 530,
        sound: "power_cut",
        effect: "blackout",
        description: "Cầu dao tổng sập, khói thuốc mù mịt bóp nghẹt toàn bộ dàn ghế nhựa của Thầy!"
      }
    ],
    thay: [
      {
        name: "ĐẦU TRỌC PHẢN QUANG MÙ MẮT TOÀN DIỆN",
        quote: "HÀO QUANG ĐẦU TRỌC 10.000 LUMEN CHIẾU THẲNG VÀO NỖI ĐAU 3CM!",
        damage: 520,
        sound: "laser_blast",
        effect: "bald_flash",
        description: "Quả đầu trọc của Thầy rực sáng như mặt trời làm Toản mù mắt cay cú gục ngã!"
      },
      {
        name: "TRẬN ĐỒ GHẾ NHỰA & 100 PHÍM CƠ FUHLEN D",
        quote: "GHẾ NHỰA ĐẠI ĐỒNG TIẾN BẤT TỬ! CƠN MƯA PHÍM CƠ FUHLEN D LIỆT NÚT D CHÔN VÙI MÀU HƯỜNG!",
        damage: 560,
        sound: "keyboard_fury",
        effect: "chair_fury",
        description: "Trận địa ghế nhựa đỏ và phím cơ Fuhlen D đè nẹp toàn bộ quán nét ghế da của Toản!"
      }
    ]
  },

  // Dòng bình luận ảo của khán giả (Livestream Chat Feed)
  audienceComments: [
    { user: "Cô_Chủ_Tiệm_Vàng", text: "Toản ơi đừng sang đây tán em nữa, em thích người đầu trọc hơn haha =))" },
    { user: "Thánh_Đo_3cm", text: "Anh Toản cay cú vụ 3cm đỏ hết cả mặt kìa anh em =))))" },
    { user: "Fan_Toản_Màu_Hường", text: "Áo hồng cánh sen của anh Toản hôm nay cháy phố quá anh ơi!" },
    { user: "Dân_Chơi_Fuhlen_D", text: "Thầy ơi phím cơ Fuhlen D máy 7 lại liệt nút D rồi, thay switch quang đi Thầy!" },
    { user: "Khách_Phòng_Hút_Thuốc", text: "Bật điều hòa 16 độ phòng hút thuốc phê quá anh Toản ơi!" },
    { user: "Hội_Yêu_Ghế_Nhựa", text: "Ghế nhựa Song Long ngồi bao đời vẫn bền, thời đại này ghế nhựa là chân ái!" },
    { user: "Đầu_Trọc_Phản_Quang", text: "Quả đầu Thầy láng bóng như gương soi rõ mặt anh Toản luôn" },
    { user: "Boy_Phím_Cơ_Pink", text: "Bộ phím cơ Custom màu hồng của anh Toản gõ êm tay phết" },
    { user: "Thợ_Hàn_Switch_Fuhlen", text: "Phím cơ Fuhlen D lỗi nút D là bệnh kinh niên rồi Thầy ơi =)))" },
    { user: "Kèo_Cược_3cm", text: "Tôi theo cửa Thầy đầu trọc ghế nhựa 500 điểm nét, vía đông khách bao thắng!" }
  ],

  // Bình luận viên (Commentary Announcements)
  announcements: {
    start: [
      "TIẾNG TRỐNG TRANH BÁ QUÁN NÉT BẮT ĐẦU!",
      "ĐẠI CHIẾN NÉT CỎ VS CYBER VIP - AI SẼ LÀ VUA PHÒNG MÁY?",
      "HAI CHỦ QUÁN ĐÃ BẬT CHẾ ĐỘ CÀ KHỊA KHÔNG KHOAN NHƯỢNG!"
    ],
    ko: [
      "K.O NỐC AO RỒI! MỘT PHA SÁT THƯƠNG TỰ ÁI KHÔNG THỂ HỒI PHỤC!",
      "ĐÃ CÓ NGƯỜI GỤC NGÃ! TIỆM NÉT CHÁY KHÓI NGHI NGÚT!",
      "CHIẾN THẮNG ÁP ĐẢO! THUA VỀ PHẢI GIẢM GIÁ GIỜ CHƠI 50%!"
    ],
    climax: [
      "ĐỘ CAY CÚ ĐÃ ĐẠT 100%! CHIÊU CUỐI ĐANG ĐƯỢC TÍCH TỤ!",
      "CHUẨN BỊ XẢ NỘ! CÁC KHÁN GIẢ MAU TÌM CHỖ TRÚ NẨN!"
    ]
  }
};

window.BANTER_DATABASE = BANTER_DATABASE;
