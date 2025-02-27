import {
  ChartNoAxesColumn,
  ChartNoAxesCombinedIcon,
  ChartPie,
  FileLock2,
  HammerIcon,
  LockIcon,
  LockKeyholeIcon,
  PlugZap,
  ScrollTextIcon,
} from "lucide-react";
import React from "react";
import StaggerText from "./StaggerText";

const FeaturesSection = () => {
  const features = [
    {
      icon: <HammerIcon size={40} className="icon-fuchsia mb-2" />,
      title: "Visual Builder",
      description:
        "Create forms visually with our intuitive interface. Simply select elements and customize with a few clicks.",
    },
    {
      icon: <ScrollTextIcon size={40} className="icon-cyan mb-2" />,
      title: "Beautiful Templates",
      description:
        "Start with one of our professionally designed templates and customize it to match your brand.",
    },
    {
      icon: <ChartNoAxesColumn size={40} className="icon-amber mb-2" />,
      title: "Advanced Analytics",
      description:
        "Real-time reporting and analytics to help you understand your form performance and respondent data.",
    },
    {
      icon: <LockKeyholeIcon size={40} className="icon-blue mb-2" />,
      title: "Secure Submissions",
      description:
        "Data encryption, CAPTCHA protection, and GDPR compliance to keep your form data safe and secure.",
    },
    {
      icon: <PlugZap size={40} className="icon-violet mb-2" />,
      title: "Powerful Integrations",
      description:
        "Connect with your favorite tools like Google Sheets, Airtable, Notion, and more with just a few clicks.",
    },
  ];

  return (
    <section>
      <div className="my-10 items-center">
        <div className="w-full flex-col flex items-center justify-center">
          <StaggerText className="text-[2rem]  text-center font-[600]">
            Powerful Features, Simple to Use
          </StaggerText>

          <h6 className="text-muted-foreground mx-auto text-center  text-[15px] font-[500] max-w-[500px]">
            Everything you need to create professional forms, surveys, and
            questionnaires in seconds.
          </h6>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6 mt-10 ">
          {features.map((f, i) => (
            <div key={i} className="card rounded-xl  p-3">
              {f.icon}
              <h3 className="text-[1.4rem]  font-[600]">{f.title}</h3>

              <p className="text-muted-foreground font-[500]  text-[15px]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
