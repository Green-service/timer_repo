
import { useState, useEffect } from 'react';
import { Clock, Plus, Timer, Trash2, Edit3, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface TimeEntry {
  id: string;
  taskName: string;
  hours: number;
  timestamp: Date;
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

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setEntries(parsedEntries);
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  }, [entries]);

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

  const addTimeEntry = () => {
    const error = validateInput(taskName, hours);
    if (error) {
      toast.error(error);
      return;
    }

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      taskName: taskName.trim(),
      hours: parseFloat(hours),
      timestamp: new Date()
    };

    setEntries(prev => [newEntry, ...prev]);
    setTaskName('');
    setHours('');
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

  const stopTimer = () => {
    if (timerSeconds > 0 && timerTaskName.trim()) {
      const hoursWorked = parseFloat((timerSeconds / 3600).toFixed(2));
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        taskName: timerTaskName.trim(),
        hours: hoursWorked,
        timestamp: new Date()
      };
      setEntries(prev => [newEntry, ...prev]);
      toast.success(`Timer stopped! Added ${hoursWorked} hours for "${timerTaskName}"`);
    }
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setTimerTaskName('');
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setTimerTaskName('');
    toast.success('Timer reset');
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Time Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Track your time, boost your productivity</p>
        </div>

        {/* Timer Section */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Timer className="w-5 h-5" />
              Live Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold mb-2">
                {formatTime(timerSeconds)}
              </div>
              {isTimerRunning && (
                <div className="text-sm opacity-90">
                  Working on: {timerTaskName}
                </div>
              )}
            </div>
            
            {!isTimerRunning ? (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter task name for timer..."
                  value={timerTaskName}
                  onChange={(e) => setTimerTaskName(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  onKeyPress={(e) => e.key === 'Enter' && startTimer()}
                />
                <Button 
                  onClick={startTimer}
                  className="bg-white/20 hover:bg-white/30 border border-white/30"
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={stopTimer}
                  className="bg-white/20 hover:bg-white/30 border border-white/30"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop & Save
                </Button>
                <Button 
                  onClick={resetTimer}
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Entry Form */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Time Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Enter task name..."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full"
                  onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="0"
                  max="24"
                  step="0.25"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                />
                <Button 
                  onClick={addTimeEntry}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
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
                  {totalHours.toFixed(2)}
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
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Time Entries ({entries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No time entries yet. Start tracking your time!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {editingEntry === entry.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <Input
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={editHours}
                          onChange={(e) => setEditHours(e.target.value)}
                          min="0"
                          max="24"
                          step="0.25"
                          className="w-24"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(entry.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{entry.taskName}</div>
                          <div className="text-sm text-gray-500">
                            {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-lg font-semibold text-blue-600">
                            {entry.hours} hrs
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(entry)}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteEntry(entry.id)}
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
