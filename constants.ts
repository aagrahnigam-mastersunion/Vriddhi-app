import { Tab, Video, Quiz, Reward, LeaderboardEntry } from './types';
import { HomeIcon, BookOpenIcon, TrophyIcon, ChartBarIcon, GiftIcon } from './components/icons/Icons';
import { INDIA_STATES_DISTRICTS } from './data/locations';

export const TABS = [
  { id: Tab.Home, name: 'गृह', icon: HomeIcon },
  { id: Tab.Library, name: 'ज्ञान', icon: BookOpenIcon },
  { id: Tab.Quiz, name: 'खेल', icon: TrophyIcon },
  { id: Tab.Rank, name: 'लीडरबोर्ड', icon: ChartBarIcon },
  { id: Tab.Rewards, name: 'बाज़ार', icon: GiftIcon },
];

export const MOCK_VIDEOS: Video[] = [
  // Sarkari Yojana (Govt Schemes)
  { id: 1, url: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_24fps.mp4', title: 'सुकन्या समृद्धि योजना क्या है?', description: 'अपनी बेटी के भविष्य के लिए बचत करें। जानें कैसे।', author: 'Finance Guru', topic: 'Sarkari Yojana' },
  { id: 3, url: 'https://videos.pexels.com/video-files/3129957/3129957-hd_1280_720_25fps.mp4', title: 'PM किसान सम्मान निधि', description: 'किसानों के लिए सरकार की सीधी मदद।', author: 'Sarkari Gyan', topic: 'Sarkari Yojana' },
  { id: 6, url: 'https://videos.pexels.com/video-files/853878/853878-hd_1080_1920_25fps.mp4', title: 'अटल पेंशन योजना', description: '60 साल के बाद निश्चित पेंशन पाएं।', author: 'Sarkari Gyan', topic: 'Sarkari Yojana' },
  { id: 7, url: 'https://videos.pexels.com/video-files/8254394/8254394-hd_1080_1920_25fps.mp4', title: 'प्रधानमंत्री फसल बीमा योजना', description: 'फसल खराब होने पर पाएं आर्थिक मदद।', author: 'Kisan Mitra', topic: 'Sarkari Yojana' },
  { id: 8, url: 'https://videos.pexels.com/video-files/4835624/4835624-hd_1080_1920_25fps.mp4', title: 'जन धन योजना के फायदे', description: 'जीरो बैलेंस पर खोलें अपना बैंक खाता।', author: 'Banking Dost', topic: 'Sarkari Yojana' },
  { id: 9, url: 'https://videos.pexels.com/video-files/5676575/5676575-hd_1280_720_25fps.mp4', title: 'MUDRA लोन कैसे मिलेगा?', description: 'छोटे व्यापार के लिए सरकारी लोन।', author: 'Vyapar Guide', topic: 'Loan' },
  { id: 10, url: 'https://videos.pexels.com/video-files/8410549/8410549-hd_1080_1920_25fps.mp4', title: 'मनरेगा (MGNREGA) योजना', description: 'गांव में 100 दिन के रोजगार की गारंटी।', author: 'Gram Vikas', topic: 'Sarkari Yojana' },
  { id: 11, url: 'https://videos.pexels.com/video-files/5409019/5409019-hd_1080_1920_25fps.mp4', title: 'प्रधानमंत्री आवास योजना', description: 'अपना पक्का घर बनाने के लिए सरकारी मदद।', author: 'Sarkari Gyan', topic: 'Sarkari Yojana' },
  { id: 12, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'उज्ज्वला योजना - मुफ्त गैस कनेक्शन', description: 'रसोई के धुएं से पाएं आजादी।', author: 'Gram Vikas', topic: 'Sarkari Yojana' },
  { id: 13, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'आयुष्मान भारत योजना', description: '5 लाख तक का मुफ्त इलाज पाएं।', author: 'Swasthya Guide', topic: 'Sarkari Yojana' },
  { id: 14, url: 'https://videos.pexels.com/video-files/8254394/8254394-hd_1080_1920_25fps.mp4', title: 'किसान क्रेडिट कार्ड (KCC)', description: 'खेती के लिए सस्ता लोन पाएं।', author: 'Kisan Mitra', topic: 'Loan' },

  // Nivesh (Investing)
  { id: 2, url: 'https://videos.pexels.com/video-files/7578553/7578553-hd_1080_1920_25fps.mp4', title: 'SIP में निवेश कैसे करें?', description: 'छोटे निवेश से बड़ी बचत का राज़।', author: 'Investment Dost', topic: 'Nivesh' },
  { id: 15, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'म्यूच्यूअल फण्ड क्या है?', description: 'समझें म्यूच्यूअल फण्ड की मूल बातें।', author: 'Investment Dost', topic: 'Nivesh' },
  { id: 16, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'FD (फिक्स्ड डिपाजिट) के फायदे', description: 'बैंक में सुरक्षित निवेश का एक तरीका।', author: 'Banking Dost', topic: 'Nivesh' },
  { id: 17, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'PPF (पब्लिक प्रोविडेंट फण्ड)', description: 'लंबी अवधि के लिए टैक्स बचाने वाला निवेश।', author: 'Investment Dost', topic: 'Nivesh' },
  { id: 18, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'FD vs Mutual Fund vs PPF', description: 'आपके लिए कौन सा निवेश बेहतर है?', author: 'Finance Guru', topic: 'Nivesh' },

  // Loan (Loans)
  { id: 19, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'साहूकारों के जाल से कैसे बचें?', description: 'ऊंचे ब्याज वाले कर्ज़ से सावधान रहें।', author: 'Jagruk Nagrik', topic: 'Loan' },
  { id: 20, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'MSME लोन क्या होता है?', description: 'अपने लघु उद्योग को बड़ा बनाएं।', author: 'Vyapar Guide', topic: 'Loan' },
  
  // Sahkari Samiti (Co-operatives)
  { id: 21, url: 'https://videos.pexels.com/video-files/7556059/7556059-hd_1080_1920_25fps.mp4', title: 'सहकारी समिति (Co-operative) क्या है?', description: 'मिलकर काम करने की ताकत को समझें।', author: 'Gram Vikas', topic: 'Sahkari Samiti' },
  { id: 22, url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', title: 'सहकारी समिति से लोन लेने के फायदे', description: 'कम ब्याज पर आसानी से मिलता है लोन।', author: 'Gram Vikas', topic: 'Sahkari Samiti' },

  // Digital Payments
  { id: 4, url: 'https://videos.pexels.com/video-files/8061320/8061320-hd_1280_720_30fps.mp4', title: 'UPI का सही इस्तेमाल', description: 'डिजिटल पेमेंट करते समय सुरक्षित रहें।', author: 'Digital India', topic: 'Digital Payments' },
  
  // Beema (Insurance)
  { id: 5, url: 'https://videos.pexels.com/video-files/4793444/4793444-hd_1080_1920_30fps.mp4', title: 'जीवन बीमा क्यों जरूरी है?', description: 'अपने परिवार को सुरक्षित करें।', author: 'Beema Expert', topic: 'Beema' },
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 1,
    title: 'सरकारी योजनाएं - भाग 1',
    topic: 'Sarkari Yojana',
    questions: [
      { id: 1, text: 'सुकन्या समृद्धि योजना किसके लिए है?', options: ['लड़कों', 'लड़कियों', 'वरिष्ठ नागरिकों', 'किसानों'], correctAnswerIndex: 1 },
      { id: 2, text: 'PM किसान योजना में सालाना कितनी राशि मिलती है?', options: ['₹2000', '₹4000', '₹6000', '₹8000'], correctAnswerIndex: 2 },
      { id: 3, text: 'अटल पेंशन योजना एक ___ योजना है।', options: ['स्वास्थ्य', 'पेंशन', 'शिक्षा', 'बीमा'], correctAnswerIndex: 1 },
    ],
  },
  {
    id: 2,
    title: 'निवेश की पहली सीढ़ी',
    topic: 'Nivesh',
    questions: [
      { id: 1, text: 'SIP का पूरा नाम क्या है?', options: ['सिस्टमेटिक इन्वेस्टमेंट प्लान', 'सेफ इन्वेस्टमेंट प्लान', 'स्मॉल इन्वेस्टमेंट प्लान', 'सुपर इन्वेस्टमेंट प्लान'], correctAnswerIndex: 0 },
      { id: 2, text: 'FD (फिक्स्ड डिपॉजिट) कहाँ खुलवा सकते हैं?', options: ['सिर्फ पोस्ट ऑफिस', 'सिर्फ बैंक', 'बैंक और पोस्ट ऑफिस', 'कहीं नहीं'], correctAnswerIndex: 2 },
    ],
  },
  {
    id: 3,
    title: 'सरकारी योजनाएं - विस्तृत ज्ञान',
    topic: 'Sarkari Yojana',
    questions: [
        { id: 1, text: 'आयुष्मान भारत योजना के तहत कितने रुपये तक का मुफ्त इलाज मिलता है?', options: ['1 लाख', '2 लाख', '5 लाख', '10 लाख'], correctAnswerIndex: 2 },
        { id: 2, text: 'उज्ज्वला योजना का मुख्य उद्देश्य क्या है?', options: ['मुफ्त शिक्षा देना', 'मुफ्त गैस कनेक्शन देना', 'मुफ्त घर देना', 'मुफ्त राशन देना'], correctAnswerIndex: 1 },
        { id: 3, text: 'मनरेगा (MGNREGA) में एक साल में कितने दिनों के रोजगार की गारंटी है?', options: ['50 दिन', '100 दिन', '150 दिन', '200 दिन'], correctAnswerIndex: 1 },
        { id: 4, text: 'प्रधानमंत्री आवास योजना किससे संबंधित है?', options: ['किसानों को लोन', 'बच्चों की पढ़ाई', 'सबके लिए घर', 'स्वास्थ्य बीमा'], correctAnswerIndex: 2 },
        { id: 5, text: 'MUDRA लोन योजना मुख्य रूप से किसे लक्षित करती है?', options: ['बड़े उद्योगपतियों', 'सरकारी कर्मचारियों', 'छोटे व्यापारियों', 'किसानों'], correctAnswerIndex: 2 },
        { id: 6, text: 'जन धन योजना के तहत खोले गए खाते में न्यूनतम बैलेंस कितना रखना अनिवार्य है?', options: ['₹100', '₹500', '₹1000', 'कोई न्यूनतम बैलेंस नहीं'], correctAnswerIndex: 3 },
        { id: 7, text: 'प्रधानमंत्री फसल बीमा योजना में बीमा कौन करवा सकता है?', options: ['केवल जमींदार', 'केवल किराये पर खेती करने वाले', 'सभी किसान', 'केवल बड़े किसान'], correctAnswerIndex: 2 },
        { id: 8, text: 'अटल पेंशन योजना में पेंशन कब से मिलना शुरू होती है?', options: ['50 साल की उम्र से', '55 साल की उम्र से', '60 साल की उम्र से', '65 साल की उम्र से'], correctAnswerIndex: 2 },
        { id: 9, text: 'किसान क्रेडिट कार्ड (KCC) का मुख्य लाभ क्या है?', options: ['मुफ्त बीज', 'खेती के लिए सस्ता लोन', 'मुफ्त ट्रैक्टर', 'जमीन का बीमा'], correctAnswerIndex: 1 },
        { id: 10, text: 'सुकन्या समृद्धि योजना में खाता खोलने के लिए लड़की की अधिकतम आयु क्या होनी चाहिए?', options: ['5 साल', '10 साल', '15 साल', '18 साल'], correctAnswerIndex: 1 },
    ]
  },
  {
      id: 4,
      title: 'बचत, निवेश और लोन',
      topic: 'Finance',
      questions: [
          { id: 1, text: 'इनमें से कौन सा निवेश बाजार के जोखिमों के अधीन है?', options: ['FD (फिक्स्ड डिपाजिट)', 'PPF (पब्लिक प्रोविडेंट फण्ड)', 'म्यूच्यूअल फण्ड', 'बैंक बचत खाता'], correctAnswerIndex: 2 },
          { id: 2, text: 'किससे लोन लेना सबसे खतरनाक हो सकता है?', options: ['सरकारी बैंक', 'सहकारी समिति', 'गांव का साहूकार', 'पोस्ट ऑफिस'], correctAnswerIndex: 2 },
          { id: 3, text: 'MSME का मतलब क्या है?', options: ['बड़ा उद्योग', 'विदेशी कंपनी', 'सूक्ष्म, लघु और मध्यम उद्योग', 'खेती की दुकान'], correctAnswerIndex: 2 },
          { id: 4, text: 'लंबी अवधि और टैक्स बचाने के लिए कौन सा विकल्प अच्छा माना जाता है?', options: ['FD', 'PPF', 'बचत खाता', 'कैश रखना'], correctAnswerIndex: 1 },
          { id: 5, text: 'सहकारी समिति (Co-operative) का मुख्य सिद्धांत क्या है?', options: ['केवल मुनाफा कमाना', 'एक व्यक्ति का शासन', 'सदस्यों का सहयोग और कल्याण', 'सरकार के लिए काम करना'], correctAnswerIndex: 2 },
      ]
  }
];

export const MOCK_REWARDS: Reward[] = [
  { id: 1, name: '₹30 मोबाइल रिचार्ज', description: 'अपने किसी भी नंबर पर ₹30 का रिचार्ज पाएं।', sikkaCost: 1000, iapCost: 10, value: 30, imageUrl: 'https://picsum.photos/id/11/200/200' },
  { id: 2, name: '₹50 UPI कैशबैक', description: 'सीधे अपने बैंक खाते में ₹50 का कैशबैक।', sikkaCost: 2000, iapCost: 25, value: 50, imageUrl: 'https://picsum.photos/id/12/200/200' },
  { id: 3, name: 'खाद पर ₹100 की छूट', description: 'सहभागी दुकानों पर खाद की खरीद पर छूट पाएं।', sikkaCost: 3000, iapCost: 50, value: 100, imageUrl: 'https://picsum.photos/id/13/200/200' },
  { id: 4, name: 'बीज पैकेट पर 20% की छूट', description: 'अपने पसंदीदा बीज पैकेट पर 20% की छूट।', sikkaCost: 500, iapCost: 5, value: 20, imageUrl: 'https://picsum.photos/id/14/200/200' },
];

// A mock database of users to make the leaderboard dynamic
type MockUser = Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>;

const generateAllUsers = (): MockUser[] => {
    const users: MockUser[] = [];
    const names = [
        'रमेश', 'सुरेश', 'गीता', 'मीना', 'अमित', 'सुनीता', 'राजेश', 'कविता',
        'दीपक', 'पूजा', 'अनिल', 'विमला', 'मनोज', 'सोनिया', 'संजय', 'आशा',
        'विजय', 'उषा', 'राहुल', 'प्रीति', 'मुकेश', 'रीना', 'आलोक', 'ज्योति',
        'नरेश', 'सीमा', 'पवन', 'किरण', 'अजय', 'नीलम', 'विकास', 'सरिता'
    ];

    for (const state in INDIA_STATES_DISTRICTS) {
        if (Object.prototype.hasOwnProperty.call(INDIA_STATES_DISTRICTS, state)) {
            const districts = INDIA_STATES_DISTRICTS[state as keyof typeof INDIA_STATES_DISTRICTS];
            for (const district of districts) {
                // Generate a random number of users for each district (e.g., 5 to 15)
                const userCount = Math.floor(Math.random() * 11) + 5;
                for (let i = 0; i < userCount; i++) {
                    const name = names[Math.floor(Math.random() * names.length)];
                    const sikka = Math.floor(Math.random() * 25000) + 500; // Random sikka between 500 and 25500
                    users.push({ name, district, state, sikka });
                }
            }
        }
    }
    return users;
};


export const MOCK_ALL_USERS: MockUser[] = generateAllUsers();
