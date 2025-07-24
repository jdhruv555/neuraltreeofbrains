import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainVisualization } from "@/components/BrainVisualization";
import { ArrowLeft } from "lucide-react";

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
    cognitiveProfile: { logic: 95, creativity: 100, intuition: 90, analysis: 85 },
    avatar: "🧠"
  },
  {
    id: "newton",
    name: "Isaac Newton",
    field: "Physics & Mathematics",
    lifespan: "1642-1727",
    quote: "If I have seen further, it is by standing on the shoulders of giants.",
    contributions: ["Laws of Motion", "Universal Gravitation", "Calculus"],
    cognitiveProfile: { logic: 100, creativity: 85, intuition: 70, analysis: 95 },
    avatar: "🍎"
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    field: "Electrical Engineering",
    lifespan: "1856-1943",
    quote: "The present is theirs; the future, for which I really worked, is mine.",
    contributions: ["AC Motor", "Wireless Technology", "Tesla Coil"],
    cognitiveProfile: { logic: 90, creativity: 100, intuition: 95, analysis: 80 },
    avatar: "⚡"
  },
  {
    id: "curie",
    name: "Marie Curie",
    field: "Chemistry & Physics",
    lifespan: "1867-1934",
    quote: "Nothing in life is to be feared, it is only to be understood.",
    contributions: ["Radioactivity Research", "Polonium Discovery", "Radium Isolation"],
    cognitiveProfile: { logic: 90, creativity: 75, intuition: 85, analysis: 100 },
    avatar: "🔬"
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    field: "Theoretical Physics",
    lifespan: "1918-1988",
    quote: "I would rather have questions that can't be answered than answers that can't be questioned.",
    contributions: ["Quantum Electrodynamics", "Feynman Diagrams", "Computing Theory"],
    cognitiveProfile: { logic: 95, creativity: 95, intuition: 90, analysis: 90 },
    avatar: "🎭"
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    field: "Natural History",
    lifespan: "1809-1882",
    quote: "It is not the strongest of the species that survives, but the most adaptable.",
    contributions: ["Theory of Evolution", "Natural Selection", "Origin of Species"],
    cognitiveProfile: { logic: 85, creativity: 80, intuition: 95, analysis: 100 },
    avatar: "🐒"
  }
];

interface ComparisonDashboardProps {
  selectedScientists: string[];
  onBackToGallery: () => void;
}

export const ComparisonDashboard = ({ selectedScientists, onBackToGallery }: ComparisonDashboardProps) => {
  const selectedData = scientists.filter(scientist => selectedScientists.includes(scientist.id));

  if (selectedData.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-3xl font-bold text-neural-gradient mb-4">
              No Scientists Selected
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Please select at least one scientist from the gallery to begin comparison.
            </p>
            <Button onClick={onBackToGallery} className="neural-glow">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const cognitiveAttributes = ['logic', 'creativity', 'intuition', 'analysis'];
  const attributeColors = {
    logic: 'hsl(var(--thought-logic))',
    creativity: 'hsl(var(--thought-creativity))',
    intuition: 'hsl(var(--thought-intuition))',
    analysis: 'hsl(var(--thought-analysis))'
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Button 
            onClick={onBackToGallery} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
          
          <h2 className="text-4xl md:text-5xl font-bold text-neural-gradient mb-4">
            Cognitive Comparison
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the unique thinking patterns and cognitive strengths of these brilliant minds.
          </p>
        </div>

        {/* Scientist Profiles */}
        <div className={`grid gap-8 mb-16 ${
          selectedData.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
          selectedData.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
          'grid-cols-1 lg:grid-cols-3'
        }`}>
          {selectedData.map((scientist) => (
            <div key={scientist.id} className="glass-card">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 animate-float">
                  {scientist.avatar}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {scientist.name}
                </h3>
                <Badge variant="secondary" className="mb-2">
                  {scientist.field}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {scientist.lifespan}
                </p>
              </div>

              <BrainVisualization 
                cognitiveProfile={scientist.cognitiveProfile}
                isActive={true}
                size="medium"
              />

              <div className="mt-6">
                <blockquote className="text-sm italic text-muted-foreground mb-4 text-center">
                  "{scientist.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Cognitive Comparison Chart */}
        <div className="glass-card">
          <h3 className="text-2xl font-bold text-center mb-8 text-neural-gradient">
            Cognitive Profile Comparison
          </h3>
          
          <div className="space-y-8">
            {cognitiveAttributes.map((attribute) => (
              <div key={attribute} className="space-y-4">
                <h4 className="text-lg font-semibold capitalize text-foreground flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: attributeColors[attribute as keyof typeof attributeColors] }}
                  ></div>
                  {attribute}
                </h4>
                
                <div className="space-y-3">
                  {selectedData.map((scientist) => (
                    <div key={`${scientist.id}-${attribute}`} className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-muted-foreground">
                        {scientist.name.split(' ')[0]}
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-3 relative overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${scientist.cognitiveProfile[attribute as keyof typeof scientist.cognitiveProfile]}%`,
                            backgroundColor: attributeColors[attribute as keyof typeof attributeColors]
                          }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm font-semibold text-foreground">
                        {scientist.cognitiveProfile[attribute as keyof typeof scientist.cognitiveProfile]}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4 text-thought-gradient">
              Thinking Style Analysis
            </h3>
            <div className="space-y-4">
              {selectedData.map((scientist) => {
                const dominant = Object.entries(scientist.cognitiveProfile)
                  .sort((a, b) => b[1] - a[1])[0];
                
                return (
                  <div key={scientist.id} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{scientist.avatar}</span>
                      <span className="font-semibold">{scientist.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dominant trait: <span className="capitalize font-medium text-foreground">
                        {dominant[0]} ({dominant[1]}%)
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4 text-thought-gradient">
              Collaborative Potential
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                These minds would create a powerful collaborative force, combining:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Complementary cognitive strengths</li>
                <li>Diverse problem-solving approaches</li>
                <li>Balanced analytical and creative thinking</li>
                <li>Cross-disciplinary innovation potential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};