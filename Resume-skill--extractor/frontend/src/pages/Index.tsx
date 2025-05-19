import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import FileUploader from "@/components/FileUploader";
import ProcessingStatus from "@/components/ProcessingStatus";
import SkillsList from "@/components/SkillsList";
import BackendStatus from "@/components/BackendStatus";
import DemoNotice from "@/components/DemoNotice";
import { useToast } from "@/components/ui/use-toast";
import { checkBackendStatus, extractSkillsFromResume } from "@/services/api";
import { mockSkills } from "@/services/mockData";

interface Skill {
  name: string;
  category: string;
  confidence: number;
}

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("connecting");
  const [processingFile, setProcessingFile] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  const { toast } = useToast();

  // Check backend connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await checkBackendStatus();
        setConnectionStatus("connected");
        setIsDemo(false);
        toast({
          title: "Backend connected",
          description: "Successfully connected to the Python backend service.",
        });
      } catch (error) {
        console.error("Backend connection error:", error);
        setConnectionStatus("disconnected");
        setIsDemo(true);
        toast({
          title: "Backend disconnected",
          description:
            "Could not connect to the Python backend. Please start the backend server.",
          variant: "destructive",
        });
      }
    };

    checkConnection();
  }, [toast]);

  const handleFileUpload = async (file: File) => {
    setProcessingFile(true);
    setProcessingStep(1);

    try {
      // Step 1: File upload
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProcessingStep(2);

      // Step 2: Text extraction
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProcessingStep(3);

      // Step 3: Skills analysis
      let skills;

      if (!isDemo) {
        try {
          // Use real backend
          skills = await extractSkillsFromResume(file);
        } catch (error) {
          console.error("Error from backend:", error);
          toast({
            title: "Backend error",
            description:
              "Error connecting to Python backend. Please ensure it's running.",
            variant: "destructive",
          });
          throw error; // Re-throw to be caught by outer try/catch
        }
      } else {
        // Use mock data in demo mode
        toast({
          title: "Using demo mode",
          description: "Python backend not connected. Using mock data instead.",
          variant: "warning",
        });
        await new Promise((resolve) => setTimeout(resolve, 2500));
        skills = mockSkills;
      }

      setProcessingStep(4);

      // Step 4: Finalizing
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set extracted skills
      setExtractedSkills(skills);

      toast({
        title: "Skills extracted successfully",
        description: `Found ${skills.length} skills in your resume.`,
      });
    } catch (error) {
      console.error("Error processing resume:", error);
      toast({
        title: "Error processing resume",
        description: "There was an error extracting skills from your resume.",
        variant: "destructive",
      });

      // If real backend fails, fall back to demo mode
      if (!isDemo) {
        setIsDemo(true);
        toast({
          title: "Switched to demo mode",
          description: "Using mock data due to processing error.",
        });
        // Process with mock data
        setTimeout(() => {
          setExtractedSkills(mockSkills);
        }, 1000);
      }
    } finally {
      setProcessingFile(false);
      setProcessingStep(0);
    }
  };

  const handleReconnect = async () => {
    setConnectionStatus("connecting");

    try {
      await checkBackendStatus();
      setConnectionStatus("connected");
      setIsDemo(false);
      toast({
        title: "Reconnected",
        description: "Successfully reconnected to the Python backend.",
      });
    } catch (error) {
      setConnectionStatus("disconnected");
      setIsDemo(true);
      toast({
        title: "Reconnection failed",
        description:
          "Could not connect to the Python backend. Start the backend server first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-resume-background flex flex-col">
      <Header />

      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4 sm:px-6">
        {/* {isDemo && ( */}
        <div className="mb-6">
          <DemoNotice />
        </div>
        {/* )} */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <FileUploader
              onFileUpload={handleFileUpload}
              isProcessing={processingFile}
            />

            <div className="mt-6">
              <BackendStatus
                connectionStatus={connectionStatus}
                onTryReconnect={handleReconnect}
              />
            </div>

            {processingFile && (
              <div className="mt-6">
                <ProcessingStatus currentStep={processingStep} />
              </div>
            )}
          </div>

          <div>
            <SkillsList skills={extractedSkills} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
          Resume Skill Extractor • React Frontend + Python Backend
        </div>
      </footer>
    </div>
  );
};

export default Index;
