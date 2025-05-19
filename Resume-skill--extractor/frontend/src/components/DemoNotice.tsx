import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import demoImg from "@/assets/hero-image1.jpg";

interface DemoNoticeProps {
  onTrySkillExtractionClick: () => void;
}

const DemoNotice = () => {
  return (
    <Card className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 bg-white border shadow-sm">
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 ">
          Extract Key Skills from Your Resume Effortlessly
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Upload your resume and get an instant, detailed breakdown of your
          skills. Our tool helps you identify and highlight the most important
          skills to stand out to recruiters and applicant tracking systems.
        </p>
        <div className="flex gap-4">
          <Button
            className="bg-resume-primary hover:bg-resume-secondary text-white"
            // <-- here
          >
            ⬇️ Scroll down to extract skills from your resume
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <img
          src={demoImg}
          alt="Demo preview"
          className="w-[400px] h-[380px] rounded-lg shadow-lg object-cover transition-shadow duration-300 hover:shadow-xl"
        />
      </div>
    </Card>
  );
};

export default DemoNotice;
