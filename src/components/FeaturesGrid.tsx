import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { botConfig } from '@/lib/botConfig';
import { useState } from 'react';

export default function FeaturesGrid() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-['Fredoka']">
            Amazing Features
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover all the incredible things Anya Bot can do for your Discord server. From fun interactions to powerful moderation tools!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {botConfig.features.map((feature, index) => (
            <Card 
              key={index}
              className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                hoveredFeature === index ? 'border-pink-500/50 shadow-pink-500/20' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-4xl p-3 rounded-full bg-gradient-to-br ${feature.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-pink-500/20 text-pink-400 border-pink-500/30"
                  >
                    Popular
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
                
                {/* Hover Effect - Additional Info */}
                <div className={`mt-4 transition-all duration-300 ${
                  hoveredFeature === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  <div className="pt-2 border-t border-slate-600">
                    <p className="text-sm text-pink-300 font-medium">
                      ✨ Ready to use • No setup required
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-500/20">
            <span className="text-pink-300">🎉</span>
            <span className="text-slate-300">And many more features coming soon!</span>
            <span className="text-pink-300">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}