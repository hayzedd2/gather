import {
  BotIcon,
  ChartNoAxesColumn,
  ChartNoAxesCombinedIcon,
  ChartPie,
  FileLock2,
  HammerIcon,
  LockIcon,
  LockKeyholeIcon,
  PlugIcon,
  PlugZap,
  ScrollTextIcon,
  ShieldCheckIcon,
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
      icon: <ChartNoAxesCombinedIcon size={40} className="icon-amber mb-2" />,
      title: "Advanced Analytics",
      description:
        "Real-time reporting and analytics to help you understand your form performance and respondent data.",
    },
    {
      icon: <ShieldCheckIcon size={40} className="icon-blue mb-2" />,
      title: "Secure Submissions",
      description:
        "Data encryption, CAPTCHA protection, and GDPR compliance to keep your form data safe and secure.",
    },
    {
      icon: <PlugIcon size={40} className="icon-violet mb-2" />,
      title: "Powerful Integrations",
      description:
        "Connect with your favorite tools like Google Sheets, Airtable, Notion, and more with just a few clicks.",
      wip: true,
    },
    {
      icon: <BotIcon size={40} className="icon-green mb-2" />,
      title: "AI form builder",
      description:
        "Leverage AI to generate form questions, optimize layouts, and predict the best fields for higher response rates",
      wip: true,
    },
  ];

  return (
    <section>
      <div className="my-12 items-center">
        <div className="w-full flex-col flex items-center justify-center">
          <StaggerText className="md:text-[3rem] text-[2rem] mx-auto max-w-[350px] md:max-w-[450px] items-center justify-center leading-[2rem] md:leading-[3.4rem] text-center font-[600]">
            Powerful Features, Simple to Use
          </StaggerText>

          <h6 className="text-muted-foreground mx-auto text-center  text-[15px] font-[500] max-w-[500px]">
            Everything you need to create professional forms, surveys, and
            questionnaires in seconds.
          </h6>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6 mt-12 ">
          {features.map((f, i) => (
            <div key={i} className="card rounded-xl  p-3">
              {f.icon}
              <h3 className="text-[1.4rem]  font-[600]">
                {f.title} {f.wip && <Pill s="Coming soon" />}{" "}
              </h3>

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

const Pill = ({ s }: { s: string }) => {
  return (
    <span
      className={`whitespace-nowrap   w-max  text-xs font-[500] py-1 bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 rounded-full px-2`}
    >
      {s}
    </span>
  );
};
