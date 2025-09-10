import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Server, Zap, Clock } from 'lucide-react';
import { botConfig, anyaQuotes } from '@/lib/botConfig';

export default function AnyaBot() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % anyaQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const backgroundPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: backgroundPattern }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Avatar */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 p-1 shadow-2xl shadow-pink-500/25">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://i.imgur.com/8YzQZ8g.png" 
                      alt="Anya Bot Avatar" 
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://cdn.discordapp.com/embed/avatars/0.png";
                      }}
                    />
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm animate-bounce">
                  🥜
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-sm animate-pulse">
                  🎯
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 bg-clip-text text-transparent font-['Fredoka']">
              Anya Bot
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {botConfig.description}
            </p>

            {/* Dynamic Quote */}
            <div className="mb-10 h-16 flex items-center justify-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-500/20">
                <p className="text-pink-300 font-medium italic transition-all duration-500">
                  "{anyaQuotes[currentQuote]}"
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <a href={botConfig.inviteLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Invite Anya Bot
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-pink-500 text-pink-400 hover:bg-pink-500/10 font-semibold px-8 py-4 rounded-full backdrop-blur-sm"
                asChild
              >
                <a href={botConfig.supportServer} target="_blank" rel="noopener noreferrer">
                  <Users className="w-5 h-5 mr-2" />
                  Join Support Server
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { label: "Servers", value: botConfig.stats.servers, icon: Server },
                { label: "Users", value: botConfig.stats.users, icon: Users },
                { label: "Commands", value: botConfig.stats.commands, icon: Zap },
                { label: "Uptime", value: botConfig.stats.uptime, icon: Clock }
              ].map((stat, index) => (
                <Card key={stat.label} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-slate-800/30 backdrop-blur-sm border-y border-slate-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              ✅ Verified Bot
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              🛡️ Secure & Safe
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              ⚡ Lightning Fast
            </Badge>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              🎯 Always Updated
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}