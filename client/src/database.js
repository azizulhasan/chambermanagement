import { Carousel } from "react-bootstrap";

export const database = {
  basic: {
    themeColor: "rgb(103, 147, 75)",
    phone: "+8801715769060",
    email: "mindtoheart.bd@gmail.com",
    companyAddress: {
      area: "House #00, Road# 00, Dhanmondi,",
      district: "Dhaka",
      country: "Bangladesh",
    },
    companyLogo: "",
    companyTitle: "Mind To Heart",
  },
  topMenus: [
    { name: "Home", href: "#", current: true },
    { name: "About Us", href: "#aboutus", current: false },
    { name: "Services", href: "#services", current: false },
    { name: "Team", href: "#team", current: false },
    { name: "Contact", href: "#contact", current: false },
    { name: "Login", href: "/login", current: false },
    { name: "User Dashboard", href: "/user-panel", current: false },
  ],
  footerMenus: [
    {
      name: "About",
      subMenu: [
        { name: "About Us", link: "/about-us" },
        { name: "Courses", link: "/courses" },
        { name: "Refund Policy", link: "/refund-policy" },
        { name: "Privacy Policy", link: "/privacy-policy" },
      ],
    },
    {
      name: "Links",
      subMenu: [
        { name: "Blogs", link: "/bogs" },
        { name: "Terms of Service", link: "/terms-services" },
        { name: "Free Mental Health Tests", link: "/free-mental-health-tests" },
      ],
    },
  ],
  socialIcons: [
    {
      type: "facebook",
      size: 1,
      color: "",
      link: "",
    },
  ],
  termsOfService: [
    {
      title: "",
      subTitle: "",
      details: "",
      image: "",
    },
  ],
  refundPolicy: [{}],
  privicyPolicy: [{}],
  pages: {
    home: {
      sections: {
        hero: {
          slides: [
            {
              img: "./assets/front/images/corousel/hero/1.jpeg",
              content: "Book An Appointment",
            },
            {
              img: "./assets/front/images/corousel/hero/2.jpeg",
              content: "Book An Appointment",
            },
            {
              img: "./assets/front/images/corousel/hero/3.jpeg",
              content: "Book An Appointment",
            },
            {
              img: "./assets/front/images/corousel/hero/4.jpeg",
              content: "Book An Appointment",
            },
            {
              img: "./assets/front/images/corousel/hero/5.jpeg",
              content: "Book An Appointment",
            },
            {
              img: "./assets/front/images/corousel/hero/6.jpeg",
              content: "Book An Appointment",
            },
          ],
        },
        healthProfessionals: {
          carouselData: [
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Madadi Hasan",
              img: "./assets/front/images/corousel/health-professionals/1.jpg",
              slug: "madadiHasan",
            },
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Kamrul Hasan",
              img: "./assets/front/images/corousel/health-professionals/2.jpg",
              slug: "kamrulHasan",
            },
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Imarn Masud",
              img: "./assets/front/images/corousel/health-professionals/3.jpg",
              slug: "imranMasud",
            },
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Shirajuddin",
              img: "./assets/front/images/corousel/health-professionals/4.jpg",
              slug: "shirajuddin",
            },
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Saiful Islam",
              img: "./assets/front/images/corousel/health-professionals/5.jpg",
              slug: "saifulIslam",
            },
            {
              specialist: "PHYCHOLOGIST",
              name: "Dr. Mr. Siddique Ahmed",
              img: "./assets/front/images/corousel/health-professionals/6.jpg",
              slug: "siddiqueAhmed",
            },
          ],
          memberDetailsData: {
            madadiHasan: {
              name: "Dr. Mr. Madadi Hasan",
              degree: "MS (Counselling Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/1.jpg`,
              designation: "Lead Psychologist, Mind to Heart",
              about:
                "My therapeutic passion is work with cases like trauma (Child, Adolescent & Adult), PTSD (posttraumatic stress disorder), Adult Attachment Issues and a Maladaptive Childhood, Acute Stress Disorder (ASD), and several types of anxiety disorders, including generalized anxiety disorder, panic disorder, and various phobia-related disorders, and Couple & Family issues with an impressive success rate. Also, I can help you to deal with your real-life dilemmas & improve your personality with my full skills. Therapeutic Approach: I view my work as an opportunity to help people recognize their strengths and find resources to cope with everyday problems and adversity. And therapy is healing through Acceptance, Compassion, Forgiveness, & Responsibility towards self which I facilitate using the mind-body-spirit approach. My main focus is to create an open, safe and encouraging environment for my clients during their sessions.",
            },
            kamrulHasan: {
              name: "Dr. Mr. Kamrul Hasan",
              degree: "MA  (Clinical Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/2.jpg`,
              designation: "Psychological Counsellor, Mind to Heart",
              about:
                "Kamrul holds a master’s degree in Clinical Psychology from Columbia University, and currently serves as a Clinical Research Specialist at the Boston Children’s Hospital (BCH), Harvard Medical School’s teaching hospital. Her research focuses on the effects of early childhood adversity on (Bangladeshi) children’s brain development. She also voluntarily works with the Communication Sciences Lab at the New York State Psychiatric Institute (NYSPI), where she studies mother-infant communication modalities. At the Mind to Heart organization, Navin serves as a part time therapist, available remotely for online sessions.",
            },
            imranMasud: {
              name: "Dr. Mr. Imarn Masud",
              degree: "MS (Clinical Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/3.jpg`,
              designation: "Psychological Counsellor, Mind to Heart",
              about:
                "My professional goal is to help people to overcome their struggles by strengthening existing skills and to gain control over their emotions. I have been working in the field of mental health for more than three years.  My clinical interest lies in mood and anxiety-related disorders. For therapy sessions, I prefer cognitive Behavior therapy, person-centered therapy and mindfulness. I am also skilled in administering different psychometric testing, training, and workshops facilitation on different mental issues, life coaching, and capacity development.",
            },
            shirajuddin: {
              name: "Dr. Mr. Shirajuddin",
              degree: "MA  (Clinical Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/4.jpg`,
              designation: "Psychological Counsellor, Mind to Heart",
              about:
                "Kamrul holds a master’s degree in Clinical Psychology from Columbia University, and currently serves as a Clinical Research Specialist at the Boston Children’s Hospital (BCH), Harvard Medical School’s teaching hospital. Her research focuses on the effects of early childhood adversity on (Bangladeshi) children’s brain development. She also voluntarily works with the Communication Sciences Lab at the New York State Psychiatric Institute (NYSPI), where she studies mother-infant communication modalities. At the Mind to Heart organization, Navin serves as a part time therapist, available remotely for online sessions.",
            },
            saifulIslam: {
              name: "Dr. Mr. Saiful Islam",
              degree: "MS (Clinical Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/5.jpg`,
              designation: "Psychological Counsellor, Mind to Heart",
              about:
                "My professional goal is to help people to overcome their struggles by strengthening existing skills and to gain control over their emotions. I have been working in the field of mental health for more than three years.  My clinical interest lies in mood and anxiety-related disorders. For therapy sessions, I prefer cognitive Behavior therapy, person-centered therapy and mindfulness. I am also skilled in administering different psychometric testing, training, and workshops facilitation on different mental issues, life coaching, and capacity development.",
            },
            siddiqueAhmed: {
              name: "Dr. Mr. Siddique Ahmed",
              degree: "MS (Counselling Psychology)",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-professionals/6.jpg`,
              designation: "Lead Psychologist, Mind to Heart",
              about:
                "My therapeutic passion is work with cases like trauma (Child, Adolescent & Adult), PTSD (posttraumatic stress disorder), Adult Attachment Issues and a Maladaptive Childhood, Acute Stress Disorder (ASD), and several types of anxiety disorders, including generalized anxiety disorder, panic disorder, and various phobia-related disorders, and Couple & Family issues with an impressive success rate. Also, I can help you to deal with your real-life dilemmas & improve your personality with my full skills. Therapeutic Approach: I view my work as an opportunity to help people recognize their strengths and find resources to cope with everyday problems and adversity. And therapy is healing through Acceptance, Compassion, Forgiveness, & Responsibility towards self which I facilitate using the mind-body-spirit approach. My main focus is to create an open, safe and encouraging environment for my clients during their sessions.",
            },
          },
        },
        healthServices: {
          carouselData: [
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/corousel/health-services/1.jpg",
              slug: "psychologicalCounseling",
            },
            {
              title: "Corporate Service",
              image: "./assets/front/images/corousel/health-services/2.jpg",
              slug: "corporateService",
            },
            {
              title: "Child Development",
              image: "./assets/front/images/corousel/health-services/3.jpg",
              slug: "childDevelopment",
            },
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/corousel/health-services/1.jpg",
              slug: "psychologicalCounseling",
            },
            {
              title: "Corporate Service",
              image: "./assets/front/images/corousel/health-services/2.jpg",
              slug: "corporateService",
            },
            {
              title: "Child Development",
              image: "./assets/front/images/corousel/health-services/3.jpg",
              slug: "childDevelopment",
            },
          ],
          serviceDetailsData: {
            psychologicalCounseling: {
              slogan: "Counseling for Everyone",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-services/1.jpg`,
              details: getDummyServiceDetails(),
            },
            corporateService: {
              slogan: "About MindToHeart for Corporates",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-services/2.jpg`,
              details: getDummyServiceDetails(),
            },
            childDevelopment: {
              slogan:
                "If The World Is A Stage, Remember Our Children Are Sitting In The Front Row",
              image: `${process.env.REACT_APP_URL}/assets/front/images/corousel/health-services/3.jpg`,
              details: getDummyServiceDetails(),
            },
          },
        },
        resources: [
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
          {
            title: "Sexual Abuse and Trauma",
            url: "SHKy2AYv16g",
          },
        ],
      },
    },
  },
};

function getDummyServiceDetails() {
  return [
    "Psychological Assessment Session",
    "Individual Counselling Session",
    "Online or distant psychological assessment Session",
    "Online or distant counselling Session",
    "Couple Session",
    "Family Session",
    "Group Therapy",
    "Trauma Support Group therapy",
    "Systemic and family and couple therapy",
    "EMDR Based Trauma Therapy",
    "Life Coaching",
    "Corporate Mindfulness Training",
    "Corporate Psychological Wellness Services",
  ];
}
