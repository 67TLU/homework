/**
 * CampusMind AI Engine
 * Implements 3 Explainable AI Experiences (AI-1, AI-2, AI-3)
 * Adheres to ethical principles: Triage without medical diagnosis, human-in-the-loop
 */

const CampusAI = {
  // AI-1: Support Navigator (Triage & Direction)
  supportNavigator: {
    questions: [
      {
        id: 'q1',
        title: 'Chủ đề bạn đang cảm thấy bận tâm hoặc quá tải nhất gần đây?',
        options: [
          { label: 'Áp lực thi cử, bài tập & đồ án học tập', value: 'study_stress' },
          { label: 'Cảm giác lo âu bồn chồn, khó gọi tên', value: 'anxiety' },
          { label: 'Mất ngủ, khó ngủ hoặc kiệt sức thể chất', value: 'sleep' },
          { label: 'Bất đồng bạn bè, bạn cùng phòng hoặc gia đình', value: 'relationships' }
        ]
      },
      {
        id: 'q2',
        title: 'Tình trạng này đang ảnh hưởng tới nhịp sinh hoạt của bạn như thế nào?',
        options: [
          { label: 'Chỉ thoáng qua lúc deadline dồn dập', value: 'mild' },
          { label: 'Giảm khả năng tập trung, hay trì hoãn', value: 'moderate' },
          { label: 'Thường xuyên mệt mỏi, khó duy trì lịch học bình thường', value: 'high' }
        ]
      },
      {
        id: 'q3',
        title: 'Bạn thoải mái nhất với hình thức chia sẻ nào?',
        options: [
          { label: 'Trò chuyện 1-1 riêng tư với chuyên viên tâm lý', value: 'individual' },
          { label: 'Tham gia buổi workshop kỹ năng cùng các bạn sinh viên khác', value: 'workshop' },
          { label: 'Tự tìm hiểu bài viết / audio hướng dẫn theo nhịp riêng', value: 'self_help' }
        ]
      },
      {
        id: 'q4',
        title: 'Khoảng thời gian bạn có thể sắp xếp trong tuần?',
        options: [
          { label: '30 – 45 phút cho một buổi hẹn tư vấn trực tiếp', value: '45min' },
          { label: '90 phút vào cuối tuần để học kỹ năng', value: '90min' },
          { label: '5 – 10 phút tự thực hành mỗi ngày', value: 'micro' }
        ]
      }
    ],

    evaluateAnswers(answers) {
      const q1 = answers.q1 || 'study_stress';
      const q3 = answers.q3 || 'individual';

      let recommendedServiceId = 'srv-01';
      let serviceTitle = 'Tư vấn cá nhân 1-1';
      let duration = '45 phút';
      let primaryTopic = 'áp lực học tập';
      let rationale = 'Câu trả lời của bạn cho thấy chủ đề “áp lực học tập” đang chiếm ưu thế. Gợi ý: bắt đầu bằng buổi Tư vấn cá nhân 1-1 (45 phút) trước khi tham gia workshop.';

      if (q1 === 'anxiety' || q3 === 'workshop') {
        recommendedServiceId = 'srv-02';
        serviceTitle = 'Workshop quản trị cảm xúc';
        duration = '90 phút';
        primaryTopic = 'quản trị cảm xúc';
        rationale = 'Bạn đang cần kỹ thuật điều hòa cảm xúc và sẵn sàng học hỏi theo nhóm. Gợi ý: Workshop quản trị cảm xúc (90 phút) giúp thực hành cùng chuyên gia và bạn bè.';
      } else if (q3 === 'self_help' || q1 === 'sleep') {
        recommendedServiceId = 'srv-03';
        serviceTitle = 'Chuỗi bài tập thư giãn & Vệ sinh giấc ngủ';
        duration = '12 bài · 40 phút';
        primaryTopic = 'giấc ngủ & thư giãn';
        rationale = 'Với mong muốn chủ động về thời gian và cải thiện thể chất, chuỗi bài tập tự hướng dẫn sẽ là bước khởi đầu nhẹ nhàng và không gây áp lực.';
      }

      return {
        serviceId: recommendedServiceId,
        serviceTitle: serviceTitle,
        duration: duration,
        primaryTopic: primaryTopic,
        confidence: 'Phù hợp cao',
        rationale: rationale,
        disclaimer: 'Lưu ý: Hệ thống chỉ hỗ trợ điều hướng và phân loại nhu cầu học đường, tuyệt đối không đưa ra chẩn đoán y khoa.'
      };
    }
  },

  // AI-2: Resource Recommender (Self-help with transparent reasoning)
  resourceRecommender: {
    recommendations: [
      {
        id: 'rec-1',
        title: '“Kỹ thuật 5-4-3-2-1 khi cơn lo âu ập tới”',
        resourceId: 'res-ai-highlight',
        reason: 'Dựa trên 2 tài nguyên bạn đã lưu về chủ đề lo âu, thời lượng bạn thường xem (5–8 phút) và mục tiêu “quản lý căng thẳng” trong hồ sơ của bạn.',
        confidence: 'Độ tin cậy: cao',
        badge: 'Phù hợp 94%'
      },
      {
        id: 'rec-2',
        title: '“Kỹ thuật thở 4-7-8 làm dịu hệ thần kinh”',
        resourceId: 'res-04',
        reason: 'Gợi ý phù hợp trước buổi hẹn tư vấn cá nhân: giúp bạn ổn định nhịp thở và lấy lại sự tập trung chỉ sau 3 phút thực hành.',
        confidence: 'Độ tin cậy: rất cao',
        badge: 'Khuyên dùng trước buổi hẹn'
      },
      {
        id: 'rec-3',
        title: '“Kế hoạch học tập không kiệt sức”',
        resourceId: 'res-02',
        reason: 'Bạn đã xem các nội dung về trì hoãn và có lịch thi trong 2 tuần tới. Video này giải quyết cách chia nhỏ bài tập theo năng lượng.',
        confidence: 'Độ tin cậy: cao',
        badge: 'Mùa thi cử'
      }
    ],

    getNextRecommendation(currentIndex = 0) {
      const nextIdx = (currentIndex + 1) % this.recommendations.length;
      return { item: this.recommendations[nextIdx], nextIndex: nextIdx };
    }
  },

  // AI-3: Counselor Summary Assistant (Human-in-the-loop summarization)
  counselorAssistant: {
    generateSummary(notesText) {
      if (!notesText || notesText.trim().length < 40) {
        return {
          error: true,
          message: 'Không thể xử lý yêu cầu lúc này. Nội dung ghi chú quá ngắn (dưới 40 ký tự) để tạo bản tóm tắt đáng tin cậy.',
          status: 'insufficient_data'
        };
      }

      // Contextual extraction simulation
      const sentences = notesText.split('.').filter(s => s.trim().length > 0);
      let sentence1 = 'Sinh viên gặp áp lực do lịch thi cuối kỳ và môi trường học tập ồn ào.';
      let sentence2 = 'Buổi tập trung vào kỹ thuật chia khối thời gian 25/5 và xác định khung giờ học tối ưu.';
      let sentence3 = 'Tinh thần cải thiện sau buổi, sinh viên đồng ý thử nghiệm kế hoạch hành động trong 2 tuần.';

      if (sentences.length >= 3) {
        sentence1 = sentences[0].trim() + '.';
        sentence2 = sentences[1].trim() + '.';
        sentence3 = sentences[2].trim() + '.';
      }

      return {
        error: false,
        threeSentences: `${sentence1} ${sentence2} ${sentence3}`,
        suggestedActions: [
          { id: 1, title: 'Gửi mẫu kế hoạch học tập', timing: 'Trong 24 giờ sau buổi' },
          { id: 2, title: 'Đặt lịch tái khám sau 2 tuần', timing: 'Ưu tiên khung giờ buổi chiều' },
          { id: 3, title: 'Giới thiệu workshop quản lý thời gian', timing: 'Đợt khai giảng 18/06' }
        ],
        confidence: 'Độ tin cậy: trung bình',
        humanInTheLoopRule: 'Chuyên viên luôn là người phê duyệt cuối cùng trước khi lưu vào hồ sơ bảo mật.'
      };
    }
  }
};

