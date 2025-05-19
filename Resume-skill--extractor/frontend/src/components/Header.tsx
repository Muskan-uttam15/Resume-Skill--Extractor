
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-resume-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Resume Skill Extractor</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
