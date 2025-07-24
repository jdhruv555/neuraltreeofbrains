import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ScientistGallery } from "@/components/ScientistGallery";
import { ComparisonDashboard } from "@/components/ComparisonDashboard";
import { NeuralBackground } from "@/components/NeuralBackground";

const Index = () => {
  const [selectedScientists, setSelectedScientists] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'gallery' | 'compare'>('gallery');

  return (
    <div className="min-h-screen relative">
      <NeuralBackground />
      
      <div className="relative z-10">
        <HeroSection 
          onViewChange={setActiveView}
          activeView={activeView}
        />
        
        {activeView === 'gallery' && (
          <ScientistGallery 
            selectedScientists={selectedScientists}
            onSelectionChange={setSelectedScientists}
            onCompareClick={() => setActiveView('compare')}
          />
        )}
        
        {activeView === 'compare' && (
          <ComparisonDashboard 
            selectedScientists={selectedScientists}
            onBackToGallery={() => setActiveView('gallery')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;