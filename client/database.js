export const defaultDatabse = {
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
};
