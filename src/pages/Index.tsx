import AnyaBot from '@/components/AnyaBot';
import FeaturesGrid from '@/components/FeaturesGrid';
import CommandsSection from '@/components/CommandsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Github, MessageCircle, Star } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Main Hero Section */}
      <AnyaBot />
      
      {/* Features Section */}
      <FeaturesGrid />
      
      {/* Commands Section */}
      <CommandsSection />
      
      {/* Gallery Section - Placeholder for User Images */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-['Fredoka']">
              Bot in Action
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              See Anya Bot working her magic in Discord servers around the world!
            </p>
          </div>
          
          {/* Image Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Quest System in Action",
                description: "Members completing daily quests and earning rewards",
                placeholder: "🎯"
              },
              {
                title: "Poketwo Helper",
                description: "Automatic Pokemon identification and stats",
                placeholder: "🔍"
              },
              {
                title: "Fun Commands",
                description: "Server members enjoying interactive commands",
                placeholder: "🎮"
              },
              {
                title: "Music Features",
                description: "High-quality music streaming in voice channels",
                placeholder: "🎵"
              },
              {
                title: "Moderation Tools",
                description: "Clean and organized server management",
                placeholder: "🛡️"
              },
              {
                title: "Mini Games",
                description: "Community playing trivia and word games",
                placeholder: "🎲"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm group hover:border-pink-500/50 transition-all duration-300">
                <CardContent className="p-0">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <div className="text-center">
                      <div className="mb-2">{item.placeholder}</div>
                      <div className="text-sm text-slate-400 font-medium">Your Screenshot Here</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-500/20">
              <span className="text-pink-300">📸</span>
              <span className="text-slate-300">Replace these placeholders with your own bot screenshots!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Spy x Family Art Section */}
      <div className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-['Fredoka']">
              Spy x Family Gallery
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Beautiful artwork featuring Anya and the Forger family to inspire your server's theme!
            </p>
          </div>
          
          {/* Art Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                src: "https://i.imgur.com/8YzQZ8g.png",
                alt: "Anya Forger - Main Character",
                title: "Anya Forger"
              },
              {
                src: "https://i.imgur.com/rN8vK2L.png",
                alt: "Spy x Family - Family Portrait",
                title: "Forger Family"
              },
              {
                src: "https://i.imgur.com/mH3pX9Q.png",
                alt: "Anya with Peanuts",
                title: "Anya's Favorite Snack"
              },
              {
                src: "https://i.imgur.com/tL6wR4S.png",
                alt: "Anya School Uniform",
                title: "Eden Academy Student"
              },
              {
                src: "https://i.imgur.com/vB9nM8P.png",
                alt: "Anya Excited Expression",
                title: "Waku Waku!"
              },
              {
                src: "https://i.imgur.com/kR7sT5N.png",
                alt: "Bond and Anya",
                title: "Best Friends"
              },
              {
                src: "https://i.imgur.com/qP4uV2M.png",
                alt: "Anya Reading Minds",
                title: "Telepathic Powers"
              },
              {
                src: "https://i.imgur.com/wX8yZ3L.png",
                alt: "Anya Chibi Style",
                title: "Chibi Anya"
              }
            ].map((image, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm group hover:border-pink-500/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/300x300/ec4899/ffffff?text=${encodeURIComponent(image.title)}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium text-center">{image.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-500/20">
              <span className="text-pink-300">🎨</span>
              <span className="text-slate-300">High-quality Spy x Family artwork for your server themes!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Fredoka']">Anya Bot</h3>
            </div>
            
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Bringing the joy and excitement of Spy x Family to Discord servers worldwide. 
              Join thousands of communities already enjoying Anya's amazing features!
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-pink-400">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-pink-400">
                <MessageCircle className="w-5 h-5 mr-2" />
                Support
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-pink-400">
                <Star className="w-5 h-5 mr-2" />
                Rate Us
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-400" />
              <span>for the Spy x Family community</span>
            </div>
            
            <div className="mt-4 text-sm text-slate-500">
              © 2025 Anya Bot. All rights reserved. • Not affiliated with Spy x Family official.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}