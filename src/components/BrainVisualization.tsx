import { useEffect, useRef } from "react";

interface CognitiveProfile {
  logic: number;
  creativity: number;
  intuition: number;
  analysis: number;
}

interface BrainVisualizationProps {
  cognitiveProfile: CognitiveProfile;
  isActive: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const BrainVisualization = ({ 
  cognitiveProfile, 
  isActive, 
  size = 'medium' 
}: BrainVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const sizeMap = {
    small: { width: 200, height: 150 },
    medium: { width: 300, height: 225 },
    large: { width: 400, height: 300 }
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous content
    svg.innerHTML = '';

    // Brain regions configuration
    const regions = [
      {
        name: 'logic',
        path: 'M 50 80 Q 80 60 120 70 Q 140 80 130 100 Q 100 110 50 80',
        color: 'hsl(var(--thought-logic))',
        intensity: cognitiveProfile.logic,
        label: 'Logic'
      },
      {
        name: 'creativity',
        path: 'M 130 60 Q 160 50 180 70 Q 190 90 170 100 Q 150 95 130 60',
        color: 'hsl(var(--thought-creativity))',
        intensity: cognitiveProfile.creativity,
        label: 'Creativity'
      },
      {
        name: 'intuition',
        path: 'M 60 110 Q 90 120 120 115 Q 140 110 130 130 Q 100 140 60 110',
        color: 'hsl(var(--thought-intuition))',
        intensity: cognitiveProfile.intuition,
        label: 'Intuition'
      },
      {
        name: 'analysis',
        path: 'M 140 110 Q 170 115 180 130 Q 175 145 150 140 Q 130 135 140 110',
        color: 'hsl(var(--thought-analysis))',
        intensity: cognitiveProfile.analysis,
        label: 'Analysis'
      }
    ];

    // Create SVG elements
    const svgNS = "http://www.w3.org/2000/svg";

    // Brain outline
    const brainOutline = document.createElementNS(svgNS, 'path');
    brainOutline.setAttribute('d', 'M 40 70 Q 30 50 60 40 Q 100 30 140 40 Q 170 45 185 60 Q 195 80 185 100 Q 180 120 170 130 Q 150 145 120 140 Q 90 135 70 130 Q 45 120 40 100 Q 35 85 40 70');
    brainOutline.setAttribute('fill', 'none');
    brainOutline.setAttribute('stroke', 'hsl(var(--border))');
    brainOutline.setAttribute('stroke-width', '2');
    brainOutline.setAttribute('opacity', '0.3');
    svg.appendChild(brainOutline);

    // Create brain regions
    regions.forEach((region, index) => {
      const regionElement = document.createElementNS(svgNS, 'path');
      regionElement.setAttribute('d', region.path);
      regionElement.setAttribute('fill', region.color);
      regionElement.setAttribute('opacity', isActive ? (region.intensity / 100 * 0.8).toString() : '0.4');
      regionElement.setAttribute('stroke', region.color);
      regionElement.setAttribute('stroke-width', '1');
      regionElement.setAttribute('class', 'brain-region');
      
      // Add pulsing animation based on intensity
      if (isActive && region.intensity > 80) {
        regionElement.style.animation = `glow-pulse 2s ease-in-out infinite`;
        regionElement.style.animationDelay = `${index * 0.2}s`;
      }

      svg.appendChild(regionElement);

      // Add region label when active
      if (isActive) {
        const text = document.createElementNS(svgNS, 'text');
        const textPosition = getRegionCenter(region.path);
        text.setAttribute('x', textPosition.x.toString());
        text.setAttribute('y', textPosition.y.toString());
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('fill', 'hsl(var(--foreground))');
        text.setAttribute('font-weight', 'bold');
        text.textContent = `${region.intensity}%`;
        svg.appendChild(text);
      }
    });

    // Add neural connections
    if (isActive) {
      const connections = [
        { from: regions[0], to: regions[1] },
        { from: regions[1], to: regions[2] },
        { from: regions[2], to: regions[3] },
        { from: regions[3], to: regions[0] }
      ];

      connections.forEach((connection, index) => {
        const line = document.createElementNS(svgNS, 'line');
        const fromCenter = getRegionCenter(connection.from.path);
        const toCenter = getRegionCenter(connection.to.path);
        
        line.setAttribute('x1', fromCenter.x.toString());
        line.setAttribute('y1', fromCenter.y.toString());
        line.setAttribute('x2', toCenter.x.toString());
        line.setAttribute('y2', toCenter.y.toString());
        line.setAttribute('stroke', 'hsl(var(--neural-primary))');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.6');
        line.style.animation = `thought-pulse 3s ease-in-out infinite`;
        line.style.animationDelay = `${index * 0.5}s`;
        
        svg.appendChild(line);
      });
    }

  }, [cognitiveProfile, isActive]);

  // Helper function to get region center (simplified)
  const getRegionCenter = (pathData: string) => {
    // Extract approximate center from path data
    const matches = pathData.match(/\d+/g);
    if (matches && matches.length >= 4) {
      const x = (parseInt(matches[0]) + parseInt(matches[2])) / 2;
      const y = (parseInt(matches[1]) + parseInt(matches[3])) / 2;
      return { x, y };
    }
    return { x: 100, y: 90 };
  };

  return (
    <div className="flex justify-center">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 220 160"
        className="transition-all duration-500"
      />
    </div>
  );
};