/**
 * CampusMind - Core Mock Data Store
 * Faithfully constructed from BTL-02 CSE122 Specification
 */

const CAMPUS_DATA = {
  currentUser: {
    role: 'student', // 'guest', 'student', 'counselor', 'admin'
    id: 'sv-k64-001',
    name: 'Lê Ngọc An',
    email: 'ngocan@student.edu.vn',
    code: 'SV · K64',
    major: 'Khoa học Máy tính',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    savedResourcesCount: 7,
    completedSessions: 6,
    avgStressScore: '3.2/5',
    stressTrend: 'Giảm 0.4 trong 30 ngày',
    energyLevelImprovement: '+18%'
  },

  counselors: [
    {
      id: 'counselor-01',
      slug: 'nguyen-minh-ha',
      name: 'TS. Nguyễn Minh Hà',
      degree: 'Tiến sĩ Tâm lý học Lâm sàng',
      title: 'Tâm lý học đường · 9 năm kinh nghiệm',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      status: 'Đang nhận lịch',
      tags: ['Lo âu', 'Áp lực học tập', 'Định hướng', 'Quan hệ'],
      rating: 4.9,
      reviewCount: 328,
      responseTime: '24h',
      office: 'Phòng H-204, Cơ sở chính',
      quote: '“Tôi tin rằng mỗi sinh viên đều có sẵn năng lực tự vượt qua khó khăn — vai trò của tôi là giúp bạn nhìn rõ con đường đó.”',
      bio: 'Tốt nghiệp Đại học Quốc gia và hoàn thành chương trình Tiến sĩ tại Pháp. Hơn 9 năm đồng hành cùng hơn 1.500 lượt sinh viên về điều hòa cảm xúc, định hướng tương lai và phục hồi động lực.',
      schedule: {
        week: '02/06 – 08/06/2025',
        slots: [
          { day: 'T2 · 02/06', time: '08:30 – 09:15', status: 'available' },
          { day: 'T2 · 02/06', time: '10:00 – 10:45', status: 'booked', client: 'Trần Hà Linh', topic: 'Nhóm hỗ trợ' },
          { day: 'T2 · 02/06', time: '13:30 – 14:15', status: 'pending', client: 'Đặng Minh Quân', topic: 'Cá nhân 1-1' },
          { day: 'T2 · 02/06', time: '15:00 – 15:45', status: 'booked', client: 'Lê Bảo Anh', topic: 'Cá nhân 1-1' },

          { day: 'T3 · 03/06', time: '08:30 – 09:15', status: 'booked', client: 'Lê Ngọc An', topic: 'Cá nhân 1-1' },
          { day: 'T3 · 03/06', time: '10:00 – 10:45', status: 'cancelled', client: 'Phạm Thu Trang', topic: 'Tư vấn học tập' },
          { day: 'T3 · 03/06', time: '13:30 – 14:15', status: 'booked', client: 'Hoàng Yến Nhi', topic: 'Workshop' },
          { day: 'T3 · 03/06', time: '15:00 – 15:45', status: 'off' },

          { day: 'T4 · 04/06', time: '08:30 – 09:15', status: 'available' },
          { day: 'T4 · 04/06', time: '10:00 – 10:45', status: 'booked', client: 'Vũ Đức Anh', topic: 'Cá nhân 1-1' },
          { day: 'T4 · 04/06', time: '13:30 – 14:15', status: 'available' },
          { day: 'T4 · 04/06', time: '15:00 – 15:45', status: 'pending', client: 'Phan Bảo Ngọc', topic: 'Cá nhân 1-1' },

          { day: 'T5 · 05/06', time: '08:30 – 09:15', status: 'pending', client: 'Nguyễn Hải Nam', topic: 'Cá nhân 1-1' },
          { day: 'T5 · 05/06', time: '10:00 – 10:45', status: 'available' },
          { day: 'T5 · 05/06', time: '13:30 – 14:15', status: 'booked', client: 'Lê Ngọc An', topic: 'Cá nhân 1-1' },
          { day: 'T5 · 05/06', time: '15:00 – 15:45', status: 'available' }
        ]
      }
    },
    {
      id: 'counselor-02',
      slug: 'tran-quang-duy',
      name: 'ThS. Trần Quang Duy',
      degree: 'Thạc sĩ Tâm lý học Ứng dụng',
      title: 'Tâm lý thanh thiếu niên · 6 năm kinh nghiệm',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
      status: 'Đang nhận lịch',
      tags: ['Quản trị cảm xúc', 'Giấc ngủ', 'Kỹ năng nhóm', 'Giao tiếp'],
      rating: 4.8,
      reviewCount: 215,
      responseTime: '12h',
      office: 'Hội trường B & Phòng tư vấn 3',
      quote: '“Mỗi cảm xúc đều mang một thông điệp quan trọng. Thay vì đè nén, hãy cùng học cách lắng nghe và làm bạn với nó.”',
      bio: 'Chuyên gia huấn luyện các workshop quản trị cảm xúc mùa thi, hỗ trợ nhóm và giải quyết xung đột mối quan hệ bạn bè/gia đình.'
    },
    {
      id: 'counselor-03',
      slug: 'pham-thu-trang',
      name: 'ThS. Phạm Thu Trang',
      degree: 'Thạc sĩ Giáo dục & Tâm lý',
      title: 'Tâm lý học đường & Định hướng · 5 năm kinh nghiệm',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
      status: 'Đang nhận lịch',
      tags: ['Động lực học tập', 'Phương pháp ôn thi', 'Thời gian'],
      rating: 4.9,
      reviewCount: 190,
      responseTime: '24h',
      office: 'Phòng Tư vấn 2, Nhà Thư viện',
      quote: '“Khi bạn học đúng phương pháp và hiểu cơ chế hoạt động của não bộ, áp lực sẽ biến thành động lực tích cực.”',
      bio: 'Tập trung vào giải pháp cho sinh viên mất động lực, kiệt sức học đường (burnout) và các kỹ năng lập kế hoạch ôn thi khoa học.'
    }
  ],

  services: [
    {
      id: 'srv-01',
      name: 'Tư vấn cá nhân 1-1',
      category: 'Tư vấn cá nhân',
      duration: '45 phút',
      format: 'Trực tiếp tại cơ sở chính',
      counselor: 'TS. Nguyễn Minh Hà',
      counselorSlug: 'nguyen-minh-ha',
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Còn lịch',
      badgeClass: 'status-confirmed',
      summary: 'Gặp chuyên viên tâm lý để trao đổi về áp lực học tập, cảm xúc và định hướng.',
      description: 'Buổi làm việc riêng tư 1-1 nhằm lắng nghe, làm rõ vấn đề cốt lõi bạn đang gặp phải (lo âu thi cử, cảm giác quá tải, xung đột cá nhân) và cùng nhau xây dựng giải pháp phù hợp.',
      featured: true
    },
    {
      id: 'srv-02',
      name: 'Workshop quản trị cảm xúc',
      category: 'Workshop nhóm',
      duration: '90 phút',
      format: 'Trực tiếp tại Hội trường B',
      counselor: 'ThS. Trần Quang Duy',
      counselorSlug: 'tran-quang-duy',
      status: 'Sắp khai giảng',
      activeStatus: 'Sắp khai giảng',
      isEnabled: true,
      badgeText: 'Sắp khai giảng',
      badgeClass: 'status-pending',
      summary: 'Buổi học nhóm về kỹ thuật nhận diện và điều hòa cảm xúc trong mùa thi.',
      description: 'Chương trình thực hành tương tác trang bị kỹ thuật thở 4-7-8, nhận diện bẫy tư duy tiêu cực và kỹ năng điều hòa cơn giận/lo âu cấp tốc.',
      featured: true
    },
    {
      id: 'srv-03',
      name: 'Chuỗi bài tập thư giãn',
      category: 'Giấc ngủ & thư giãn',
      duration: '12 bài · 40 phút',
      format: 'Online - Tự học',
      counselor: 'CampusMind Wellbeing Team',
      status: 'Tự học',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Online · Tự học',
      badgeClass: 'status-processing',
      summary: 'Hướng dẫn thở, thiền ngắn và bài tập thư giãn cơ tiến triển.',
      description: 'Tuyển tập audio và video ngắn giúp giải tỏa căng cơ vai gáy, làm dịu tâm trí sau giờ học trên giảng đường và dễ đi vào giấc ngủ sâu.',
      featured: true
    },
    {
      id: 'srv-04',
      name: 'Tư vấn phương pháp học tập & động lực',
      category: 'Hỗ trợ học tập',
      duration: '30 phút',
      format: 'Trực tiếp / Online',
      counselor: 'ThS. Phạm Thu Trang',
      counselorSlug: 'pham-thu-trang',
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Còn lịch',
      badgeClass: 'status-confirmed',
      summary: 'Cải thiện chiến lược quản lý thời gian và vượt qua cảm giác chán nản khi học.',
      description: 'Phân tích các lỗ hổng trong thói quen ôn tập, áp dụng kỹ thuật Pomodoro biến thể và phương pháp khối năng lượng để đạt kết quả thi mong muốn.',
      featured: false
    },
    {
      id: 'srv-05',
      name: 'Nhóm hỗ trợ đồng đẳng K64 - K67',
      category: 'Quan hệ & giao tiếp',
      duration: '60 phút',
      format: 'Trực tiếp (Phòng sinh hoạt chung)',
      counselor: 'ThS. Trần Quang Duy',
      counselorSlug: 'tran-quang-duy',
      status: 'Tạm ngưng',
      activeStatus: 'Tạm ngưng',
      isEnabled: false,
      badgeText: 'Tạm ngưng',
      badgeClass: 'status-suspended',
      summary: 'Không gian an toàn chia sẻ khó khăn đồng trang lứa cùng chuyên viên điều phối.',
      description: 'Nhóm giới hạn 6-8 sinh viên, nơi bạn lắng nghe trải nghiệm của người khác, bớt cảm giác cô đơn và tìm thấy sự thấu hiểu từ bạn bè chung hoàn cảnh.',
      featured: false
    },
    {
      id: 'srv-06',
      name: 'Tư vấn cải thiện giấc ngủ',
      category: 'Giấc ngủ & thư giãn',
      duration: '45 phút',
      format: 'Trực tiếp hoặc Google Meet',
      counselor: 'TS. Nguyễn Minh Hà',
      counselorSlug: 'nguyen-minh-ha',
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Còn lịch',
      badgeClass: 'status-confirmed',
      summary: 'Thiết lập nhịp sinh học lành mạnh và trị liệu mất ngủ cấp tính.',
      description: 'Đánh giá các thói quen ánh sáng xanh, caffeine và lo âu ban đêm để phục hồi giấc ngủ tự nhiên.',
      featured: false
    },
    {
      id: 'srv-07',
      name: 'Workshop Vượt qua thói quen trì hoãn',
      category: 'Hỗ trợ học tập',
      duration: '75 phút',
      format: 'Hội trường Nhà A',
      counselor: 'ThS. Phạm Thu Trang',
      counselorSlug: 'pham-thu-trang',
      status: 'Sắp khai giảng',
      activeStatus: 'Sắp khai giảng',
      isEnabled: true,
      badgeText: 'Sắp khai giảng',
      badgeClass: 'status-pending',
      summary: 'Giải mã tâm lý trì hoãn và các công cụ kích hoạt hành động ngay lập tức.',
      description: 'Phá vỡ vòng luẩn quẩn: lo âu -> trì hoãn -> cảm giác tội lỗi -> lo âu nhiều hơn.',
      featured: false
    },
    {
      id: 'srv-08',
      name: 'Quản lý căng thẳng & Burnout mùa đồ án',
      category: 'Workshop nhóm',
      duration: '90 phút',
      format: 'Online qua Zoom',
      counselor: 'ThS. Trần Quang Duy',
      counselorSlug: 'tran-quang-duy',
      status: 'Đang mở đăng ký',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Đang mở',
      badgeClass: 'status-confirmed',
      summary: 'Nhận diện dấu hiệu kiệt sức và các bài tập nạp lại năng lượng tinh thần.',
      description: 'Dành riêng cho sinh viên năm 3, 4 đang làm đồ án tốt nghiệp, thực tập hoặc nghiên cứu khoa học.',
      featured: false
    },
    {
      id: 'srv-09',
      name: 'Kỹ năng giao tiếp & thấu hiểu mối quan hệ',
      category: 'Quan hệ & giao tiếp',
      duration: '45 phút',
      format: 'Trực tiếp tại phòng H-204',
      counselor: 'TS. Nguyễn Minh Hà',
      counselorSlug: 'nguyen-minh-ha',
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Còn lịch',
      badgeClass: 'status-confirmed',
      summary: 'Học cách thiết lập ranh giới lành mạnh và giải quyết bất đồng với bạn cùng phòng/người thân.',
      description: 'Thực hành kỹ thuật lắng nghe chủ động và phản hồi không bạo lực (Nonviolent Communication).',
      featured: false
    },
    {
      id: 'srv-10',
      name: 'Thiền chánh niệm Mindfulness cho sinh viên',
      category: 'Giấc ngủ & thư giãn',
      duration: '8 bài · 25 phút',
      format: 'Online - Tự học',
      counselor: 'CampusMind Wellbeing Team',
      status: 'Tự học',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Online · Tự học',
      badgeClass: 'status-processing',
      summary: 'Thực hành tập trung vào hiện tại, giảm suy nghĩ miên man và quá tải thông tin.',
      description: 'Các bài tập 5-10 phút thực hành ngay tại bàn học hoặc trước giờ thi.',
      featured: false
    },
    {
      id: 'srv-11',
      name: 'Giải tỏa áp lực gia đình & kỳ vọng tương lai',
      category: 'Tư vấn cá nhân',
      duration: '45 phút',
      format: 'Trực tiếp tại phòng H-204',
      counselor: 'TS. Nguyễn Minh Hà',
      counselorSlug: 'nguyen-minh-ha',
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Còn lịch',
      badgeClass: 'status-confirmed',
      summary: 'Tháo gỡ những băn khoăn về kỳ vọng của phụ huynh và sự tự chủ của bản thân.',
      description: 'Hỗ trợ bạn tìm kiếm tiếng nói chung với gia đình và vững vàng trước lựa chọn nghề nghiệp.',
      featured: false
    },
    {
      id: 'srv-12',
      name: 'Nhóm hỗ trợ sinh viên hòa nhập xa nhà',
      category: 'Quan hệ & giao tiếp',
      duration: '60 phút',
      format: 'Phòng sinh hoạt KTX B',
      counselor: 'ThS. Trần Quang Duy',
      counselorSlug: 'tran-quang-duy',
      status: 'Tạm ngưng',
      activeStatus: 'Tạm ngưng',
      isEnabled: false,
      badgeText: 'Tạm ngưng',
      badgeClass: 'status-suspended',
      summary: 'Dành cho tân sinh viên vượt qua cảm giác nhớ nhà và bỡ ngỡ nơi đô thị mới.',
      description: 'Chia sẻ các mẹo làm quen thành phố mới, kết nối bạn bè cùng quê và quản lý tài chính cá nhân.',
      featured: false
    }
  ],

  resources: [
    {
      id: 'res-ai-highlight',
      title: 'Kỹ thuật 5-4-3-2-1 khi cơn lo âu ập tới',
      category: 'Lo âu & căng thẳng',
      type: 'Bài viết',
      duration: '5 phút đọc',
      views: '2.8k',
      bookmarked: true,
      isAiRecommended: true,
      aiReason: 'Dựa trên 2 tài nguyên bạn đã lưu về chủ đề lo âu, thời lượng bạn thường xem (5–8 phút) và mục tiêu “quản lý căng thẳng” trong hồ sơ của bạn.',
      aiConfidence: 'Độ tin cậy: cao',
      badge: '✦ AI-2 Gợi ý',
      summary: 'Phương pháp neo đậu cảm xúc (grounding technique) kinh điển giúp kéo tâm trí trở về với thực tại thông qua 5 giác quan.',
      content: `### Phương pháp 5-4-3-2-1: Lấy lại bình tĩnh sau 3 phút
Khi cơn hoảng sợ hoặc lo âu quá mức ập đến, não bộ của chúng ta chuyển sang cơ chế chiến đấu hoặc bỏ chạy (fight or flight). Lúc này, kỹ thuật neo đậu qua 5 giác quan sẽ gửi tín hiệu an toàn đến vỏ não:

1. **5 vật bạn có thể NHÌN thấy**: Tìm 5 đồ vật xung quanh (ví dụ: cây bút chì, mép bàn gỗ, chiếc quạt, hạt bụi trên cửa sổ, đôi giày).
2. **4 thứ bạn có thể CHẠM vào**: Cảm nhận xúc giác (mặt bàn mát lạnh, chất vải áo len, tóc của bạn, chiếc nhẫn trên tay).
3. **3 âm thanh bạn có thể NGHE thấy**: Tiếng kim đồng hồ, tiếng xe cộ từ xa, tiếng gió thổi qua rèm cửa.
4. **2 mùi hương bạn có thể NGỬI**: Mùi cà phê còn vương trong phòng, mùi trang giấy mới.
5. **1 vị bạn có thể NẾM**: Vị ngòn ngọt của ngụm nước ấm, hoặc viên kẹo bạc hà.

*Mẹo*: Thực hiện bài tập chậm rãi kết hợp hơi thở sâu để đạt hiệu quả cao nhất.`
    },
    {
      id: 'res-01',
      title: '7 thói quen nhỏ giúp ngủ ngon',
      category: 'Giấc ngủ',
      type: 'Bài viết',
      duration: '6 phút',
      views: '1.2k',
      bookmarked: false,
      summary: 'Thay đổi đơn giản về ánh sáng, caffeine và nhịp sinh học giúp bạn vào giấc nhanh hơn.',
      content: 'Một giấc ngủ chất lượng bắt đầu từ lúc bạn thức dậy vào buổi sáng. Hãy tiếp xúc ánh nắng 15 phút đầu ngày, dừng caffeine sau 14:00 và hạ nhiệt độ phòng ngủ xuống khoảng 24-26 độ C.'
    },
    {
      id: 'res-02',
      title: 'Kế hoạch học tập không kiệt sức',
      category: 'Động lực học tập',
      type: 'Video',
      duration: '12 phút',
      views: '860',
      bookmarked: true,
      summary: 'Chia khối thời gian và ưu tiên công việc theo năng lượng thay vì chỉ dựa vào đồng hồ.',
      content: 'Video hướng dẫn cách phân bổ 3 nhóm công việc: Nặng (buổi sáng khi năng lượng cao), Vừa (buổi chiều), và Nhẹ/Phục hồi (buổi tối).'
    },
    {
      id: 'res-03',
      title: 'Nhật ký cảm xúc 21 ngày',
      category: 'Tự nhận thức',
      type: 'Sổ tay PDF',
      duration: 'Tải về · 2.4 MB',
      views: '1.9k',
      bookmarked: false,
      summary: 'Mẫu ghi chép ngắn giúp nhận diện, định danh và chấp nhận cảm xúc hàng ngày.',
      content: 'Sổ tay 21 trang kèm các câu hỏi gợi mở: Hôm nay điều gì khiến tôi biết ơn? Cảm xúc nào xuất hiện nhiều nhất và nó muốn nhắc nhở tôi điều gì?'
    },
    {
      id: 'res-04',
      title: 'Kỹ thuật thở 4-7-8 làm dịu hệ thần kinh',
      category: 'Lo âu & căng thẳng',
      type: 'Bài viết',
      duration: '3 phút',
      views: '3.1k',
      bookmarked: true,
      summary: 'Hít vào 4 giây, giữ hơi 7 giây, thở ra từ từ trong 8 giây để giảm nhịp tim tức thời.',
      content: 'Bài tập được TS. Andrew Weil phát triển, hoạt động như một liều thuốc an thần tự nhiên cho hệ thần kinh phó giao cảm.'
    },
    {
      id: 'res-05',
      title: 'Vượt qua hội chứng kẻ giả mạo (Imposter Syndrome)',
      category: 'Tự nhận thức',
      type: 'Bài viết',
      duration: '8 phút',
      views: '1.5k',
      bookmarked: true,
      summary: 'Vì sao sinh viên giỏi thường cảm thấy mình chưa đủ tốt hoặc sợ bị phát hiện năng lực thật?',
      content: 'Tìm hiểu nguồn gốc của sự tự ti tiềm thức và học cách ghi nhận các thành tựu khách quan của bản thân.'
    },
    {
      id: 'res-06',
      title: 'Xử lý xung đột khi sống cùng phòng KTX',
      category: 'Mối quan hệ',
      type: 'Bài viết',
      duration: '7 phút',
      views: '940',
      bookmarked: false,
      summary: 'Quy tắc 4 bước đối thoại thẳng thắn nhưng không làm tổn thương tình bạn.',
      content: 'Kỹ thuật dùng câu khẳng định "Tôi cảm thấy..." thay vì câu phán xét "Bạn luôn luôn...".'
    },
    {
      id: 'res-07',
      title: 'Thiền buông thư cơ thể (Body Scan Meditation)',
      category: 'Giấc ngủ',
      type: 'Audio',
      duration: '15 phút',
      views: '1.8k',
      bookmarked: true,
      summary: 'Dẫn dắt bằng giọng đọc êm dịu giúp thả lỏng từng nhóm cơ từ đỉnh đầu đến gót chân.',
      content: 'Khuyên dùng trước giờ đi ngủ 20 phút khi đèn phòng đã tắt.'
    },
    {
      id: 'res-08',
      title: 'Sổ tay quản trị năng lượng sinh viên',
      category: 'Động lực học tập',
      type: 'Sổ tay PDF',
      duration: 'Tải về · 1.8 MB',
      views: '1.1k',
      bookmarked: true,
      summary: 'Bộ biểu mẫu theo dõi chu kỳ tỉnh táo và nhịp độ làm việc hiệu quả nhất trong tuần.',
      content: 'Giúp bạn thoát khỏi cái bẫy "ngồi 8 tiếng trước bàn học nhưng chỉ tập trung được 45 phút".'
    }
  ],

  // 18 Appointments for Student (Slide 8)
  appointments: [
    {
      id: 'APT-1042',
      serviceName: 'Tư vấn cá nhân 1-1',
      serviceDuration: '45 phút',
      counselorName: 'TS. Nguyễn Minh Hà',
      counselorDegree: 'Tiến sĩ Tâm lý học Lâm sàng',
      location: 'Phòng H-204, Nhà hiệu bộ',
      format: 'Trực tiếp tại cơ sở chính',
      dateTime: '05/06/2025 · 13:30 – 14:15',
      timeDisplay: '05/06 · 13:30',
      status: 'Đã xác nhận',
      statusClass: 'status-confirmed',
      notes: 'Áp lực học tập và lịch thi cuối kỳ. Mong muốn trao đổi về cách sắp xếp thứ tự ưu tiên.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1043',
      serviceName: 'Workshop quản trị cảm xúc',
      serviceDuration: '90 phút',
      counselorName: 'ThS. Trần Quang Duy',
      counselorDegree: 'Thạc sĩ Tâm lý học Ứng dụng',
      location: 'Hội trường B',
      format: 'Trực tiếp',
      dateTime: '11/06/2025 · 09:00 – 10:30',
      timeDisplay: '11/06 · 09:00',
      status: 'Đang chờ',
      statusClass: 'status-pending',
      notes: 'Đăng ký vé tham dự workshop kỹ thuật điều hòa cảm xúc trong phòng thi.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1044',
      serviceName: 'Tư vấn học tập',
      serviceDuration: '30 phút',
      counselorName: 'ThS. Phạm Thu Trang',
      counselorDegree: 'Thạc sĩ Giáo dục & Tâm lý',
      location: 'Phòng Tư vấn 2, Thư viện',
      format: 'Trực tiếp',
      dateTime: '14/06/2025 · 15:00 – 15:30',
      timeDisplay: '14/06 · 15:00',
      status: 'Bị từ chối',
      statusClass: 'status-rejected',
      notes: 'Chuyên viên bận lịch hội thảo chuyên đề đột xuất, đã gửi gợi ý chuyển sang tuần kế tiếp.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1045',
      serviceName: 'Tư vấn cá nhân 1-1',
      serviceDuration: '45 phút',
      counselorName: 'TS. Nguyễn Minh Hà',
      counselorDegree: 'Tiến sĩ Tâm lý học',
      location: 'Phòng H-204',
      format: 'Trực tiếp',
      dateTime: '20/06/2025 · 10:00 – 10:45',
      timeDisplay: '20/06 · 10:00',
      status: 'Đã hủy',
      statusClass: 'status-cancelled',
      notes: 'Sinh viên chủ động hủy trước 24h do trùng lịch bảo vệ đồ án chuyên ngành.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1046',
      serviceName: 'Nhóm hỗ trợ đồng đẳng',
      serviceDuration: '60 phút',
      counselorName: 'ThS. Trần Quang Duy',
      counselorDegree: 'Thạc sĩ Tâm lý học',
      location: 'Phòng Sinh hoạt chung KTX B',
      format: 'Trực tiếp',
      dateTime: '24/06/2025 · 14:00 – 15:00',
      timeDisplay: '24/06 · 14:00',
      status: 'Hoàn thành',
      statusClass: 'status-confirmed',
      notes: 'Tham gia thảo luận chủ đề áp lực đồng trang lứa và sự kỳ vọng gia đình.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1039',
      serviceName: 'Tư vấn giấc ngủ & thư giãn',
      serviceDuration: '45 phút',
      counselorName: 'TS. Nguyễn Minh Hà',
      counselorDegree: 'Tiến sĩ Tâm lý học',
      location: 'Google Meet',
      format: 'Online',
      dateTime: '22/05/2025 · 19:30 – 20:15',
      timeDisplay: '22/05 · 19:30',
      status: 'Hoàn thành',
      statusClass: 'status-confirmed',
      notes: 'Trao đổi về chứng khó ngủ trước kỳ thi giữa kỳ, cải thiện môi trường phòng trọ.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1038',
      serviceName: 'Tư vấn cá nhân 1-1',
      serviceDuration: '45 phút',
      counselorName: 'TS. Nguyễn Minh Hà',
      counselorDegree: 'Tiến sĩ Tâm lý học',
      location: 'Phòng H-204',
      format: 'Trực tiếp',
      dateTime: '08/05/2025 · 14:00 – 14:45',
      timeDisplay: '08/05 · 14:00',
      status: 'Hoàn thành',
      statusClass: 'status-confirmed',
      notes: 'Buổi khởi đầu đánh giá mức độ căng thẳng ban đầu (Stress score 3.6/5).',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1035',
      serviceName: 'Workshop Vượt qua trì hoãn',
      serviceDuration: '75 phút',
      counselorName: 'ThS. Phạm Thu Trang',
      counselorDegree: 'Thạc sĩ Giáo dục',
      location: 'Hội trường Nhà A',
      format: 'Trực tiếp',
      dateTime: '15/04/2025 · 09:30 – 10:45',
      timeDisplay: '15/04 · 09:30',
      status: 'Đã lưu trữ',
      statusClass: 'status-archived',
      notes: 'Đã lưu trữ vào lịch sử học kỳ 2 năm học 2024-2025.',
      cost: 'Miễn phí'
    },
    {
      id: 'APT-1031',
      serviceName: 'Tư vấn phương pháp học',
      serviceDuration: '30 phút',
      counselorName: 'ThS. Phạm Thu Trang',
      counselorDegree: 'Thạc sĩ Giáo dục',
      location: 'Phòng Tư vấn 2',
      format: 'Trực tiếp',
      dateTime: '02/04/2025 · 10:00 – 10:30',
      timeDisplay: '02/04 · 10:00',
      status: 'Đã lưu trữ',
      statusClass: 'status-archived',
      notes: 'Đã hoàn tất kế hoạch học kỳ.',
      cost: 'Miễn phí'
    }
  ],

  // Counselor Queue (Slide 9)
  counselorPendingQueue: [
    {
      id: 'req-01',
      studentName: 'Nguyễn Hải Nam',
      studentId: 'SV · K65',
      serviceName: 'Tư vấn cá nhân 1-1',
      slot: 'Thứ Ba · 08:30 (03/06)',
      submittedHoursAgo: '26 giờ trước (Quá hạn 24h)',
      urgent: true,
      topic: 'Áp lực học tập'
    },
    {
      id: 'req-02',
      studentName: 'Đặng Minh Quân',
      studentId: 'SV · K64',
      serviceName: 'Tư vấn cá nhân 1-1',
      slot: 'Thứ Hai · 13:30 (02/06)',
      submittedHoursAgo: '14 giờ trước',
      urgent: false,
      topic: 'Lo âu'
    },
    {
      id: 'req-03',
      studentName: 'Phan Bảo Ngọc',
      studentId: 'SV · K66',
      serviceName: 'Tư vấn cá nhân 1-1',
      slot: 'Thứ Tư · 15:00 (04/06)',
      submittedHoursAgo: '19 giờ trước',
      urgent: false,
      topic: 'Mối quan hệ'
    },
    {
      id: 'req-04',
      studentName: 'Vũ Đức Huy',
      studentId: 'SV · K65',
      serviceName: 'Tư vấn cá nhân 1-1',
      slot: 'Thứ Sáu · 09:15 (06/06)',
      submittedHoursAgo: '28 giờ trước (Quá hạn 24h)',
      urgent: true,
      topic: 'Áp lực học tập'
    },
    {
      id: 'req-05',
      studentName: 'Trần Quỳnh Nga',
      studentId: 'SV · K67',
      serviceName: 'Tư vấn cá nhân 1-1',
      slot: 'Thứ Sáu · 14:00 (06/06)',
      submittedHoursAgo: '6 giờ trước',
      urgent: false,
      topic: 'Định hướng'
    }
  ],

  // Slide 10: Session Note Data for APT-1042
  sessionNote: {
    appointmentId: 'APT-1042',
    studentName: 'Lê Ngọc An',
    dateTime: '05/06/2025 · 13:30 – 14:15',
    counselor: 'TS. Nguyễn Minh Hà',
    content: 'Sinh viên trình bày áp lực từ lịch thi cuối kỳ, khó tập trung khi học tại ký túc xá. Đã trao đổi về kỹ thuật chia khối thời gian 25/5 và xác định 2 khoảng giờ học hiệu quả nhất. Tinh thần cải thiện sau buổi, sẵn sàng thử kế hoạch trong 2 tuần tới.',
    charCount: 512,
    autoSavedTime: '14:22',
    improvementLevel: 'Tốt lên rõ rệt',
    nextActionFormat: 'Tái khám sau 2 tuần',
    actionTags: [
      'Gửi kế hoạch học tập mẫu',
      'Đặt lịch tái khám',
      'Giới thiệu workshop quản lý thời gian'
    ],
    aiSummaryDraft: {
      threeSentences: 'Sinh viên gặp áp lực do lịch thi cuối kỳ và môi trường học tập ồn ào. Buổi tập trung vào kỹ thuật chia khối thời gian và xác định khung giờ học tối ưu. Tinh thần cải thiện sau buổi, sinh viên đồng ý thử kế hoạch trong 2 tuần.',
      suggestedActions: [
        { id: 1, title: 'Gửi mẫu kế hoạch học tập', timing: 'Trong 24 giờ sau buổi' },
        { id: 2, title: 'Đặt lịch tái khám sau 2 tuần', timing: 'Ưu tiên khung giờ buổi chiều' },
        { id: 3, title: 'Giới thiệu workshop quản lý thời gian', timing: 'Đợt khai giảng 18/06' }
      ],
      confidence: 'Độ tin cậy: trung bình',
      confidenceLevel: 'medium'
    }
  },

  // Slide 11: Admin System Stats
  adminStats: {
    monthlyBookings: 284,
    monthlyTrend: '+12% so với tháng 5',
    activeAccounts: 1240,
    newUsers: '+86 người dùng mới',
    openServices: 12,
    pausedServices: 2,
    completionRate: '91%',
    cancelledCount: '17 lịch hẹn bị hủy',
    weeklyBookingTrend: [
      { week: 'T1', completed: 28, cancelled: 3 },
      { week: 'T2', completed: 32, cancelled: 4 },
      { week: 'T3', completed: 30, cancelled: 2 },
      { week: 'T4', completed: 35, cancelled: 3 },
      { week: 'T5', completed: 38, cancelled: 4 },
      { week: 'T6', completed: 42, cancelled: 2 },
      { week: 'T7', completed: 40, cancelled: 3 },
      { week: 'T8', completed: 46, cancelled: 2 }
    ],
    roleDistribution: {
      student: 68,
      guest: 19,
      counselor: 13
    },
    auditLogs: [
      { id: 'log-01', time: '14:22', type: 'Mới', message: 'Dịch vụ “Tư vấn học tập” được bật bởi admin@campusmind' },
      { id: 'log-02', time: '13:05', type: 'Phân quyền', message: 'Cấp quyền chuyên viên cho 2 tài khoản mới' },
      { id: 'log-03', time: '11:40', type: 'Cập nhật', message: 'TS. Nguyễn Minh Hà đã cập nhật lịch trống tuần 02-08/06' },
      { id: 'log-04', time: '09:15', type: 'Hệ thống', message: 'Sao lưu dữ liệu hệ thống tự động thành công (snapshot-20250603.enc)' },
      { id: 'log-05', time: '08:30', type: 'Thông báo', message: 'Gửi email nhắc nhở 14 lịch hẹn trong ngày cho sinh viên' }
    ]
  }
};

