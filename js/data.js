/**
 * Zenith Academy - Core Structured Dataset
 * Courses, Faculty, Results, Gallery, Videos, and FAQs
 * Built according to Content Models in IMPLEMENTATION.md
 */

const ACADEMY_DATA = {
  settings: {
    brandName: "Ananthu's PCM",
    tagline: "Kerala State & CBSE Physics, Chemistry & Maths Excellence",
    phone: "+91 98470 12345",
    whatsapp: "919847012345",
    email: "admissions@zenithacademy.edu.in",
    address: "MG Road, Ravipuram, Kochi, Kerala 682016",
    hours: "Mon - Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 1:00 PM",
    socialLinks: {
      youtube: "https://youtube.com/@zenithacademylive",
      instagram: "https://instagram.com/zenithacademy_kerala",
      facebook: "https://facebook.com/zenithacademy"
    }
  },

  metrics: [
    { value: 14500, suffix: "+", label: "Students Guided" },
    { value: 18, suffix: " Yrs", label: "Academic Leadership" },
    { value: 99.4, suffix: "%", label: "Board Exam Pass Rate" },
    { value: 340, suffix: "+", label: "Full A+ / Centum Scores" }
  ],

  courses: [
    {
      id: "state-plus-two-science",
      title: "Plus Two Science Intensive",
      board: "kerala",
      classLevel: "12",
      stream: "science",
      mode: "Hybrid",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      summary: "Comprehensive board examination mastery with previous 10-year question workouts, chapterwise test papers, and entrance bridge notes.",
      schedule: "Daily Evening Batches (5:00 PM - 8:00 PM) & Sunday Full Day",
      batchStatus: "Admissions Open (Limited Seats)",
      faculty: ["Prof. K. R. Menon (Physics)", "Dr. Deepa Nair (Chemistry)"],
      features: ["Weekly OMR assessments", "Printed module booklets", "Personalized doubt clearing"]
    },
    {
      id: "state-plus-two-commerce",
      title: "Plus Two Commerce Focus",
      board: "kerala",
      classLevel: "12",
      stream: "commerce",
      mode: "Offline & Online",
      subjects: ["Accountancy", "Business Studies", "Economics", "Computer Application"],
      summary: "Score 100% in Accountancy & Economics with practical problem solving, ledger workshops, and focused model exam series.",
      schedule: "Batch A: Mon, Wed, Fri (5:30 PM - 7:30 PM)",
      batchStatus: "Filling Fast",
      faculty: ["CA Arun Varma (Accountancy)", "Saritha V. (Economics)"],
      features: ["Balance sheet workshops", "Case study solving", "Formula cheat sheets"]
    },
    {
      id: "state-plus-one-science",
      title: "Plus One Science Foundation",
      board: "kerala",
      classLevel: "11",
      stream: "science",
      mode: "Offline & Online",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology/CS"],
      summary: "Smooth transition from Class 10 to Higher Secondary with strong core concept foundation and derivation clarity.",
      schedule: "Tue, Thu, Sat (5:00 PM - 7:30 PM)",
      batchStatus: "Open for New Batch",
      faculty: ["Prof. K. R. Menon", "Anjali P. (Mathematics)"],
      features: ["Concept-first approach", "Bilingual explanations", "Regular parent updates"]
    },
    {
      id: "state-class-10-sslc",
      title: "SSLC Full A+ Champion Batch",
      board: "kerala",
      classLevel: "10",
      stream: "general",
      mode: "Offline & Online",
      subjects: ["Maths", "Physics", "Chemistry", "Biology", "Social Science", "English"],
      summary: "Targeted training designed to secure Full A+ in Kerala SSLC. Strict syllabus coverage, revision rounds, and past papers.",
      schedule: "Mon to Fri (5:00 PM - 7:00 PM)",
      batchStatus: "Top Choice - Seats Filling",
      faculty: ["Ramesh Kumar (Maths)", "Sujatha K. (Science)"],
      features: ["SCERT textbook mastery", "Chapterwise unit tests", "Model board exams"]
    },
    {
      id: "cbse-class-12-science",
      title: "CBSE Class 12 Science Masterclass",
      board: "cbse",
      classLevel: "12",
      stream: "science",
      mode: "Hybrid",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      summary: "NCERT line-by-line mastery, NCERT Exemplar solutions, Assertion-Reason drill sessions, and CBSE sample paper workouts.",
      schedule: "Mon, Wed, Fri (4:30 PM - 7:30 PM)",
      batchStatus: "Admissions Open",
      faculty: ["Dr. Anand Joseph (Chemistry)", "Prof. R. Nambiar (Physics)"],
      features: ["Case-study question banks", "Exemplar problem workouts", "Board paper mock tests"]
    },
    {
      id: "cbse-class-12-commerce",
      title: "CBSE Class 12 Commerce Pro",
      board: "cbse",
      classLevel: "12",
      stream: "commerce",
      mode: "Offline & Online",
      subjects: ["Accountancy", "Business Studies", "Economics", "Applied Maths"],
      summary: "Rigorous practice on company accounts, partnership, macroeconomics, and case studies aligned with latest CBSE blueprint.",
      schedule: "Tue, Thu, Sat (5:00 PM - 7:30 PM)",
      batchStatus: "Filling Fast",
      faculty: ["CA Arun Varma", "Pooja Pillai (Economics)"],
      features: ["NCERT case study banks", "Speed calculation tests", "Viva-voce prep"]
    },
    {
      id: "cbse-class-10-board",
      title: "CBSE Class 10 Board Excellence",
      board: "cbse",
      classLevel: "10",
      stream: "general",
      mode: "Offline & Online",
      subjects: ["Mathematics Standard/Basic", "Science", "Social Science", "English"],
      summary: "Build unbeatable conceptual clarity in Maths & Science. High-yield practice, competency-based questions, and board test drills.",
      schedule: "Mon to Fri (4:45 PM - 6:45 PM)",
      batchStatus: "Top Performing Batch",
      faculty: ["Gokul Das (Science)", "Ramesh Kumar (Maths)"],
      features: ["Competency questions bank", "NCERT in-depth review", "Monthly parent reporting"]
    },
    {
      id: "foundation-class-8-9",
      title: "Classes 8 & 9 Foundation Spark",
      board: "both",
      classLevel: "8-9",
      stream: "general",
      mode: "Offline & Online",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
      summary: "Nurturing fundamental scientific and mathematical curiosity before high school pressure begins. Olympiad & talent search readiness.",
      schedule: "3 Days a Week (4:30 PM - 6:30 PM)",
      batchStatus: "Open for Enrolment",
      faculty: ["Senior Foundation Mentors"],
      features: ["Interactive experiments", "Logic & reasoning games", "Homework support"]
    }
  ],

  faculty: [
    {
      name: "Prof. K. R. Menon",
      subject: "Physics",
      qualification: "M.Sc Physics, B.Ed (Retd. Govt. College HOD)",
      experience: "28+ Years Experience",
      philosophy: "Physics isn't about rote memorizing equations; it's about visualizing how the universe communicates.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Deepa Nair",
      subject: "Chemistry",
      qualification: "Ph.D in Organic Chemistry, CSIR-NET",
      experience: "16+ Years Experience",
      philosophy: "Once you master the logic of reaction mechanisms, Chemistry transforms into the most scoring subject.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Ramesh Kumar, M.Sc",
      subject: "Mathematics",
      qualification: "M.Sc Mathematics, Gold Medalist",
      experience: "14+ Years Experience",
      philosophy: "Every complex problem has a simple entry point. I teach students how to spot that first step effortlessly.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "CA Arun Varma",
      subject: "Accountancy",
      qualification: "Chartered Accountant, B.Com",
      experience: "12+ Years Experience",
      philosophy: "Debits and credits mirror business realities. We train students to think like financial analysts, not just exam takers.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    }
  ],

  results: [
    {
      name: "Gopika S. Nair",
      board: "Kerala State Plus Two Science",
      year: "2025",
      score: "1200 / 1200",
      percent: "Full A+ (100%)",
      achievement: "State Level Full Mark Topper",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Aditya S. Varma",
      board: "CBSE Class 12 Science",
      year: "2025",
      score: "496 / 500",
      percent: "99.2%",
      achievement: "Centum in Physics & Mathematics",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Fathima Nihala",
      board: "Kerala SSLC (Class 10)",
      year: "2025",
      score: "Full A+ (All 10 Subjects)",
      percent: "100% A+",
      achievement: "District Rank Holder",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Rohit Krishnan",
      board: "CBSE Class 10",
      year: "2025",
      score: "492 / 500",
      percent: "98.4%",
      achievement: "School Topper in Standard Maths",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Ananya Rajesh",
      board: "Kerala State Plus Two Commerce",
      year: "2024",
      score: "1194 / 1200",
      percent: "99.5%",
      achievement: "Centum in Accountancy & Economics",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Mohammed Ziyan",
      board: "CBSE Class 12 Commerce",
      year: "2024",
      score: "491 / 500",
      percent: "98.2%",
      achievement: "Centum in Business Studies",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
    }
  ],

  testimonials: [
    {
      quote: "Joining Zenith Academy in Plus One was the turning point of my academic life. Physics used to intimidate me, but Menon Sir's real-life demonstrations made it my highest scoring subject in the board exam.",
      author: "Gopika S. Nair",
      role: "Student (Plus Two Science - 1200/1200)",
      year: "2025 Batch"
    },
    {
      quote: "As working parents, we were anxious about monitoring our son's board year. Zenith's weekly test report updates on WhatsApp and monthly parent-teacher conferences gave us complete peace of mind.",
      author: "Dr. Suresh & Radhika Varma",
      role: "Parents of Aditya Varma (CBSE 99.2%)",
      year: "Kochi"
    },
    {
      quote: "Their online live tuition is just as interactive as physical coaching. The screen annotations, instantaneous doubt-clearing, and uploaded class recordings helped me revise whenever I needed.",
      author: "Mohammed Sahal",
      role: "Online Student (Class 10 CBSE, Calicut)",
      year: "2025 Batch"
    }
  ],

  gallery: [
    {
      title: "Interactive Physics Lab Demonstration",
      category: "Classroom",
      aspect: "tall",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700&auto=format&fit=crop&q=80"
    },
    {
      title: "Annual Toppers Felicitations & Awards",
      category: "Achievements",
      aspect: "wide",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80"
    },
    {
      title: "Focused Board Exam Mock Examination",
      category: "Classroom",
      aspect: "square",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80"
    },
    {
      title: "Live Online Tuition Studio Session",
      category: "Online Learning",
      aspect: "wide",
      img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=700&auto=format&fit=crop&q=80"
    },
    {
      title: "Collaborative Study & Doubt Solving Wing",
      category: "Classroom",
      aspect: "tall",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80"
    },
    {
      title: "Onam Celebrations & Student Cultural Meet",
      category: "Events",
      aspect: "square",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&auto=format&fit=crop&q=80"
    }
  ],

  videos: [
    {
      id: "vid-1",
      youtubeId: "dQw4w9WgXcQ", // Safe fallback embed demo
      title: "Ray Optics Derivations: Guaranteed 5-Mark Questions (Plus Two)",
      category: "Physics",
      classLevel: "Class 12",
      duration: "18:42",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "vid-2",
      youtubeId: "kJQP7kiw5Fk",
      title: "Chemical Kinetics: Integrated Rate Law Made Effortless",
      category: "Chemistry",
      classLevel: "Class 12",
      duration: "14:15",
      thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "vid-3",
      youtubeId: "fJ9rUzIMcZQ",
      title: "Quadratic Equations: Solve Any SSLC / CBSE Problem in 60s",
      category: "Mathematics",
      classLevel: "Class 10",
      duration: "12:30",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80"
    }
  ],

  faqs: [
    {
      question: "Are both offline and online learning modes available for all batches?",
      answer: "Yes! All courses for Kerala State Syllabus and CBSE (Classes 8 through 12) are offered in physical classrooms at our Kochi campus and broadcast live simultaneously via our interactive digital learning portal. Students can even opt for a hybrid model where they attend weekdays online and weekend revision workshops in person."
    },
    {
      question: "What is the procedure for booking a Free Demo Class?",
      answer: "You can book a free demo class by filling out the online enquiry form or sending a WhatsApp message to our admissions desk. We will allot a trial session matching your board, class, and subjects so that student and parents can experience our teaching methodology firsthand."
    },
    {
      question: "How do you track student progress and inform parents?",
      answer: "We conduct weekly chapterwise tests and monthly comprehensive examinations. Performance reports, attendance status, and faculty remarks are sent directly to parents via our automated WhatsApp and SMS notification system."
    },
    {
      question: "What happens if a student misses an offline class due to illness or school events?",
      answer: "Every physical class is recorded in HD. Enrolled students have 24/7 access to our student portal where recorded lectures, class board summaries (PDFs), and assignment worksheets are stored for easy revision."
    },
    {
      question: "Do you offer separate doubt-clearing sessions?",
      answer: "Yes, our subject teachers are available 45 minutes before and after each scheduled batch for 1-on-1 doubt clearing. Online students can submit questions via the portal and receive video explanations or participate in daily live doubt rooms."
    }
  ]
};

// Export to window for browser usage
window.ACADEMY_DATA = ACADEMY_DATA;
