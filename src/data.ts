export interface Article {
  id: number;
  title: string;
  slug?: string;
  category: string;
  author: string;
  date: string;
  content: string;
  image: string;
}

export const getArticleSlug = (article: Article): string => {
  if (article.slug) return article.slug;
  return article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const initialArticles: Article[] = [
  {
    id: 101,
    title: "Junaid Khan: Shangla's Youth Icon Driving Social Change Through SWDO",
    slug: "junaid-khan-shangla-youth-icon",
    category: "Welfare Activities",
    author: "SNN Bureau Alpuri",
    date: "20 Sep 2026",
    content: "ALPURI — In the remote mountainous region of District Shangla, a young philanthropist is emerging as a beacon of hope for marginalized families. Junaid Khan, founder of Shangla Welfare Development Organization (SWDO), is leading impactful welfare initiatives focused on education, poverty alleviation, and youth empowerment.\n\nHailing from a small village in Shangla, Khyber Pakhtunkhwa, Junaid Khan witnessed the challenges faced by local communities from an early age. His organization, SWDO, has been actively working to provide support to underprivileged households and to create opportunities for the youth of Shangla.\n\nAccording to local sources, SWDO under the leadership of Junaid Khan has launched several community-based programs, including educational support for deserving students and welfare drives during harsh winter seasons.\n\nLocal elders have praised the efforts of the young social worker, stating that his dedication to public service is inspiring a new generation of volunteers in Shangla.\n\nJunaid Khan stated that his mission is to continue serving the people of Shangla and to expand the reach of SWDO to more remote areas of the district.",
    image: "https://i.postimg.cc/wtq08CRW/Whats-App-Image-2026-09-19-at-10-15-36.jpg",
  },
  {
    id: 102,
    title: "Shangla-Swat Expressway Expansion Project Approved to Boost Regional Connectivity",
    slug: "shangla-swat-expressway-expansion-approved",
    category: "Shangla Local News",
    author: "SNN Bureau Alpuri",
    date: "20 Sep 2026",
    content: "ALPURI — The Khyber Pakhtunkhwa communication authorities have formally granted administrative approval for the vital Shangla-Swat link expressway expansion project. The comprehensive road widening and asphalt carpeting initiative will connect Alpuri, Lilownai, and surrounding valleys seamlessly to the Swat Motorway network.\n\nLocal transport unions, business traders, and residents across Shangla welcomed the milestone decision, noting that the enhanced route will significantly shorten travel times between Alpuri and Mingora from over two hours down to under 50 minutes. The development is also expected to give a tremendous boost to local eco-tourism in Yakhtangay, Chakesar, and scenic mountain ridges.\n\nAccording to official project documents, the initiative includes dedicated landslide protection retaining walls, illuminated tunnel passages, and modernized drainage channels designed to withstand extreme weather conditions. Work on Phase 1 is slated to commence within the coming weeks under strict quality and safety monitoring protocols.",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 103,
    title: "Digital Literacy & Free IT Training Center Inaugurated in Besham for Shangla Students",
    slug: "digital-literacy-it-training-center-inaugurated-besham",
    category: "Education",
    author: "Education Correspondent, Besham",
    date: "20 Sep 2026",
    content: "BESHAM — In a major leap forward for regional youth education, a state-of-the-art Digital Learning & Technology Center was officially inaugurated today in Besham, Shangla. The facility is equipped with 60 high-speed networked computer workstations, dedicated solar backup power, and fiber-optic broadband connectivity.\n\nThe institute will offer complimentary certification courses in software programming, graphic design, digital marketing, and freelance skills to local male and female students from matriculation to university levels. Special evening batches have been structured specifically for female learners to encourage wider participation in digital economy careers.\n\nCommunity leaders, educationists, and youth activists attended the inaugural ceremony, praising the initiative as a game-changer for District Shangla. Organizers announced that top-performing students will receive mentorship, internship placements, and assistance in securing remote freelance opportunities.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 104,
    title: "Free Specialized Health & Eye Surgical Camp Serves Over 1,200 Patients in Puran Tehsil",
    slug: "free-health-eye-camp-puran-shangla",
    category: "Welfare Activities",
    author: "Healthcare Desk, Puran",
    date: "20 Sep 2026",
    content: "PURAN, SHANGLA — A three-day comprehensive medical and ophthalmic surgical camp concluded successfully in Tehsil Puran, providing free consultations, diagnostic screenings, and life-saving medicines to more than 1,200 underprivileged residents from remote mountain villages.\n\nA dedicated team of visiting specialists, including cardiologists, gynecologists, pediatricians, and eye surgeons from major tertiary hospitals, conducted examinations and performed 85 successful cataract surgeries on-site using advanced phacoemulsification technology. All patients were provided with free prescription eyeglasses and post-operative medications.\n\nLocal elders and welfare volunteers expressed deep gratitude to the medical teams and welfare volunteers for reaching families who previously had to travel hours across treacherous terrain to access specialized healthcare in Swat or Abbottabad. The medical mission announced plans to establish permanent monthly satellite clinics across Shangla.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  },
  { id: 1, title: "SWDO Launches Emergency Aid in Alpuri", category: "Welfare Activities", author: "Junaid Khan", date: "2026-09-18", content: "The Shangla Welfare Development Organization (SWDO) has initiated a massive emergency aid distribution drive in Alpuri to support families affected by recent harsh weather...", image: "https://picsum.photos/600/400?random=1" },
  { id: 2, title: "New School Building Inaugurated in Besham", category: "Education", author: "Junaid Khan", date: "2026-09-17", content: "A state-of-the-art school building has been inaugurated in Besham, promising better educational facilities for over 500 students in the region...", image: "https://picsum.photos/600/400?random=2" },
  { id: 3, title: "SWDO Conducts Education Awareness Seminar", category: "Welfare Activities", author: "Junaid Khan", date: "2026-09-16", content: "SWDO recently organized a seminar focused on improving girls' education in remote areas of Shangla, bringing community leaders together for a common cause...", image: "https://picsum.photos/600/400?random=3" },
  { id: 4, title: "Community Driven Healthcare Initiative in Shangla", category: "Welfare Activities", author: "Junaid Khan", date: "2026-09-15", content: "A new community-driven healthcare initiative seeks to provide free medical consultations to the underprivileged populations across District Shangla...", image: "https://picsum.photos/600/400?random=4" },
  { id: 5, title: "Flood Relief Efforts Intensify in Lower Shangla", category: "Emergency Relief", author: "Junaid Khan", date: "2026-09-14", content: "Relief teams are working round the clock to deliver food and medicine to flood-affected communities in Lower Shangla...", image: "https://picsum.photos/600/400?random=5" },
  { id: 6, title: "Rebuilding Homes: Flood Recovery Update", category: "Emergency Relief", author: "Junaid Khan", date: "2026-09-13", content: "Following the recent floods, authorities have begun the rebuilding process, prioritizing homes for the most vulnerable families in the district...", image: "https://picsum.photos/600/400?random=6" },
  { id: 7, title: "Alpuri High School Upgraded with Science Lab", category: "Education", author: "Junaid Khan", date: "2026-09-12", content: "The Government High School in Alpuri has received a modern science lab, enhancing practical learning opportunities for secondary students...", image: "https://picsum.photos/600/400?random=7" },
  { id: 8, title: "Besham Technical College Announces New Programs", category: "Education", author: "Junaid Khan", date: "2026-09-11", content: "Technical and vocational training programs at Besham College are set to expand, offering more skills-based learning for the local youth...", image: "https://picsum.photos/600/400?random=8" },
  { id: 9, title: "Road Infrastructure Projects in Shangla", category: "Shangla Local News", author: "Junaid Khan", date: "2026-09-10", content: "Development projects covering key road segments in District Shangla have officially begun, promising better connectivity for trade and tourism...", image: "https://picsum.photos/600/400?random=9" },
  { id: 10, title: "Economic Boost Anticipated for Shangla Valley", category: "Shangla Local News", author: "Junaid Khan", date: "2026-09-09", content: "New agricultural policies are expected to revitalize the local economy in the Shangla Valley, supporting farmers and boosting local produce exports...", image: "https://picsum.photos/600/400?random=10" },
  { id: 11, title: "National Policy Shift Affects KPK Provinces", category: "Pakistan", author: "Junaid Khan", date: "2026-09-08", content: "Recent changes in national fiscal policy are expected to have significant implications for development projects across the KPK province...", image: "https://picsum.photos/600/400?random=11" },
  { id: 12, title: "Energy Security Strategy Announced", category: "Pakistan", author: "Junaid Khan", date: "2026-09-07", content: "The government has unveiled a comprehensive strategy aimed at improving energy security and reducing load shedding nationwide...", image: "https://picsum.photos/600/400?random=12" },
  { id: 13, title: "August Welfare Drive Successful in Alpuri", category: "Welfare Activities", author: "Junaid Khan", date: "2026-08-28", content: "Last month's welfare drive successfully reached over 200 families in Alpuri, providing essential supplies.", image: "https://picsum.photos/600/400?random=13" },
  { id: 14, title: "Summer Education Camp Concludes in Besham", category: "Education", author: "Junaid Khan", date: "2026-08-25", content: "The month-long summer education camp in Besham saw record participation, focusing on literacy and numeracy.", image: "https://picsum.photos/600/400?random=14" },
  { id: 15, title: "August Flood Assessment Report Released", category: "Emergency Relief", author: "Junaid Khan", date: "2026-08-22", content: "Local authorities released a comprehensive assessment report on the impact of August floods on infrastructure.", image: "https://picsum.photos/600/400?random=15" },
  { id: 16, title: "New Road Project Launched in Shangla", category: "Shangla Local News", author: "Junaid Khan", date: "2026-08-19", content: "A significant infrastructure project aiming to connect remote villages in Shangla started in late August.", image: "https://picsum.photos/600/400?random=16" },
  { id: 17, title: "National Education Summit Recap", category: "Pakistan", author: "Junaid Khan", date: "2026-08-16", content: "Key insights from the national education summit held last month, with implications for KPK provinces.", image: "https://picsum.photos/600/400?random=17" },
  { id: 18, title: "SWDO Volunteers Recognized for Services", category: "Welfare Activities", author: "Junaid Khan", date: "2026-08-13", content: "Volunteers from SWDO were formally recognized for their dedicated service during the August crisis.", image: "https://picsum.photos/600/400?random=18" },
  { id: 19, title: "Schools Reopen After Summer Break in Shangla", category: "Education", author: "Junaid Khan", date: "2026-08-10", content: "Schools across the district reopened in late August, with new measures to improve attendance.", image: "https://picsum.photos/600/400?random=19" },
  { id: 20, title: "Emergency Medical Camp in Upper Shangla", category: "Emergency Relief", author: "Junaid Khan", date: "2026-08-07", content: "A week-long medical camp provided necessary care to villagers in Upper Shangla during August.", image: "https://picsum.photos/600/400?random=20" },
  { id: 21, title: "August Economic Indicators for KPK", category: "Pakistan", author: "Junaid Khan", date: "2026-08-04", content: "Analysis of the economic performance of KPK province during the month of August.", image: "https://picsum.photos/600/400?random=21" },
  { id: 22, title: "Shangla Valley Beautification Plan Announced", category: "Shangla Local News", author: "Junaid Khan", date: "2026-08-01", content: "Local authorities revealed a plan to improve the aesthetics of key tourist spots in Shangla valley.", image: "https://picsum.photos/600/400?random=22" },
];
