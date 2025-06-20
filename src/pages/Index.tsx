import { useState, useEffect } from 'react';
import { Plus, Timer, Trash2, Edit3, Play, Pause, RotateCcw, AlarmClock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TimeEntry {
  id: string;
  taskName: string;
  hours: number;
  timestamp: Date;
  seconds?: number;
}

const Index = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState('');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editHours, setEditHours] = useState('');
  
  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerTaskName, setTimerTaskName] = useState('');
  const [isTimerLoading, setIsTimerLoading] = useState(false);

  const [isAddLoading, setIsAddLoading] = useState(false);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);

  // Load entries and timer state from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setEntries(parsedEntries);
    }
    // Load timer state
    const savedTimer = localStorage.getItem('timerState');
    if (savedTimer) {
      const { isRunning, seconds } = JSON.parse(savedTimer);
      setIsTimerRunning(isRunning);
      setTimerSeconds(seconds);
      setTimerTaskName(''); // Always reset task name on refresh
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  }, [entries]);

  // Save timer state to localStorage whenever timer changes
  useEffect(() => {
    localStorage.setItem('timerState', JSON.stringify({
      isRunning: isTimerRunning,
      seconds: timerSeconds
    }));
  }, [isTimerRunning, timerSeconds]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const validateInput = (name: string, hoursValue: string): string | null => {
    if (!name.trim()) {
      return 'Task name cannot be empty';
    }
    if (!hoursValue.trim()) {
      return 'Hours cannot be empty';
    }
    const hoursNum = parseFloat(hoursValue);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      return 'Hours must be a positive number';
    }
    if (hoursNum > 24) {
      return 'Hours cannot exceed 24 in a single entry';
    }
    return null;
  };

  const addTimeEntry = async () => {
    const error = validateInput(taskName, hours);
    if (error) {
      toast.error(error);
      return;
    }
    setIsAddLoading(true);
    await new Promise(res => setTimeout(res, 1000)); // Simulate loading
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      taskName: taskName.trim(),
      hours: parseFloat(hours),
      timestamp: new Date()
    };
    setEntries(prev => [newEntry, ...prev]);
    setTaskName('');
    setHours('');
    setIsAddLoading(false);
    toast.success('Time entry added successfully!');
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success('Time entry deleted');
  };

  const startEdit = (entry: TimeEntry) => {
    setEditingEntry(entry.id);
    setEditTaskName(entry.taskName);
    setEditHours(entry.hours.toString());
  };

  const saveEdit = (id: string) => {
    const error = validateInput(editTaskName, editHours);
    if (error) {
      toast.error(error);
      return;
    }

    setEntries(prev => prev.map(entry => 
      entry.id === id 
        ? { ...entry, taskName: editTaskName.trim(), hours: parseFloat(editHours) }
        : entry
    ));
    setEditingEntry(null);
    setEditTaskName('');
    setEditHours('');
    toast.success('Time entry updated successfully!');
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setEditTaskName('');
    setEditHours('');
  };

  const startTimer = () => {
    if (!timerTaskName.trim()) {
      toast.error('Please enter a task name for the timer');
      return;
    }
    setIsTimerRunning(true);
    toast.success('Timer started!');
  };

  const stopTimer = async () => {
    if (timerSeconds > 0 && timerTaskName.trim()) {
      setIsTimerLoading(true);
      await new Promise(res => setTimeout(res, 1000)); // Simulate loading
      const hoursWorked = parseFloat((timerSeconds / 3600).toFixed(2));
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        taskName: timerTaskName.trim(),
        hours: hoursWorked,
        timestamp: new Date(),
        seconds: timerSeconds,
      };
      setEntries(prev => [newEntry, ...prev]);
      setIsTimerLoading(false);
      toast.success('Timer saved!');
    }
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setTimerTaskName('');
  };

  const resetTimer = async () => {
    setIsResetLoading(true);
    await new Promise(res => setTimeout(res, 1000)); // Simulate loading
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setTimerTaskName('');
    setIsResetLoading(false);
    toast.success('Timer reset');
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  };

  // Calculate total hours using seconds if available
  const totalSeconds = entries.reduce((sum, entry) => sum + (entry.seconds !== undefined ? entry.seconds : entry.hours * 3600), 0);
  const totalHours = totalSeconds / 3600;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Futuristic animated background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[40vw] h-[40vw] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-700/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-0 right-0 w-[20vw] h-[20vw] bg-blue-700/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <AlarmClock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Time Tracker
            </h1>
          </div>
          <p className="text-white text-lg">Track your time, boost your productivity</p>
        </div>

        {/* Timer Section */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 text-white relative overflow-visible">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
              <Timer className="w-6 h-6 animate-pulse text-cyan-400" />
              <span className="text-2xl tracking-widest font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent uppercase">Live Timer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* Futuristic Big Watch Timer */}
            <div className="relative flex items-center justify-center w-64 h-64 mb-2">
              {/* Outer animated glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-400 blur-2xl opacity-60 animate-pulse"></div>
              {/* Main circular container */}
              <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-slate-900 via-blue-950 to-purple-900 shadow-2xl flex flex-col items-center justify-center border-4 border-cyan-400/30">
                {/* Inner glow */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-md"></div>
                {/* Timer Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-6xl font-mono font-extrabold text-cyan-200 drop-shadow-xl tracking-widest select-none cursor-pointer">
                {formatTime(timerSeconds)}
              </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        Live timer: tracking your task
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {/* Futuristic ticks */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-6 bg-cyan-400/30 rounded-full"
                      style={{
                        transform: `rotate(${i * 30}deg) translateY(-110px)`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Working on text below the circle (dynamic) */}
            {isTimerRunning && timerTaskName.trim() && (
              <div className="text-base text-cyan-300/90 font-medium tracking-wide animate-pulse mb-2">
                Working on: <span className="font-bold text-white">{timerTaskName}</span>
              </div>
            )}
            {/* Timer Controls & Input */}
            <div className="w-full flex flex-col items-center gap-4">
            {!isTimerRunning ? (
                <div className="flex gap-2 w-full max-w-md">
                <Input
                  placeholder="Enter task name for timer..."
                  value={timerTaskName}
                  onChange={(e) => setTimerTaskName(e.target.value)}
                    className="flex-1 bg-white/10 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-300/60 focus:ring-cyan-400/30 focus:border-cyan-400/50 shadow-inner backdrop-blur-md"
                  onKeyPress={(e) => e.key === 'Enter' && startTimer()}
                />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                <Button 
                  onClick={startTimer}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 shadow-lg text-white px-6 py-2 text-lg font-bold rounded-full transition-all duration-200"
                >
                          <Play className="w-6 h-6" />
                </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        Start timer for this task
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </div>
            ) : (
                <div className="flex gap-4 justify-center">
                <Button 
                  onClick={stopTimer}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-0 shadow-lg text-white px-6 py-2 text-lg font-bold rounded-full flex items-center gap-2 transition-all duration-200"
                    disabled={isTimerLoading}
                  >
                    {isTimerLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    ) : (
                      <Pause className="w-5 h-5" />
                    )}
                  Stop & Save
                </Button>
                <Button 
                  onClick={resetTimer}
                  variant="outline"
                    className="bg-gradient-to-r from-slate-800 to-blue-900 border-cyan-400/30 text-cyan-200 hover:bg-blue-900/80 hover:text-white shadow-md px-4 py-2 rounded-full flex items-center gap-2"
                    disabled={isResetLoading}
                  >
                    {isResetLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    ) : (
                      <RotateCcw className="w-5 h-5" />
                    )}
                </Button>
              </div>
            )}
            </div>
          </CardContent>
        </Card>

        {/* Manual Entry Form */}
        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 text-white relative overflow-visible">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white drop-shadow-lg">
              <span className="p-2 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-400 animate-pulse">
                <Plus className="w-6 h-6 text-white" />
              </span>
              <span className="text-2xl tracking-widest font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent uppercase">Add Time Entry</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <Input
                  placeholder="Enter task name..."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full bg-white/10 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-300/60 focus:ring-cyan-400/30 focus:border-cyan-400/50 shadow-inner backdrop-blur-md py-3 px-4 rounded-xl text-lg transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="0"
                  max="24"
                  step="0.25"
                  className="flex-1 bg-white/10 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-300/60 focus:ring-cyan-400/30 focus:border-cyan-400/50 shadow-inner backdrop-blur-md py-3 px-4 rounded-xl text-lg transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                <Button 
                  onClick={addTimeEntry}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 shadow-lg text-white px-6 py-3 text-lg font-bold rounded-full transition-all duration-200 flex items-center justify-center"
                        disabled={isAddLoading}
                      >
                        {isAddLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      Add a new time entry
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Futuristic Circular Stats */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 p-1 animate-pulse">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
            </div>
            
            {/* Main circular container */}
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 shadow-2xl flex flex-col items-center justify-center border border-blue-400/30">
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-4xl font-bold text-white mb-1 font-mono drop-shadow-lg">
                  {totalHours.toFixed(1)}
                </div>
                <div className="text-sm text-cyan-200 font-medium tracking-wider uppercase">
                  Hours
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  Total Tracked
                </div>
              </div>
            </div>
            
            {/* Horizontal line */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Time Entries List */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="text-xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Time Entries ({entries.length})
              </div>
              {entries.length > 3 && (
                <Button
                  size="sm"
                  variant={showAllEntries ? "default" : "outline"}
                  className={showAllEntries ? "ml-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full px-4 py-2 flex items-center gap-2 shadow-lg" : "ml-4 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 font-bold rounded-full px-4 py-2 flex items-center gap-2"}
                  onClick={() => setShowAllEntries((v) => !v)}
                >
                  {showAllEntries ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAllEntries ? 'Show Less' : 'View All'}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <AlarmClock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No time entries yet. Start tracking your time!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(showAllEntries ? entries : entries.slice(0, 3)).map((entry, idx) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-500 border border-cyan-400/20 hover:border-cyan-400/40 backdrop-blur-sm
                      ${showAllEntries ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                    `}
                    style={{
                      transitionDelay: showAllEntries ? `${idx * 80}ms` : '0ms',
                      opacity: 1,
                      transform: showAllEntries ? 'translateY(0)' : 'translateY(16px)',
                    }}
                  >
                    {editingEntry === entry.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <Input
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          className="flex-1 bg-white/10 border-cyan-400/30 text-white placeholder:text-gray-300"
                        />
                        <Input
                          type="number"
                          value={editHours}
                          onChange={(e) => setEditHours(e.target.value)}
                          min="0"
                          max="24"
                          step="0.25"
                          className="w-24 bg-white/10 border-cyan-400/30 text-white"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(entry.id)}
                            className="bg-green-500/80 hover:bg-green-600/80 backdrop-blur-sm"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                            className="border-gray-400/30 text-gray-300 hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="font-medium text-white text-lg">{entry.taskName}</div>
                          <div className="text-sm text-cyan-200/80 font-mono">
                            {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-cyan-400 font-mono">
                            {entry.seconds !== undefined ? formatTime(entry.seconds) : `${entry.hours} hrs`}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(entry)}
                              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteEntry(entry.id)}
                              className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
