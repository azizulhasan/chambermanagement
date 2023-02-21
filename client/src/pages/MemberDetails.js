import React, { lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuBar from "../components/front/home/sections/MenuBar";
import TopNav from "../components/front/home/sections/TopNav";
// import defaultDatabase from "../../../../database";
const NotFound = lazy(() =>
  import("../components/front/common/notfound/NotFound")
);

const healthProfessionals = {
  madadiHasan: {
    name: "Dr. Mr. Madadi Hasan",
    degree: "MS (Counselling Psychology)",
    // image: process.env.REACT_APP_URL + "/assets/front/images/corousel/1.jpeg",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    designation: "Lead Psychologist, Mind to Heart",
    about:
      "My therapeutic passion is work with cases like trauma (Child, Adolescent & Adult), PTSD (posttraumatic stress disorder), Adult Attachment Issues and a Maladaptive Childhood, Acute Stress Disorder (ASD), and several types of anxiety disorders, including generalized anxiety disorder, panic disorder, and various phobia-related disorders, and Couple & Family issues with an impressive success rate. Also, I can help you to deal with your real-life dilemmas & improve your personality with my full skills. Therapeutic Approach: I view my work as an opportunity to help people recognize their strengths and find resources to cope with everyday problems and adversity. And therapy is healing through Acceptance, Compassion, Forgiveness, & Responsibility towards self which I facilitate using the mind-body-spirit approach. My main focus is to create an open, safe and encouraging environment for my clients during their sessions.",
  },
  kamrulHasan: {
    name: "Dr. Mr. Kamrul Hasan",
    degree: "MA  (Clinical Psychology)",
    // image: process.env.REACT_APP_URL + "/assets/front/images/corousel/2.jpeg",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    designation: "Psychological Counsellor, Mind to Heart",
    about:
      "Kamrul holds a master’s degree in Clinical Psychology from Columbia University, and currently serves as a Clinical Research Specialist at the Boston Children’s Hospital (BCH), Harvard Medical School’s teaching hospital. Her research focuses on the effects of early childhood adversity on (Bangladeshi) children’s brain development. She also voluntarily works with the Communication Sciences Lab at the New York State Psychiatric Institute (NYSPI), where she studies mother-infant communication modalities. At the Mind to Heart organization, Navin serves as a part time therapist, available remotely for online sessions.",
  },
  imranMasud: {
    name: "Dr. Mr. Imarn Masud",
    degree: "MS (Clinical Psychology)",
    // image: process.env.REACT_APP_URL + "/assets/front/images/corousel/3.jpeg",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    designation: "Psychological Counsellor, Mind to Heart",
    about:
      "My professional goal is to help people to overcome their struggles by strengthening existing skills and to gain control over their emotions. I have been working in the field of mental health for more than three years.  My clinical interest lies in mood and anxiety-related disorders. For therapy sessions, I prefer cognitive Behavior therapy, person-centered therapy and mindfulness. I am also skilled in administering different psychometric testing, training, and workshops facilitation on different mental issues, life coaching, and capacity development.",
  },
};

const MemberDetails = () => {
  const { slug } = useParams();
  // console.log({ defaultDatabase });

  const memberData = healthProfessionals[slug];
  if (memberData) {
    return (
      <>
        <TopNav />
        <MenuBar />
        <div className="px-4 my-20 max-w-7xl mx-auto md:px-8 flex flex-col sm:flex-row gap-8">
          <div className="min-w-fit flex flex-col gap-8">
            <div className="h-60 w-2/3 mx-auto sm:w-80 relative overflow-hidden rounded-xl">
              <img
                src={memberData.image}
                alt={"Image of " + memberData.name}
                className="absolute inset-0 object-cover  border hover:scale-110 duration-300 ease-in-out"
              />
            </div>

            <button className="w-2/3 mx-auto sm:w-full bg-themeColor text-white px-6 py-3 rounded-md">
              Book an Appointment
            </button>
          </div>
          <div className="text-lg flex flex-col gap-2">
            <div>
              <h4 className="font-semibold">{memberData.designation}</h4>
              <h4 className="font-medium">{memberData.degree}</h4>
            </div>
            <div>
              <h2 className="font-bold">{memberData.name}</h2>
              <p>{memberData.about}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
};

export default MemberDetails;
