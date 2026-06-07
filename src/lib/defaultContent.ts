import type { SiteContent } from '@/types/content'

export const DEFAULT_EN: SiteContent = {
  site: { name:"Taiwan Preschool Exchange", tagline:"短期幼稚園交流", email:"contact@preschoolexchange.org", domain:"www.preschoolexchange.org", logo:"/assets/logo.png", heroBgOpacity:0.10 },
  nav: {
    links:[{label:"Programs",page:"programs"},{label:"Why Taiwan",page:"why-taiwan"},{label:"How It Works",page:"how-it-works"},{label:"About",page:"about"},{label:"Blog",page:"blog"},{label:"FAQ",page:"faq"},{label:"Contact",page:"contact"}],
    cta:{label:"Apply Now",page:"programs"}
  },
  home: {
    heroImg:"https://scontent.fkul22-3.fna.fbcdn.net/v/t39.30808-6/486876075_1162734638974918_5635250187506127984_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YD_tv2UI3QIQ7kNvwF0mAD_&_nc_oc=AdoCUom_oLTUCgTMXNVhnILHqUxiwCnq6REvxpuQqkjT2EI9OvTnRLHrqFqOa32qB57aCvfRC9qIi6sdx1ecR42J&_nc_zt=23&_nc_ht=scontent.fkul22-3.fna&_nc_gid=PzB8JWnD37z0fulp1SPh9w&_nc_ss=7b289&oh=00_Af_Shi2kXPQ7Yr48AFz5NLZsdNIrDDgWfsi83-RqVO9n8w&oe=6A29C466",
    heroImgOpacity:0.95, heroImgMobile:true, heroImgMobileOpacity:0.28, heroImgFade:72,
    badge:"Trusted by international families from 12+ countries",
    headline:"Global Childhood.\nLocal Experience.",
    sub:"Short-term preschool experiences in Taiwan, where families experience one of the world's safest and most child-friendly destinations while children connect with local life, nature, language, and new friendships.",
    cta1:"Explore Programs", cta2:"How It Works",
    trust:["Ministry-licensed and vetted schools only","Nature-rich school days","Nurturing local educators","10+ years global families experience"],
    stats:[{num:"4th",label:"Safest country in Asia\n(Numbeo 2025)"},{num:"6",label:"Partner preschools\nacross Taiwan"},{num:"1–12",label:"Weeks, flexible\nprogram duration"},{num:"2–7",label:"Years old,\nchildren welcome"}],
    featuredTitle:"Featured Programs", featuredSub:"Handpicked preschools across Taiwan, each uniquely vetted for international families",
    howTitle:"How It Works", howSub:"From first inquiry to welcome in Taiwan — we guide every family",
    steps:[{title:"Discover & Browse",text:"Explore programs by city, child age, and learning philosophy."},{title:"Book a Consultation",text:"30-minute call with our bilingual team to find your perfect match."},{title:"Apply & Confirm",text:"Complete your application and secure your program with a deposit."},{title:"Arrive & Experience",text:"We handle the details — you arrive supported at every step."}],
    ctaTitle:"Every family is different.\nTell us about yours.", ctaSub:"We'll find the right preschool match for your child.",
    ctaBtn:"Start Your Journey", ctaBtn2:"Browse All Programs"
  },
  programs: {
    title:"Find Your Program",
    sub:"Browse vetted preschool exchange programs across Taiwan — filtered to fit your family.",
    schools:[
      {id:"taipei-bilingual",name:"Taipei Bilingual Preschool",city:"Taipei",area:"Da'an District",ageRange:"3–6 years",languages:"English · Mandarin",durations:"1 – 4 weeks",priceFrom:"2,200",features:["English Support","City Centre","School Bus"],photo:"/assets/schools/taipei-bilingual.png",badge:"Most Popular",desc:"A nurturing bilingual environment in the heart of Taipei. Combines English and Mandarin learning through play-based curriculum with experienced international educators.",schedule:[{t:"8:30am",a:"Morning greeting & free play"},{t:"9:15am",a:"Circle time & Mandarin learning"},{t:"10:00am",a:"English story & language activity"},{t:"11:00am",a:"Art & creative exploration"},{t:"12:00pm",a:"Lunch (included)"},{t:"1:00pm",a:"Nap / quiet rest"},{t:"2:30pm",a:"Outdoor play & physical activity"},{t:"4:00pm",a:"Afternoon snack & pick-up"}],includes:[{item:"School tuition",inc:true},{item:"Daily lunch & snacks",inc:true},{item:"Bilingual support staff",inc:true},{item:"Weekly parent update report",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]},
      {id:"taichung-forest",name:"Taichung Forest School",city:"Taichung",area:"Nantun District",ageRange:"2–5 years",languages:"Mandarin · English",durations:"2 – 8 weeks",priceFrom:"1,950",features:["Nature-Based","Outdoor Learning","Forest Campus"],photo:"/assets/schools/taichung-forest.png",badge:"Nature Pick",desc:"Immersive nature-based learning in Taichung's lush setting. Children explore Taiwan's natural environment through hands-on outdoor activities every single day.",schedule:[{t:"8:00am",a:"Morning gathering in the garden"},{t:"8:45am",a:"Nature walk & outdoor exploration"},{t:"10:00am",a:"Project-based learning activity"},{t:"11:30am",a:"Farm-to-table cooking"},{t:"12:00pm",a:"Organic lunch (included)"},{t:"1:00pm",a:"Rest time"},{t:"2:30pm",a:"Creative forest play"},{t:"4:00pm",a:"Reflection circle & pick-up"}],includes:[{item:"School tuition",inc:true},{item:"Organic lunch & snacks",inc:true},{item:"Nature materials & supplies",inc:true},{item:"Weekly family newsletter",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]},
      {id:"taoyuan-kindergarten",name:"Taoyuan International Kindergarten",city:"Taoyuan",area:"Near Airport",ageRange:"2–6 years",languages:"English · Mandarin",durations:"1 – 4 weeks",priceFrom:"1,800",features:["Near Airport","English Support","Mixed-Age"],photo:"/assets/schools/taoyuan-kindergarten.png",badge:"Easy Arrival",desc:"Conveniently located near Taoyuan International Airport, this warm kindergarten offers seamless arrival and a strong English-supported curriculum.",schedule:[{t:"8:30am",a:"Morning welcome & free choice"},{t:"9:00am",a:"English morning meeting"},{t:"10:00am",a:"Themed learning activity"},{t:"11:00am",a:"Outdoor playground"},{t:"12:00pm",a:"Lunch (included)"},{t:"1:00pm",a:"Quiet time"},{t:"2:30pm",a:"Arts & music"},{t:"4:00pm",a:"Goodbye circle & pick-up"}],includes:[{item:"School tuition",inc:true},{item:"Daily lunch",inc:true},{item:"English-speaking coordinator",inc:true},{item:"Parent orientation session",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]},
      {id:"tainan-waldorf",name:"Tainan Waldorf School",city:"Tainan",area:"Anping District",ageRange:"3–6 years",languages:"Mandarin · Minimal English",durations:"2 – 12 weeks",priceFrom:"1,700",features:["Waldorf Method","Cultural Immersion","Long-Stay"],photo:"/assets/schools/tainan-waldorf.png",badge:"Cultural Deep-Dive",desc:"An authentic Waldorf experience in Taiwan's most culturally rich city. Ideal for families seeking genuine immersion in Taiwanese daily life and education.",schedule:[{t:"8:30am",a:"Rhythmic opening & beeswax modelling"},{t:"9:30am",a:"Seasonal nature activity"},{t:"10:30am",a:"Free creative play"},{t:"11:30am",a:"Cooking & traditional crafts"},{t:"12:00pm",a:"Shared lunch (included)"},{t:"1:00pm",a:"Story & nap"},{t:"2:30pm",a:"Garden & outdoor time"},{t:"4:00pm",a:"Closing song & pick-up"}],includes:[{item:"School tuition",inc:true},{item:"Daily lunch",inc:true},{item:"Waldorf materials",inc:true},{item:"Cultural activity calendar",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]},
      {id:"hualien-montessori",name:"Hualien Montessori House",city:"Hualien",area:"East Coast",ageRange:"2–6 years",languages:"Mandarin · Basic English",durations:"2 – 6 weeks",priceFrom:"1,600",features:["Montessori Method","East Coast","Nature Views"],photo:"/assets/schools/hualien-montessori.png",badge:"Most Scenic",desc:"Nestled near the stunning East Coast, this Montessori school pairs child-led learning with Taiwan's most breathtaking natural landscapes and indigenous culture.",schedule:[{t:"8:00am",a:"Morning Montessori work cycle"},{t:"10:00am",a:"Outdoor nature observation"},{t:"11:00am",a:"Practical life activities"},{t:"12:00pm",a:"Lunch (included)"},{t:"1:00pm",a:"Rest & quiet reading"},{t:"2:30pm",a:"Sensory & movement play"},{t:"4:00pm",a:"Closing circle & pick-up"}],includes:[{item:"School tuition",inc:true},{item:"Daily lunch",inc:true},{item:"Montessori materials",inc:true},{item:"East Coast family excursion (1× per 2 wks)",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]},
      {id:"nantou-mountain",name:"Nantou Mountain Preschool",city:"Nantou",area:"Sun Moon Lake Area",ageRange:"3–6 years",languages:"Mandarin",durations:"4 – 12 weeks",priceFrom:"1,550",features:["Mountain Setting","Indigenous Culture","Long-Stay"],photo:"/assets/schools/nantou-mountain.png",badge:"Hidden Gem",desc:"High in Taiwan's mountain heartland near Sun Moon Lake, this preschool offers an extraordinary long-stay experience immersed in nature and indigenous Taiwanese culture.",schedule:[{t:"8:30am",a:"Mountain morning walk"},{t:"9:00am",a:"Indigenous language greeting"},{t:"9:30am",a:"Traditional story & craft"},{t:"11:00am",a:"Outdoor & garden project"},{t:"12:00pm",a:"Lunch (included)"},{t:"1:00pm",a:"Nap time"},{t:"2:30pm",a:"Nature exploration"},{t:"4:00pm",a:"Family closing circle"}],includes:[{item:"School tuition",inc:true},{item:"Daily lunch",inc:true},{item:"Cultural materials",inc:true},{item:"Monthly mountain excursion",inc:true},{item:"Airport transfer",inc:false},{item:"Accommodation",inc:false}]}
    ]
  },
  whyTaiwan: {
    title:"The World's Most Underrated\nFamily Destination",
    sub:"Few places combine safety, accessibility, nature, and child-friendly infrastructure as naturally as Taiwan.",
    cards:[
      {icon:"🛡️",stat:"#4 Safe",title:"Safe & Family-Friendly",body:"Taiwan ranks 4th globally for safety (Numbeo 2025, score 82.9) — higher than Singapore (#9) and Japan (#10). Crime rates are among the lowest globally, and families feel safe walking at night.",bullets:["300+ public parent-child centres","400+ museums across every district","Exceptionally safe for children"]},
      {icon:"🏥",stat:"< US$30",title:"Excellent & Affordable Healthcare",body:"Taiwan's National Health Insurance ranks among the world's best. Foreign visitors access care through affordable self-pay options — consultations often less than US$20–30.",bullets:["Pre-arrival healthcare briefing provided","Local clinic maps for every programme city","Clean, efficient hospitals everywhere"]},
      {icon:"🚄",stat:"13,000+",title:"World-Class Convenience",body:"Over 13,000 24-hour convenience stores — the second-highest density per capita globally. MRT, clean buses, and high-speed rail connect Taiwan comfortably.",bullets:["Google Maps works perfectly","English signage is widespread","Safe, affordable taxis everywhere"]},
      {icon:"🌿",stat:"60% Forested",title:"Nature at the Doorstep",body:"Taiwan is 60% forested. Mountains, oceans, and forests are reachable within an hour of any city. Over 30 national and forest parks offer safe family-friendly trails.",bullets:["Yangmingshan, Alishan, Taroko Gorge","Local farms for outdoor learning","A living classroom at every school"]},
      {icon:"🗣️",stat:"Bilingual",title:"Bilingual Learning Environment",body:"Many private preschools offer English-Mandarin integration. Taiwan is one of the last places where Traditional Chinese is standard — a rare cultural gift for children.",bullets:["English-Mandarin integration in schools","Authentic Traditional Chinese learning","Real language immersion, not tourist-facing"]},
      {icon:"🏮",stat:"Rich Culture",title:"Cultural Immersion for Children",body:"Children experience Taiwan's traditions through play — lantern festivals, night markets, dragon boat races. Taiwanese are known for warmth and patience with foreign children.",bullets:["Seasonal festivals and celebrations","Night markets and local food culture","Taiwan's famously child-loving culture"]}
    ],
    ctaTitle:"Taiwan is waiting.", ctaSub:"Your family just has to come.", ctaBtn:"Talk to Us"
  },
  howItWorks: {
    title:"Simple From Start to Finish",
    sub:"From your first question to a confident arrival in Taiwan — we guide every family, every step of the way.",
    steps:[
      {num:"01",title:"Discover & Browse",body:"Explore our partner preschools by city, child age, learning philosophy, and programme duration. Save favourites to your wishlist."},
      {num:"02",title:"Book a Free Consultation",body:"Schedule a 30-minute call with our bilingual team. We listen, ask the right questions, and help you find the school that fits your child best."},
      {num:"03",title:"Apply & Confirm",body:"Complete your application, upload required documents, and secure your spot with a deposit. We handle school communication on your behalf."},
      {num:"04",title:"Pre-Arrival Preparation",body:"Receive your personalised onboarding pack: Taiwan travel guide, packing checklist, SIM card advice, nearby clinics, and emergency contacts."},
      {num:"05",title:"Arrive in Taiwan",body:"Your family arrives to an optional airport transfer, school orientation, and local support — all arranged before you land."},
      {num:"06",title:"Experience & Stay Connected",body:"Children attend preschool, families explore Taiwan. We stay in touch throughout via WhatsApp with mid-programme check-ins."}
    ],
    ctaTitle:"Ready to take the first step?", ctaSub:"Book a free 30-minute consultation with our bilingual team.", ctaBtn:"Book a Free Consultation"
  },
  about: {
    title:"About Taiwan Preschool Exchange",
    sub:"We believe children grow best through experiences that nurture confidence, curiosity, and connection.",
    missionBg:"/assets/schools/taichung-forest.png",
    mission:"Taiwan Preschool Exchange connects international families with vetted, nature-based, nurturing Taiwanese preschools — creating meaningful short-term exchange experiences for children aged 2 to 7.",
    story:"Most families tell us they wish they'd done this sooner. We built Taiwan Preschool Exchange because we believe early childhood is the perfect time to experience the world — gently, safely, and meaningfully.",
    vettingTitle:"Our Vetting Process", vettingSub:"Every partner school passes 6 rigorous criteria before joining our network.",
    vetting:[
      {num:"1",title:"Ministry of Education Licence",text:"All partner schools hold valid MOE certification. No exceptions."},
      {num:"2",title:"Teacher Qualifications",text:"We review individual educator certifications and ongoing training records."},
      {num:"3",title:"International Family Experience",text:"Schools must demonstrate experience supporting non-Mandarin-speaking families."},
      {num:"4",title:"Communication Standards",text:"Daily parent updates, English-accessible staff, and clear communication protocols."},
      {num:"5",title:"Safety & Facilities",text:"Site visits confirm childproofed spaces, safe play areas, and CCTV monitoring."},
      {num:"6",title:"Philosophy Alignment",text:"Schools share our values of emotional wellbeing, curiosity, and child-led learning."}
    ],
    whyTitle:"Why Families Choose Us",
    why:[
      {icon:"✓",title:"Safety & Standards",text:"All schools licensed by Taiwan's Ministry of Education. We review qualifications and safety policies personally."},
      {icon:"✓",title:"Family Support",text:"Many partner schools have English-speaking staff. Daily updates, translation assistance, and parent communication throughout."},
      {icon:"✓",title:"Health & Nutrition",text:"Nutritious school lunches included. Schools accommodate allergies. Nearby clinics mapped in advance."},
      {icon:"✓",title:"Logistics & Convenience",text:"School locations in family-friendly districts. Accommodation arrangement included. Weekend family experiences."},
      {icon:"✓",title:"Our Promise",text:"Clear contracts, transparent fees, no hidden costs. Responsive bilingual support throughout your stay."}
    ],
    teamTitle:"The People Behind Every Family's Experience", teamVersion:2,
    team:[{name:"Chloe Choo",role:"Founder",initials:"CC",quote:"Education has always been the heart I hold on to, no matter where life takes me.",bio:"With over eight years leading international study tours and educational programmes across multiple countries, Chloe holds a Master's in Educational Leadership from the University of Nottingham, is certified in early childhood education, and is co-editor of Life Without Limits, a children's book about resilience."}]
  },
  faq: {
    title:"Frequently Asked Questions",
    sub:"Everything families ask before booking. Can't find your answer? Contact us directly.",
    items:[
      {q:"What age range is this suitable for?",a:"Our programmes welcome children aged 2 to 7 years old. Most partner schools have mixed-age or age-grouped classes designed to support this range. We'll help you identify the best fit during your consultation."},
      {q:"How long can we stay?",a:"Programme durations range from 1 week to 12 weeks depending on the school. Most families choose 2–4 weeks. Some schools offer extended programmes up to 12 weeks for families seeking a deeper immersion experience."},
      {q:"Do the schools speak English?",a:"English support varies by school — we clearly indicate the level on each programme listing (Fully English, Bilingual, or Mandarin-primary with basic English support). Our team also provides translation support throughout."},
      {q:"What is included in the programme fee?",a:"Fees typically include school tuition, daily lunch and snacks, learning materials, and weekly parent updates. Accommodation, airport transfers, and parent-child activities are available as optional add-ons. Full details are listed on each school page."},
      {q:"How does payment work?",a:"We accept overseas Visa, Mastercard, and JCB credit cards, as well as Apple Pay, Google Pay, and PayPal. You can pay a deposit upfront and the balance closer to departure, or pay in full. All fees are displayed in USD."},
      {q:"Is Taiwan safe for families?",a:"Extremely. Taiwan ranks 4th globally in the 2025 Numbeo Safety Index — higher than Singapore and Japan. We provide every family with a pre-arrival safety briefing, local clinic maps, and emergency contacts before departure."},
      {q:"Can we book accommodation through you?",a:"Yes. We offer accommodation bundles as an optional add-on for all programmes. We work with family-friendly hotels and serviced apartments near each partner school. You're also welcome to arrange your own accommodation."},
      {q:"What happens if we need to cancel?",a:"Our cancellation policy allows full refunds on deposits up to 60 days before the programme start date, with partial refunds up to 30 days before. Full details are in our Cancellation Policy, available before you apply."},
      {q:"Do we need a visa to enter Taiwan?",a:"Most nationalities enjoy visa-free entry to Taiwan for stays up to 90 days. We include a visa information guide in your onboarding pack and can provide a support document if required by your home country's embassy."},
      {q:"Can we visit the school before committing?",a:"Yes. We arrange virtual school tours and introduce you to the school coordinator during your consultation. Families already in Taiwan are welcome to request an in-person visit."}
    ]
  },
  contact: { title:"Get in Touch", sub:"Have a question or ready to start? We'd love to hear from you.", email:"contact@preschoolexchange.org", whatsapp:"Message us on WhatsApp", line:"LINE: @twpreschoolexchange", response:"We typically respond within 24 hours on weekdays.", formTitle:"Send us a message" },
  partner: {
    title:"Become a Partner School",
    sub:"Open your doors to international families seeking meaningful short-term preschool exchange experiences.",
    benefits:[
      {icon:"🌍",title:"Welcome Global Families",text:"Open your school to international parents and children from Hong Kong, Singapore, Malaysia, Japan, Korea, and beyond."},
      {icon:"🏆",title:"Strengthen Your International Presence",text:"Showcase your preschool's values on a global stage. Become part of a trusted network of vetted Taiwanese schools."},
      {icon:"🎨",title:"Enrich Your Classrooms",text:"Create a more culturally diverse learning environment where local children interact with peers from abroad."},
      {icon:"🤝",title:"Marketing & Support Included",text:"We handle international marketing, parent communication, and provide practical tools for smooth daily operations."}
    ],
    processTitle:"How to Get Started",
    processSteps:["Submit an expression of interest at contact@preschoolexchange.org","Our team arranges an initial call to understand your school and philosophy","We conduct a site visit and documentation review","If approved, we onboard your school and list your programme","International families start discovering and booking your school"],
    ctaTitle:"Interested in partnering with us?", ctaSub:"Send us your school name, contact person, and a brief description of your programme.", ctaEmail:"contact@preschoolexchange.org", ctaBtn:"Email Us to Express Interest"
  },
  blog: {
    title:"Guides & Stories",
    sub:"Practical guides, family stories, and insider knowledge for families considering Taiwan.",
    posts:[
      {tag:"Family Guide",title:"What to Pack for a 4-Week Preschool Exchange in Taiwan",excerpt:"From rain gear to comfort items — our practical guide for families doing their first extended stay in Taiwan with a toddler.",date:"May 2026",img:"/assets/schools/taipei-bilingual.png"},
      {tag:"School Spotlight",title:"Inside Taichung Forest School: A Week in the Life",excerpt:"We spent a week documenting daily life at our forest school partner in Taichung. Here's what a typical week looks like for a 4-year-old.",date:"April 2026",img:"/assets/schools/taichung-forest.png"},
      {tag:"Taiwan Travel",title:"The Best Family Weekend Trips from Taipei",excerpt:"Between school days, families explore. These are the best day trips and weekend escapes within two hours of Taipei — all child-friendly.",date:"March 2026",img:"/assets/schools/taoyuan-kindergarten.png"},
      {tag:"Parent Stories",title:"\"We Never Expected Our Daughter to Cry Leaving Taiwan\"",excerpt:"A Hong Kong family shares their 3-week exchange at a Waldorf school in Tainan — and why they're already planning to return.",date:"February 2026",img:"/assets/schools/tainan-waldorf.png"},
      {tag:"Practical Advice",title:"Taiwan Healthcare for Families: What You Actually Need to Know",excerpt:"From pediatric clinics to pharmacy etiquette — a clear guide to accessing healthcare as a foreign family in Taiwan.",date:"January 2026",img:"/assets/schools/hualien-montessori.png"},
      {tag:"School Spotlight",title:"Hualien Montessori House: Where Learning Meets the East Coast",excerpt:"Our newest partner school sits minutes from Taiwan's stunning East Coast. We visited and this is what we found.",date:"December 2025",img:"/assets/schools/nantou-mountain.png"}
    ]
  },
  footer: { desc:"Connecting international families with vetted, nature-based preschools across Taiwan for meaningful short-term exchange experiences.", copyright:"© 2026 Taiwan Preschool Exchange. All rights reserved.", legal:"Taiwan Preschool Exchange 有限公司 · Taipei, Taiwan" }
}

export const DEFAULT_ZH: SiteContent = {
  site:{ name:"台灣幼兒交流", tagline:"Taiwan Preschool Exchange", email:"contact@preschoolexchange.org", domain:"www.preschoolexchange.org", defaultLang:"en", logo:"/assets/logo.png", heroBgOpacity:0.10 },
  nav:{
    links:[{label:"課程方案",page:"programs"},{label:"為何選台灣",page:"why-taiwan"},{label:"如何運作",page:"how-it-works"},{label:"關於我們",page:"about"},{label:"部落格",page:"blog"},{label:"常見問題",page:"faq"},{label:"聯絡我們",page:"contact"}],
    cta:{label:"立即申請",page:"programs"}
  },
  home:{
    heroImg:DEFAULT_EN.home.heroImg, heroImgOpacity:0.95, heroImgMobile:true, heroImgMobileOpacity:0.28, heroImgFade:72,
    badge:"已獲全球12個以上國家的國際家庭信賴",
    headline:"全球視野的童年。\n在地真實的體驗。",
    sub:"台灣短期幼兒交流體驗——讓您的家庭在全球最安全、最友善兒童的目的地，讓孩子接觸在地生活、大自然、語言與新朋友。",
    cta1:"探索課程方案", cta2:"了解流程",
    trust:["所有合作學校均獲教育部立案認可","充滿自然探索的豐富學習體驗","溫暖親切的在地幼教師資","10年以上國際家庭服務經驗"],
    stats:[{num:"全球第4",label:"全球最安全國家\n（2025 Numbeo）"},{num:"6所",label:"遍布台灣各地\n合作幼兒園"},{num:"1–12",label:"彈性課程時長\n（週數）"},{num:"2–7歲",label:"適合此年齡區間\n的兒童"}],
    featuredTitle:"精選課程方案", featuredSub:"精心挑選台灣各地優質幼兒園，每一所均專為國際家庭嚴格審核",
    howTitle:"如何運作", howSub:"從第一次詢問到踏上台灣——我們全程陪伴每個家庭",
    steps:[{title:"探索與瀏覽",text:"依城市、孩子年齡與學習理念，篩選最適合的課程方案。"},{title:"預約諮詢",text:"與我們雙語團隊進行30分鐘通話，找到最適合孩子的學校。"},{title:"申請並確認",text:"完成申請表格，繳交訂金，正式確認您的課程位置。"},{title:"抵達與體驗",text:"我們處理所有細節——您的家庭全程備受支持。"}],
    ctaTitle:"每個家庭都不一樣。\n告訴我們您的故事。", ctaSub:"我們將為您的孩子找到最合適的幼兒園。",
    ctaBtn:"開始您的旅程", ctaBtn2:"瀏覽所有課程"
  },
  programs:{
    title:"尋找您的課程方案",
    sub:"瀏覽台灣各地通過嚴格審核的幼兒交流課程，篩選最適合您家庭的選擇。",
    schools:[
      {id:"taipei-bilingual",name:"台北雙語幼兒園",city:"台北",area:"大安區",ageRange:"3–6歲",languages:"英語 · 普通話",durations:"1 – 4週",priceFrom:"2,200",features:["英語教學支援","市中心","校車服務"],photo:"/assets/schools/taipei-bilingual.png",badge:"最受歡迎",desc:"位於台北市中心的溫馨雙語學習環境。透過遊戲式課程融合英語與普通話學習，師資具備豐富國際教育經驗。",schedule:[{t:"上午8:30",a:"早安問候與自由遊戲"},{t:"上午9:15",a:"團體時間與普通話學習"},{t:"上午10:00",a:"英語故事與語言活動"},{t:"上午11:00",a:"藝術創意探索"},{t:"中午12:00",a:"午餐（含）"},{t:"下午1:00",a:"午休／靜態休息"},{t:"下午2:30",a:"戶外遊戲與體能活動"},{t:"下午4:00",a:"下午點心與離園"}],includes:[{item:"課程學費",inc:true},{item:"每日午餐與點心",inc:true},{item:"雙語輔導師資",inc:true},{item:"每週家長進度報告",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]},
      {id:"taichung-forest",name:"台中森林學校",city:"台中",area:"南屯區",ageRange:"2–5歲",languages:"普通話 · 英語",durations:"2 – 8週",priceFrom:"1,950",features:["自然教育","戶外學習","森林校園"],photo:"/assets/schools/taichung-forest.png",badge:"自然首選",desc:"沉浸式大自然學習體驗，每天透過親身戶外活動探索台灣豐富的自然環境，在台中綠意盎然的環境中成長。",schedule:[{t:"上午8:00",a:"花園晨間集合"},{t:"上午8:45",a:"自然步道與戶外探索"},{t:"上午10:00",a:"主題專案學習活動"},{t:"上午11:30",a:"田園料理體驗"},{t:"中午12:00",a:"有機午餐（含）"},{t:"下午1:00",a:"休息時間"},{t:"下午2:30",a:"創意森林遊戲"},{t:"下午4:00",a:"反思圓圈與離園"}],includes:[{item:"課程學費",inc:true},{item:"有機午餐與點心",inc:true},{item:"自然學習材料",inc:true},{item:"每週家庭通訊",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]},
      {id:"taoyuan-kindergarten",name:"桃園國際幼兒園",city:"桃園",area:"近機場",ageRange:"2–6歲",languages:"英語 · 普通話",durations:"1 – 4週",priceFrom:"1,800",features:["近機場","英語教學支援","混齡班級"],photo:"/assets/schools/taoyuan-kindergarten.png",badge:"輕鬆抵達",desc:"緊鄰桃園國際機場，溫馨迎賓的幼兒園提供順暢的入學體驗，並擁有紮實的英語教學課程。",schedule:[{t:"上午8:30",a:"早安迎賓與自由探索"},{t:"上午9:00",a:"英語早會"},{t:"上午10:00",a:"主題學習活動"},{t:"上午11:00",a:"戶外遊樂場"},{t:"中午12:00",a:"午餐（含）"},{t:"下午1:00",a:"靜息時間"},{t:"下午2:30",a:"藝術與音樂"},{t:"下午4:00",a:"道別圓圈與離園"}],includes:[{item:"課程學費",inc:true},{item:"每日午餐",inc:true},{item:"英語協調師",inc:true},{item:"家長入學說明會",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]},
      {id:"tainan-waldorf",name:"台南華德福學校",city:"台南",area:"安平區",ageRange:"3–6歲",languages:"普通話 · 少量英語",durations:"2 – 12週",priceFrom:"1,700",features:["華德福教育","文化沉浸","長期入住"],photo:"/assets/schools/tainan-waldorf.png",badge:"深度文化體驗",desc:"在台灣文化底蘊最豐厚的城市，體驗真實的華德福教育。最適合追求深度融入台灣日常生活與教育文化的家庭。",schedule:[{t:"上午8:30",a:"晨間韻律活動與蜂蠟塑形"},{t:"上午9:30",a:"季節性自然活動"},{t:"上午10:30",a:"自由創意遊戲"},{t:"上午11:30",a:"烹飪與傳統工藝"},{t:"中午12:00",a:"共享午餐（含）"},{t:"下午1:00",a:"故事與午休"},{t:"下午2:30",a:"花園與戶外時光"},{t:"下午4:00",a:"閉幕之歌與離園"}],includes:[{item:"課程學費",inc:true},{item:"每日午餐",inc:true},{item:"華德福教學材料",inc:true},{item:"文化活動行事曆",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]},
      {id:"hualien-montessori",name:"花蓮蒙特梭利之家",city:"花蓮",area:"東海岸",ageRange:"2–6歲",languages:"普通話 · 基礎英語",durations:"2 – 6週",priceFrom:"1,600",features:["蒙特梭利教育","東海岸","自然美景"],photo:"/assets/schools/hualien-montessori.png",badge:"最美風景",desc:"緊鄰壯麗的東海岸，蒙特梭利學校將孩子主導的學習與台灣最震撼的自然景觀及原住民文化完美結合。",schedule:[{t:"上午8:00",a:"蒙特梭利晨間工作時段"},{t:"上午10:00",a:"戶外自然觀察"},{t:"上午11:00",a:"日常生活實踐活動"},{t:"中午12:00",a:"午餐（含）"},{t:"下午1:00",a:"休息與靜閱時光"},{t:"下午2:30",a:"感官與動態遊戲"},{t:"下午4:00",a:"閉幕圓圈與離園"}],includes:[{item:"課程學費",inc:true},{item:"每日午餐",inc:true},{item:"蒙特梭利教具",inc:true},{item:"東海岸家庭遊覽（每兩週一次）",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]},
      {id:"nantou-mountain",name:"南投山林幼兒園",city:"南投",area:"日月潭周邊",ageRange:"3–6歲",languages:"普通話",durations:"4 – 12週",priceFrom:"1,550",features:["山林環境","原住民文化","長期入住"],photo:"/assets/schools/nantou-mountain.png",badge:"隱世瑰寶",desc:"深處台灣山心地帶，毗鄰日月潭，為長期入住的家庭提供沉浸於大自然與台灣原住民文化的獨特體驗。",schedule:[{t:"上午8:30",a:"山間晨間步行"},{t:"上午9:00",a:"原住民語言問候"},{t:"上午9:30",a:"傳統故事與工藝"},{t:"上午11:00",a:"戶外與園圃活動"},{t:"中午12:00",a:"午餐（含）"},{t:"下午1:00",a:"午休時間"},{t:"下午2:30",a:"自然探索"},{t:"下午4:00",a:"家庭閉幕圓圈"}],includes:[{item:"課程學費",inc:true},{item:"每日午餐",inc:true},{item:"文化學習材料",inc:true},{item:"每月山林遠足",inc:true},{item:"機場接送",inc:false},{item:"住宿安排",inc:false}]}
    ]
  },
  whyTaiwan:{
    title:"全球最被低估的\n親子旅遊目的地",
    sub:"很少有地方能像台灣一樣，自然地融合安全、便利、自然環境與兒童友善的基礎設施。",
    cards:[
      {icon:"🛡️",stat:"全球第4",title:"安全與家庭友善",body:"台灣在2025年Numbeo全球安全指數排名第4（得分82.9），高於新加坡（第9）和日本（第10）。犯罪率位居全球最低之列，夜間出行也安心自在。",bullets:["300個以上親子公共空間","400個以上博物館","兒童在此安全自在地探索"]},
      {icon:"🏥",stat:"< 美元30",title:"優質且平價的醫療",body:"台灣全民健保被評為全球最佳醫療體系之一。外籍訪客可透過自費方式便捷就醫，診察費通常不超過20至30美元。",bullets:["提供入台前醫療說明","附上各課程城市診所地圖","全台乾淨高效的醫療機構"]},
      {icon:"🚄",stat:"13,000+",title:"世界級的生活便利",body:"超過13,000家24小時便利商店，全球人均密度第二高。捷運、乾淨的公車與高鐵連結全台，交通舒適方便。",bullets:["Google Maps完整適用","英文指標廣泛","計程車安全且實惠"]},
      {icon:"🌿",stat:"60%森林覆蓋",title:"大自然就在門口",body:"台灣60%為森林覆蓋，從任何城市出發一小時內即可抵達山海及森林。30個以上國家公園提供安全的親子步道。",bullets:["陽明山、阿里山、太魯閣峽谷","在地農場戶外學習","每所學校皆是活生生的教室"]},
      {icon:"🗣️",stat:"雙語環境",title:"雙語學習環境",body:"許多私立幼兒園提供英語與普通話融合教學。台灣是少數仍以繁體中文為標準的地方，為孩子提供珍貴的文化學習機會。",bullets:["合作學校提供英普融合教學","學習真正的繁體中文","真實語言沉浸，非觀光導向"]},
      {icon:"🏮",stat:"文化底蘊",title:"深度文化沉浸體驗",body:"孩子透過遊戲體驗台灣傳統——燈籠節、夜市、龍舟賽。台灣人以對外籍兒童的耐心與熱情聞名。",bullets:["節慶與季節性慶典","夜市與在地飲食文化","台灣溫暖的愛童文化"]}
    ],
    ctaTitle:"台灣正在等待您。", ctaSub:"您的家庭只需踏上這段旅程。", ctaBtn:"與我們聯繫"
  },
  howItWorks:{
    title:"簡單輕鬆，從頭到尾",
    sub:"從第一個問題到自信地踏上台灣——我們全程陪伴每個家庭的每一步。",
    steps:[
      {num:"01",title:"探索與瀏覽",body:"依城市、孩子年齡、學習理念與課程時長瀏覽合作幼兒園。將喜愛的學校加入收藏清單。"},
      {num:"02",title:"預約免費諮詢",body:"安排一次30分鐘雙語團隊通話。我們聆聽、提問，協助您找到最適合孩子的學校。"},
      {num:"03",title:"申請並確認",body:"完成申請表、上傳所需文件，並繳交訂金確認名額。我們代為與學校溝通聯繫。"},
      {num:"04",title:"入台前準備",body:"收到個人化入學包：台灣旅遊指南、打包清單、SIM卡建議、附近診所與緊急聯絡資訊。"},
      {num:"05",title:"抵達台灣",body:"您的家庭抵達前，我們已安排好可選的機場接送、學校說明會與在地支援。"},
      {num:"06",title:"體驗並保持聯繫",body:"孩子上課，家人探索台灣。全程透過WhatsApp與我們保持聯繫，定期中途關心問候。"}
    ],
    ctaTitle:"準備好踏出第一步了嗎？", ctaSub:"預約與我們雙語團隊的30分鐘免費諮詢。", ctaBtn:"預約免費諮詢"
  },
  about:{
    title:"關於台灣幼兒交流",
    sub:"我們相信，孩子在培養自信、好奇心與連結感的體驗中，成長得最好。",
    missionBg:"/assets/schools/taichung-forest.png",
    mission:"台灣幼兒交流為國際家庭牽線，對接通過嚴格審核、以自然為本的台灣優質幼兒園，為2至7歲兒童創造有意義的短期交流體驗。",
    story:"許多家庭告訴我們，他們希望更早做這個決定。我們創辦台灣幼兒交流，是因為我們相信幼兒期是以溫柔、安全且有意義的方式探索世界的最佳時機。",
    vettingTitle:"我們的審核流程", vettingSub:"每所合作學校在加入我們的網絡前，均須通過6項嚴格審核。",
    vetting:[
      {num:"1",title:"教育部立案認可",text:"所有合作學校均持有有效的教育部立案證書，無一例外。"},
      {num:"2",title:"教師資格審查",text:"我們逐一審核教師個人資格認證及在職進修記錄。"},
      {num:"3",title:"國際家庭接待經驗",text:"學校必須具備支援非普通話家庭的豐富實際經驗。"},
      {num:"4",title:"溝通標準",text:"每日家長更新、具備英語溝通能力的師資，以及清晰的溝通規範。"},
      {num:"5",title:"安全設施",text:"實地訪查確認兒童安全防護空間、安全遊樂區域及閉路電視監控。"},
      {num:"6",title:"教育理念契合",text:"學校共享我們對情感健康、好奇心與兒童主導學習的核心價值。"}
    ],
    whyTitle:"為何家庭選擇我們",
    why:[
      {icon:"✓",title:"安全與標準",text:"所有學校均獲台灣教育部立案認可。我們親自審查師資資格與安全政策。"},
      {icon:"✓",title:"家庭支援",text:"許多合作學校擁有英語溝通師資。全程提供每日更新、翻譯協助與家長溝通。"},
      {icon:"✓",title:"健康與營養",text:"包含營養午餐。學校可配合飲食過敏需求。附近診所提前完成查勘。"},
      {icon:"✓",title:"後勤與便利",text:"學校位於家庭友善地區，包含住宿安排與有意義的週末家庭體驗。"},
      {icon:"✓",title:"我們的承諾",text:"合約清晰，費用透明，無隱藏費用。全程提供即時雙語支援。"}
    ],
    teamTitle:"每個家庭體驗背後的用心團隊", teamVersion:2,
    team:[{name:"Chloe Choo",role:"創辦人",initials:"CC",quote:"無論生命將我帶往何處，教育始終是我心中最堅定的依附。",bio:"Chloe擁有逾八年帶領國際遊學團及教育課程的豐富經驗，足跡遍及多個國家。她持有英國諾丁漢大學教育領導與管理碩士學位，並取得新加坡幼兒教育認證，同時是兒童繪本《Life Without Limits》的共同編輯。"}]
  },
  faq:{
    title:"常見問題", sub:"家庭在報名前最常詢問的問題。找不到您的答案？請直接與我們聯繫。",
    items:[
      {q:"這個課程適合幾歲的孩子？",a:"我們的課程歡迎2至7歲的兒童參加。大多數合作學校設有混齡或依年齡分組的班級，適合此年齡段的孩子。我們將在諮詢過程中，協助您找到最合適的學校。"},
      {q:"可以待多長時間？",a:"課程時長從1週到12週不等，視學校而定。大多數家庭選擇2至4週。部分學校提供長達12週的深度沉浸課程，適合希望深入體驗的家庭。"},
      {q:"學校有英語支援嗎？",a:"各學校的英語支援程度不同——我們在每個課程列表上清楚標示（全英語、雙語，或普通話為主附基礎英語支援）。我們的團隊也在整個過程中提供翻譯協助。"},
      {q:"課程費用包含哪些項目？",a:"費用通常包含課程學費、每日午餐與點心、學習材料及每週家長更新。住宿、機場接送與親子活動可作為可選附加服務。各學校頁面均有完整的包含／不含項目說明。"},
      {q:"如何付款？",a:"我們接受海外Visa、萬事達卡及JCB信用卡，以及Apple Pay、Google Pay和PayPal。您可選擇先繳訂金，於出發前補繳尾款，或一次全額付清。所有費用均以美元顯示。"},
      {q:"台灣對家庭來說安全嗎？",a:"非常安全。台灣在2025年Numbeo安全指數中排名全球第4，高於新加坡和日本。我們在出發前為每個家庭提供入台安全說明、在地診所地圖及緊急聯絡資訊。"},
      {q:"可以透過你們預訂住宿嗎？",a:"可以。我們為所有課程提供住宿套餐作為可選附加服務。我們與每所合作學校附近的家庭友善酒店及服務式公寓合作。您也歡迎自行安排住宿。"},
      {q:"如果需要取消怎麼辦？",a:"我們的取消政策允許在課程開始日期60天前全額退還訂金，30天前可獲部分退款。完整細節載於我們的取消政策中，申請前可先行閱讀。"},
      {q:"入境台灣需要辦理簽證嗎？",a:"大多數國籍的旅客可免簽入境台灣，停留最長90天。我們會在入學包中附上簽證資訊指南，如您的國家需要簽證支持文件，我們也可以提供協助。"},
      {q:"可以在確定前先參觀學校嗎？",a:"可以。我們可安排線上虛擬校園參觀，並在諮詢過程中直接介紹您認識學校協調老師。已在台灣的家庭也歡迎預約實地參訪。"}
    ]
  },
  contact:{ title:"與我們聯繫", sub:"有任何問題，或準備好開始了嗎？我們很期待聽到您的消息。", email:"contact@preschoolexchange.org", whatsapp:"透過 WhatsApp 傳訊給我們", line:"LINE：@twpreschoolexchange", response:"我們通常在平日24小時內回覆。", formTitle:"傳送訊息給我們" },
  partner:{
    title:"成為合作學校", sub:"打開校門，迎接正在尋找有意義短期幼兒交流體驗的國際家庭。",
    benefitsTitle:"為何與我們合作",
    benefits:[
      {icon:"🌍",title:"迎接全球家庭",text:"向來自香港、新加坡、馬來西亞、日本、韓國等地的國際親子開放您的學校。"},
      {icon:"🏆",title:"強化國際知名度",text:"在全球舞台上展示您學校的教育理念與特色，成為值得信賴的台灣優質學校網絡的一員。"},
      {icon:"🎨",title:"豐富課室的文化多元性",text:"打造更多元文化的學習環境，讓在地孩子與來自世界各地的同齡夥伴互動交流。"},
      {icon:"🤝",title:"行銷與支援全包",text:"我們負責處理國際行銷、家長溝通，並提供實用工具與範本，讓日常運營更順暢。"}
    ],
    processTitle:"如何開始",
    processSteps:["發送入夥意向至 contact@preschoolexchange.org","我們的團隊安排初步通話，深入了解您的學校與教育理念","我們進行實地訪查與文件審核","通過審核後，我們為您的學校辦理入網手續並上架課程","國際家庭開始發現並預約您的學校"],
    ctaTitle:"有興趣與我們合作嗎？", ctaSub:"請發送您學校的名稱、聯絡人及課程簡介給我們。", ctaEmail:"contact@preschoolexchange.org", ctaBtn:"發送郵件表達合作意向"
  },
  blog:{
    title:"指南與故事", sub:"實用指南、家庭故事，以及考慮來台灣的家庭最需要的第一手知識。",
    posts:[
      {tag:"家庭指南",title:"台灣4週幼兒交流，行李怎麼打？",excerpt:"從雨具到安慰小物——我們為第一次帶著幼兒在台灣長期生活的家庭準備的實用打包指南。",date:"2026年5月",img:"/assets/schools/taipei-bilingual.png"},
      {tag:"學校特寫",title:"走進台中森林學校：一週的生活日記",excerpt:"我們花了一週記錄台中森林合作學校的每日生活。這是一個4歲孩子典型一週的真實樣貌。",date:"2026年4月",img:"/assets/schools/taichung-forest.png"},
      {tag:"台灣旅遊",title:"從台北出發的最佳親子週末小旅行",excerpt:"課程之間，家庭可以好好探索。這些是台北出發兩小時內的最佳親子一日遊與週末旅遊目的地。",date:"2026年3月",img:"/assets/schools/taoyuan-kindergarten.png"},
      {tag:"家長故事",title:"「我們沒想到，女兒離開台灣時會哭」",excerpt:"一個香港家庭分享他們在台南華德福學校3週交流的深刻體驗——以及他們為何已計畫重返。",date:"2026年2月",img:"/assets/schools/tainan-waldorf.png"},
      {tag:"實用建議",title:"外籍家庭在台就醫，你真正需要知道的事",excerpt:"從小兒科診所到藥局禮儀——為在台外籍家庭整理的清晰就醫指南。",date:"2026年1月",img:"/assets/schools/hualien-montessori.png"},
      {tag:"學校特寫",title:"花蓮蒙特梭利之家：在東海岸遇見學習",excerpt:"我們最新的合作學校就在台灣壯麗東海岸旁幾分鐘的路程。我們親自造訪後，有了這些發現。",date:"2025年12月",img:"/assets/schools/nantou-mountain.png"}
    ]
  },
  footer:{ desc:"為國際家庭與台灣各地通過嚴格審核的自然系幼兒園牽線，打造有意義的短期交流體驗。", copyright:"© 2026 台灣幼兒交流。保留所有權利。", legal:"Taiwan Preschool Exchange 有限公司 · 台灣台北" }
}
