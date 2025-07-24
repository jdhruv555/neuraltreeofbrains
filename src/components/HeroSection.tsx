import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onViewChange: (view: 'gallery' | 'compare') => void;
  activeView: 'gallery' | 'compare';
}

export const HeroSection = ({ onViewChange, activeView }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="glass-card max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-neural-gradient leading-tight">
              Mindscape of
              <br />
              <span className="text-thought-gradient">Geniuses</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Explore the cognitive landscapes of history's greatest minds through 
              interactive neural visualizations and AI-powered insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => onViewChange('gallery')}
              variant={activeView === 'gallery' ? 'default' : 'outline'}
              size="lg"
              className="neural-glow"
            >
              Explore Scientists
            </Button>
            <Button
              onClick={() => onViewChange('compare')}
              variant={activeView === 'compare' ? 'default' : 'outline'}
              size="lg"
              className="neural-glow"
            >
              Compare Minds
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="glass p-4 rounded-lg thought-pulse">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-thought-logic opacity-80"></div>
              <p className="text-sm text-muted-foreground">Logical Reasoning</p>
            </div>
            <div className="glass p-4 rounded-lg thought-pulse" style={{ animationDelay: '0.5s' }}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-thought-creativity opacity-80"></div>
              <p className="text-sm text-muted-foreground">Creative Thinking</p>
            </div>
            <div className="glass p-4 rounded-lg thought-pulse" style={{ animationDelay: '1s' }}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-thought-intuition opacity-80"></div>
              <p className="text-sm text-muted-foreground">Intuitive Insight</p>
            </div>
            <div className="glass p-4 rounded-lg thought-pulse" style={{ animationDelay: '1.5s' }}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-thought-analysis opacity-80"></div>
              <p className="text-sm text-muted-foreground">Analytical Power</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};