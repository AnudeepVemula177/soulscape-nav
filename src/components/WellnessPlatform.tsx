import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Heart, Brain, Activity, TrendingUp, Calendar, MessageCircle, Lightbulb, Target, Award, Smile, Meh, Frown, Users, CheckCircle, Plus, X, Clock, Phone, Video, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WellnessPlatform = () => {
  const [currentView, setCurrentView] = useState('checkin');
  const [moodData, setMoodData] = useState([]);
  const [todayMood, setTodayMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  
  const [wellnessGoals, setWellnessGoals] = useState([
    { id: 1, title: 'Daily Meditation', target: 7, current: 3, type: 'weekly', completed: false },
    { id: 2, title: 'Exercise 30 minutes', target: 3, current: 2, type: 'weekly', completed: false },
    { id: 3, title: 'Sleep 8 hours', target: 1, current: 0, type: 'daily', completed: false },
    { id: 4, title: 'Connect with friends', target: 2, current: 1, type: 'weekly', completed: false }
  ]);
  const [newGoal, setNewGoal] = useState({ title: '', target: 1, type: 'weekly' });
  const [showGoalForm, setShowGoalForm] = useState(false);
  
  const [peerConnections, setPeerConnections] = useState([
    { id: 1, name: 'Alex Chen', status: 'online', mood: 7, lastActive: '5 min ago', avatar: '👤', commonInterests: ['Study Groups', 'Mindfulness'] },
    { id: 2, name: 'Sarah Johnson', status: 'away', mood: 6, lastActive: '1 hour ago', avatar: '👤', commonInterests: ['Exercise', 'Academic Support'] },
    { id: 3, name: 'Marcus Williams', status: 'online', mood: 8, lastActive: 'now', avatar: '👤', commonInterests: ['Social Activities', 'Mental Health'] }
  ]);
  
  const [counselingServices, setCounselingServices] = useState([
    { 
      id: 1, 
      name: 'Dr. Emily Rodriguez', 
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      availability: 'Next: Tomorrow 2:00 PM',
      rating: 4.9,
      location: 'Student Health Center - Room 204',
      contactMethod: 'video'
    },
    { 
      id: 2, 
      name: 'James Thompson', 
      title: 'Mental Health Counselor',
      specialties: ['Relationship Issues', 'Self-Esteem', 'Life Transitions'],
      availability: 'Next: Today 4:30 PM',
      rating: 4.8,
      location: 'Wellness Center - Ground Floor',
      contactMethod: 'in-person'
    },
    { 
      id: 3, 
      name: 'Dr. Priya Patel', 
      title: 'Psychiatrist',
      specialties: ['Medication Management', 'Bipolar Disorder', 'ADHD'],
      availability: 'Next: Friday 10:00 AM',
      rating: 4.9,
      location: 'Medical Center - Suite 301',
      contactMethod: 'phone'
    }
  ]);
  
  const [supportGroups, setSupportGroups] = useState([
    {
      id: 1,
      name: 'Mindful Students Circle',
      description: 'Weekly meditation and mindfulness practice group',
      members: 12,
      nextMeeting: 'Wednesday 7:00 PM',
      location: 'Library Study Room A',
      tags: ['Mindfulness', 'Stress Relief', 'Beginner-Friendly']
    },
    {
      id: 2,
      name: 'Academic Success Support',
      description: 'Peer support for managing academic pressure and study strategies',
      members: 18,
      nextMeeting: 'Thursday 6:00 PM',
      location: 'Student Union Room 205',
      tags: ['Study Skills', 'Time Management', 'Academic Stress']
    },
    {
      id: 3,
      name: 'International Student Wellness',
      description: 'Support group for international students navigating campus life',
      members: 8,
      nextMeeting: 'Friday 5:30 PM',
      location: 'International Student Center',
      tags: ['Cultural Adjustment', 'Homesickness', 'Social Connection']
    }
  ]);

  // Sample historical data
  const [historicalData] = useState([
    { date: '2025-09-07', mood: 7, stress: 4, energy: 6, sleep: 8, social: 5 },
    { date: '2025-09-08', mood: 6, stress: 6, energy: 5, sleep: 6, social: 7 },
    { date: '2025-09-09', mood: 8, stress: 3, energy: 8, sleep: 7, social: 8 },
    { date: '2025-09-10', mood: 5, stress: 7, energy: 4, sleep: 5, social: 4 },
    { date: '2025-09-11', mood: 7, stress: 5, energy: 7, sleep: 8, social: 6 },
    { date: '2025-09-12', mood: 6, stress: 6, energy: 6, sleep: 6, social: 7 },
    { date: '2025-09-13', mood: todayMood || 0, stress: 5, energy: 6, sleep: 7, social: 6 }
  ]);

  const wellnessFactors = [
    'Academic stress', 'Sleep quality', 'Social connections', 'Physical activity',
    'Nutrition', 'Financial concerns', 'Family relationships', 'Work-life balance'
  ];

  const moodOptions = [
    { value: 1, label: 'Very Low', icon: Frown, color: 'text-mood-critical', bg: 'bg-red-50' },
    { value: 2, label: 'Low', icon: Frown, color: 'text-mood-critical', bg: 'bg-red-50' },
    { value: 3, label: 'Below Average', icon: Meh, color: 'text-mood-poor', bg: 'bg-orange-50' },
    { value: 4, label: 'Fair', icon: Meh, color: 'text-mood-fair', bg: 'bg-yellow-50' },
    { value: 5, label: 'Average', icon: Meh, color: 'text-mood-fair', bg: 'bg-yellow-50' },
    { value: 6, label: 'Good', icon: Smile, color: 'text-mood-good', bg: 'bg-wellness-green-soft' },
    { value: 7, label: 'Very Good', icon: Smile, color: 'text-mood-good', bg: 'bg-wellness-green-soft' },
    { value: 8, label: 'Great', icon: Smile, color: 'text-mood-good', bg: 'bg-wellness-green-soft' },
    { value: 9, label: 'Excellent', icon: Smile, color: 'text-mood-excellent', bg: 'bg-wellness-purple-soft' },
    { value: 10, label: 'Outstanding', icon: Smile, color: 'text-mood-excellent', bg: 'bg-wellness-purple-soft' }
  ];

  // AI-powered sentiment analysis simulation
  const analyzeSentiment = (text) => {
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'love', 'excited', 'confident'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'horrible', 'hate', 'worried', 'anxious', 'stressed', 'depressed'];
    
    const words = text.toLowerCase().split(' ');
    let sentiment = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) sentiment += 1;
      if (negativeWords.includes(word)) sentiment -= 1;
    });
    
    return sentiment;
  };

  // Generate personalized recommendations
  const generateRecommendations = (mood, factors, sentiment) => {
    const recs = [];
    
    if (mood < 5) {
      recs.push({
        type: 'immediate',
        title: 'Immediate Support',
        description: 'Consider reaching out to a counselor or trusted friend',
        icon: Heart,
        action: 'Get Support'
      });
    }
    
    if (factors.includes('Academic stress')) {
      recs.push({
        type: 'academic',
        title: 'Study Techniques',
        description: 'Try the Pomodoro technique for better focus',
        icon: Brain,
        action: 'Learn More'
      });
    }
    
    if (factors.includes('Sleep quality')) {
      recs.push({
        type: 'lifestyle',
        title: 'Sleep Hygiene',
        description: 'Establish a consistent bedtime routine',
        icon: Activity,
        action: 'View Tips'
      });
    }
    
    if (sentiment < 0) {
      recs.push({
        type: 'mindfulness',
        title: 'Mindfulness Exercise',
        description: '5-minute breathing meditation to reduce stress',
        icon: Target,
        action: 'Start Now'
      });
    }
    
    // Always include a positive reinforcement
    recs.push({
      type: 'motivation',
      title: 'Daily Affirmation',
      description: 'You are capable of handling whatever comes your way today',
      icon: Award,
      action: 'Save'
    });
    
    return recs;
  };

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        type: newGoal.type,
        completed: false
      };
      setWellnessGoals([...wellnessGoals, goal]);
      setNewGoal({ title: '', target: 1, type: 'weekly' });
      setShowGoalForm(false);
    }
  };

  const updateGoalProgress = (id, increment = true) => {
    setWellnessGoals(goals => 
      goals.map(goal => {
        if (goal.id === id) {
          const newCurrent = increment 
            ? Math.min(goal.current + 1, goal.target)
            : Math.max(goal.current - 1, 0);
          return {
            ...goal,
            current: newCurrent,
            completed: newCurrent >= goal.target
          };
        }
        return goal;
      })
    );
  };

  const connectWithPeer = (peerId) => {
    alert('Connection request sent! They will be notified and can choose to connect.');
  };

  const bookCounseling = (counselorId) => {
    const counselor = counselingServices.find(c => c.id === counselorId);
    alert(`Booking appointment with ${counselor.name}. You will receive a confirmation email shortly.`);
  };

  const joinSupportGroup = (groupId) => {
    const group = supportGroups.find(g => g.id === groupId);
    alert(`You've requested to join "${group.name}". Group moderator will review your request.`);
  };

  const handleMoodSubmit = () => {
    const sentiment = analyzeSentiment(journalEntry);
    const newRecommendations = generateRecommendations(todayMood, selectedFactors, sentiment);
    setRecommendations(newRecommendations);
    setCurrentView('recommendations');
  };

  const radarData = [
    { subject: 'Mood', A: historicalData[historicalData.length - 1]?.mood || 0, fullMark: 10 },
    { subject: 'Energy', A: historicalData[historicalData.length - 1]?.energy || 0, fullMark: 10 },
    { subject: 'Sleep', A: historicalData[historicalData.length - 1]?.sleep || 0, fullMark: 10 },
    { subject: 'Social', A: historicalData[historicalData.length - 1]?.social || 0, fullMark: 10 },
    { subject: 'Stress', A: 10 - (historicalData[historicalData.length - 1]?.stress || 0), fullMark: 10 }
  ];

  const CheckInView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Daily Wellness Check-In</h2>
        <p className="text-muted-foreground">How are you feeling today? Your honest response helps us provide better support.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smile className="mr-2 text-primary" />
            Overall Mood Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {moodOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={todayMood === option.value ? "default" : "outline"}
                  onClick={() => setTodayMood(option.value)}
                  className={`p-4 h-auto flex flex-col space-y-2 ${option.bg}`}
                >
                  <Icon className={option.color} size={24} />
                  <div className="text-sm font-medium">{option.value}</div>
                  <div className="text-xs">{option.label}</div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2 text-wellness-green" />
            Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind? (This helps our AI provide better recommendations)"
            className="h-32 resize-none"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 text-wellness-purple" />
            Factors Affecting Your Wellness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {wellnessFactors.map((factor) => (
              <Button
                key={factor}
                variant={selectedFactors.includes(factor) ? "default" : "outline"}
                onClick={() => {
                  setSelectedFactors(prev => 
                    prev.includes(factor)
                      ? prev.filter(f => f !== factor)
                      : [...prev, factor]
                  );
                }}
                className="h-auto p-3 text-sm"
              >
                {factor}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleMoodSubmit}
        disabled={!todayMood}
        variant="wellness"
        className="w-full py-6 text-lg font-semibold disabled:opacity-50"
        size="lg"
      >
        Complete Check-In & Get Recommendations
      </Button>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Wellness Dashboard</h2>
        <p className="text-muted-foreground">Track your mental health journey and identify patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Current Mood</p>
                <p className="text-3xl font-bold text-primary">{historicalData[historicalData.length - 1]?.mood || 0}/10</p>
              </div>
              <Heart className="text-primary" size={32} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg This Week</p>
                <p className="text-3xl font-bold text-wellness-green">6.7/10</p>
              </div>
              <TrendingUp className="text-wellness-green" size={32} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Check-ins</p>
                <p className="text-3xl font-bold text-wellness-purple">7</p>
              </div>
              <Calendar className="text-wellness-purple" size={32} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Streak</p>
                <p className="text-3xl font-bold text-wellness-orange">7 days</p>
              </div>
              <Award className="text-wellness-orange" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Mood Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={3} />
                <Line type="monotone" dataKey="energy" stroke="hsl(var(--wellness-green))" strokeWidth={2} />
                <Line type="monotone" dataKey="sleep" stroke="hsl(var(--wellness-purple))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                <Radar name="Current" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Stress Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="stress" fill="hsl(var(--mood-critical))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const RecommendationsView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Personalized Wellness Recommendations</h2>
        <p className="text-muted-foreground">Based on your check-in, here are tailored suggestions to support your wellbeing</p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-soft">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                    <Button variant="wellness">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-wellness-green-soft border-wellness-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-wellness-green mb-2">Crisis Support</h3>
          <p className="text-wellness-green mb-4">If you're experiencing a mental health crisis, immediate help is available:</p>
          <div className="space-y-2 text-sm">
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>Campus Counseling:</strong> Available 24/7 at your student health center</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const GoalsView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Wellness Goals</h2>
        <p className="text-muted-foreground">Set and track personal wellness goals to build healthy habits</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="mr-2 text-wellness-green" />
              Active Goals
            </CardTitle>
            <Button
              onClick={() => setShowGoalForm(!showGoalForm)}
              variant="wellness"
            >
              <Plus size={16} className="mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showGoalForm && (
            <Card className="mb-6 bg-muted">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder="Goal title (e.g., Daily meditation)"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Target"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value)})}
                    min="1"
                  />
                  <Select
                    value={newGoal.type}
                    onValueChange={(value) => setNewGoal({...newGoal, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addGoal} variant="wellness-green">
                    Add Goal
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowGoalForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {wellnessGoals.map(goal => (
              <Card key={goal.id} className={goal.completed ? 'border-wellness-green bg-wellness-green-soft' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center">
                        {goal.title}
                        {goal.completed && <CheckCircle className="ml-2 text-wellness-green" size={20} />}
                      </h4>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${goal.completed ? 'bg-wellness-green' : 'bg-primary'}`}
                            style={{width: `${(goal.current / goal.target) * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {goal.current}/{goal.target} ({goal.type})
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateGoalProgress(goal.id, false)}
                        disabled={goal.current === 0}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        variant="wellness-green"
                        onClick={() => updateGoalProgress(goal.id, true)}
                        disabled={goal.completed}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 text-wellness-orange" />
            Goal Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-wellness-green mb-2">
                {wellnessGoals.filter(g => g.completed).length}
              </div>
              <div className="text-muted-foreground">Goals Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round((wellnessGoals.reduce((acc, goal) => acc + (goal.current / goal.target), 0) / wellnessGoals.length) * 100)}%
              </div>
              <div className="text-muted-foreground">Average Progress</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wellness-purple mb-2">
                {wellnessGoals.filter(g => g.current > 0).length}
              </div>
              <div className="text-muted-foreground">Active Goals</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Heart className="text-primary" size={28} />
              <span className="text-xl font-bold text-foreground">WellnessTracker</span>
            </div>
            <div className="flex space-x-1">
              {[
                { id: 'checkin', label: 'Check-In', icon: MessageCircle },
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'goals', label: 'Goals', icon: Target },
                { id: 'recommendations', label: 'Tips', icon: Lightbulb },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={currentView === id ? "default" : "ghost"}
                  onClick={() => setCurrentView(id)}
                  className="flex items-center space-x-2"
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'checkin' && <CheckInView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'goals' && <GoalsView />}
        {currentView === 'recommendations' && <RecommendationsView />}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Your mental health matters. This platform provides support tools but does not replace professional help.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            If you're in crisis, please contact emergency services or call 988 for immediate support.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WellnessPlatform;