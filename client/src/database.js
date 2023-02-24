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
    { name: "Home", link: "/home" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Team", link: "/team" },
    { name: "Contact", link: "/contact" },
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
        healthServices: {
          carouselData: [
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/1.jpg",
              slug: "psychologicalCounseling",
            },
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/2.jpg",
              slug: "psychologicalCounseling",
            },
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/3.jpg",
              slug: "psychologicalCounseling",
            },
            {
              title: "Corporate Service",
              image: "./assets/front/images/4.jpg",
              slug: "corporateService",
            },
            {
              title: "Child Development",
              image: "./assets/front/images/5.jpg",
              slug: "childDevelopment",
            },
            {
              title: "Psychological Counseling",
              image: "./assets/front/images/6.jpg",
              slug: "psychologicalCounseling",
            },
          ],
          serviceDetailsData: {
            psychologicalCounseling: {
              slogan: "Counseling for Everyone",
              image: `${process.env.REACT_APP_URL}/assets/front/images/1.jpg`,
              details: getDummyServiceDetails(),
            },
            corporateService: {
              slogan: "About MindToHeart for Corporates",
              image: `${process.env.REACT_APP_URL}/assets/front/images/2.jpg`,
              details: getDummyServiceDetails(),
            },
            childDevelopment: {
              slogan:
                "If The World Is A Stage, Remember Our Children Are Sitting In The Front Row",
              image: `${process.env.REACT_APP_URL}/assets/front/images/3.jpg`,
              details: getDummyServiceDetails(),
            },
          },
        },
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
