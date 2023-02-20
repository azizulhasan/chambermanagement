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
    image: "./assets/front/images/corousel/1.jpeg",
    designation: "Lead Psychologist, Mind to Heart",
    about:
      "My therapeutic passion is work with cases like trauma (Child, Adolescent & Adult), PTSD (posttraumatic stress disorder), Adult Attachment Issues and a Maladaptive Childhood, Acute Stress Disorder (ASD), and several types of anxiety disorders, including generalized anxiety disorder, panic disorder, and various phobia-related disorders, and Couple & Family issues with an impressive success rate. Also, I can help you to deal with your real-life dilemmas & improve your personality with my full skills. Therapeutic Approach: I view my work as an opportunity to help people recognize their strengths and find resources to cope with everyday problems and adversity. And therapy is healing through Acceptance, Compassion, Forgiveness, & Responsibility towards self which I facilitate using the mind-body-spirit approach. My main focus is to create an open, safe and encouraging environment for my clients during their sessions.",
  },
  kamrulHasan: {
    name: "Dr. Mr. Kamrul Hasan",
    degree: "MA  (Clinical Psychology)",
    image: "./assets/front/images/corousel/2.jpeg",
    designation: "Psychological Counsellor, Mind to Heart",
    about:
      "Kamrul holds a master’s degree in Clinical Psychology from Columbia University, and currently serves as a Clinical Research Specialist at the Boston Children’s Hospital (BCH), Harvard Medical School’s teaching hospital. Her research focuses on the effects of early childhood adversity on (Bangladeshi) children’s brain development. She also voluntarily works with the Communication Sciences Lab at the New York State Psychiatric Institute (NYSPI), where she studies mother-infant communication modalities. At the Mind to Heart organization, Navin serves as a part time therapist, available remotely for online sessions.",
  },
  imranMasud: {
    name: "Dr. Mr. Imarn Masud",
    degree: "MS (Clinical Psychology)",
    image: "./assets/front/images/corousel/3.jpeg",
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
        <div className="px-4 my-10 max-w-7xl mx-auto md:px-8 flex gap-8">
          <div className="w-[320px] flex flex-col gap-8">
            <img
              src={memberData.image}
              alt={"Image of " + memberData.name}
              className="h-60 w-full object-cover rounded-xl border"
            />
            <button className="bg-themeColor text-white px-6 py-3 rounded-md">
              Book an Appointment
            </button>
          </div>
          <div className="text-lg flex flex-col gap-2">
            <h4>{memberData.designation}</h4>
            <h4>{memberData.degree}</h4>
            <h2>{memberData.name}</h2>
            <p>{memberData.about}</p>
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
};

export default MemberDetails;
