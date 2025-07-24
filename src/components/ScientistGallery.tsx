import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainVisualization } from "@/components/BrainVisualization";

interface Scientist {
  id: string;
  name: string;
  field: string;
  lifespan: string;
  quote: string;
  contributions: string[];
  cognitiveProfile: {
    logic: number;
    creativity: number;
    intuition: number;
    analysis: number;
  };
  avatar: string;
}

const scientists: Scientist[] = [
  {
    id: "einstein",
    name: "Albert Einstein",
    field: "Theoretical Physics",
    lifespan: "1879-1955",
    quote: "Imagination is more important than knowledge.",
    contributions: ["Theory of Relativity", "E=mc²", "Photoelectric Effect"],
    cognitiveProfile: {
      logic: 95,
      creativity: 100,
      intuition: 90,
      analysis: 85
    },
    avatar: "🧠"
  },
  {
    id: "newton",
    name: "Isaac Newton",
    field: "Physics & Mathematics",
    lifespan: "1642-1727",
    quote: "If I have seen further, it is by standing on the shoulders of giants.",
    contributions: ["Laws of Motion", "Universal Gravitation", "Calculus"],
    cognitiveProfile: {
      logic: 100,
      creativity: 85,
      intuition: 70,
      analysis: 95
    },
    avatar: "🍎"
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    field: "Electrical Engineering",
    lifespan: "1856-1943",
    quote: "The present is theirs; the future, for which I really worked, is mine.",
    contributions: ["AC Motor", "Wireless Technology", "Tesla Coil"],
    cognitiveProfile: {
      logic: 90,
      creativity: 100,
      intuition: 95,
      analysis: 80
    },
    avatar: "⚡"
  },
  {
    id: "curie",
    name: "Marie Curie",
    field: "Chemistry & Physics",
    lifespan: "1867-1934",
    quote: "Nothing in life is to be feared, it is only to be understood.",
    contributions: ["Radioactivity Research", "Polonium Discovery", "Radium Isolation"],
    cognitiveProfile: {
      logic: 90,
      creativity: 75,
      intuition: 85,
      analysis: 100
    },
    avatar: "🔬"
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    field: "Theoretical Physics",
    lifespan: "1918-1988",
    quote: "I would rather have questions that can't be answered than answers that can't be questioned.",
    contributions: ["Quantum Electrodynamics", "Feynman Diagrams", "Computing Theory"],
    cognitiveProfile: {
      logic: 95,
      creativity: 95,
      intuition: 90,
      analysis: 90
    },
    avatar: "🎭"
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    field: "Natural History",
    lifespan: "1809-1882",
    quote: "It is not the strongest of the species that survives, but the most adaptable.",
    contributions: ["Theory of Evolution", "Natural Selection", "Origin of Species"],
    cognitiveProfile: {
      logic: 85,
      creativity: 80,
      intuition: 95,
      analysis: 100
    },
    avatar: "🐒"
  }
];

interface ScientistGalleryProps {
  selectedScientists: string[];
  onSelectionChange: (scientists: string[]) => void;
  onCompareClick: () => void;
}

export const ScientistGallery = ({ 
  selectedScientists, 
  onSelectionChange, 
  onCompareClick 
}: ScientistGalleryProps) => {
  const [hoveredScientist, setHoveredScientist] = useState<string | null>(null);

  const toggleSelection = (scientistId: string) => {
    if (selectedScientists.includes(scientistId)) {
      onSelectionChange(selectedScientists.filter(id => id !== scientistId));
    } else if (selectedScientists.length < 3) {
      onSelectionChange([...selectedScientists, scientistId]);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neural-gradient mb-4">
            Gallery of Genius
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select up to 3 scientists to explore their cognitive landscapes and compare their thinking patterns.
          </p>
          {selectedScientists.length > 1 && (
            <Button 
              onClick={onCompareClick}
              className="mt-6 neural-glow"
              size="lg"
            >
              Compare Selected Minds ({selectedScientists.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scientists.map((scientist) => (
            <div
              key={scientist.id}
              className={`glass-card cursor-pointer transition-all duration-500 hover:scale-105 ${
                selectedScientists.includes(scientist.id) 
                  ? 'ring-2 ring-primary glow-pulse' 
                  : ''
              }`}
              onClick={() => toggleSelection(scientist.id)}
              onMouseEnter={() => setHoveredScientist(scientist.id)}
              onMouseLeave={() => setHoveredScientist(null)}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-float">
                  {scientist.avatar}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {scientist.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <Badge variant="secondary" className="mx-auto">
                    {scientist.field}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {scientist.lifespan}
                  </p>
                </div>
              </div>

              <BrainVisualization 
                cognitiveProfile={scientist.cognitiveProfile}
                isActive={hoveredScientist === scientist.id}
                size="small"
              />

              <div className="mt-6">
                <blockquote className="text-sm italic text-muted-foreground mb-4 text-center">
                  "{scientist.quote}"
                </blockquote>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Key Contributions:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {scientist.contributions.map((contribution, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {contribution}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedScientists.includes(scientist.id) && (
                <div className="mt-4 text-center">
                  <Badge className="bg-primary text-primary-foreground">
                    Selected for Comparison
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};