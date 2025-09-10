import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { commandCategories, prefix } from '@/lib/commands';
import { Code2, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function CommandsSection() {
  const [selectedCategory, setSelectedCategory] = useState(commandCategories[0].name);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(`${prefix}${command}`);
      setCopiedCommand(command);
      toast.success('Command copied to clipboard!');
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      toast.error('Failed to copy command');
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-['Fredoka']">
            Command Library
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore Anya's extensive command collection. Click on any command to copy it instantly!
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-500/20">
            <Code2 className="w-4 h-4 text-pink-400" />
            <span className="text-slate-300">Prefix: <code className="text-pink-400 font-mono">{prefix}</code></span>
          </div>
        </div>

        {/* Commands Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700">
              {commandCategories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Command Content */}
            {commandCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="space-y-6">
                {/* Category Description */}
                <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{category.name}</CardTitle>
                        <CardDescription className="text-slate-300 text-base">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Commands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.commands.map((command, index) => (
                    <Card 
                      key={index}
                      className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/10"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg text-white font-mono">
                                {prefix}{command.name}
                              </CardTitle>
                              {command.permissions && (
                                <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-400">
                                  {command.permissions}
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-slate-300">
                              {command.description}
                            </CardDescription>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyCommand(command.usage.replace(prefix, ''))}
                            className="ml-2 hover:bg-pink-500/20 hover:text-pink-300 transition-colors"
                          >
                            {copiedCommand === command.usage.replace(prefix, '') ? (
                              <span className="text-green-400">✓</span>
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {/* Usage */}
                        <div className="mb-3">
                          <p className="text-sm text-slate-400 mb-1">Usage:</p>
                          <code className="text-pink-300 bg-slate-900/50 px-2 py-1 rounded text-sm font-mono">
                            {command.usage}
                          </code>
                        </div>

                        {/* Examples */}
                        {command.examples.length > 0 && (
                          <div>
                            <p className="text-sm text-slate-400 mb-2">Examples:</p>
                            <div className="space-y-1">
                              {command.examples.slice(0, 2).map((example, exIndex) => (
                                <div 
                                  key={exIndex}
                                  className="text-sm font-mono bg-slate-900/30 px-2 py-1 rounded cursor-pointer hover:bg-slate-900/50 transition-colors"
                                  onClick={() => copyCommand(example.replace(prefix, ''))}
                                >
                                  <span className="text-slate-500">{prefix}</span>
                                  <span className="text-cyan-300">{example.replace(prefix, '')}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cooldown */}
                        {command.cooldown && (
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                              Cooldown: {command.cooldown}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-slate-300 mb-4">
                Join our support server for assistance and to stay updated with new commands!
              </p>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Support Server
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}