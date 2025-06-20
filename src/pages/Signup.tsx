
import { useState } from 'react';
import { Eye, EyeOff, UserPlus, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup logic would go here
    console.log('Signup attempt:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-black/40 backdrop-blur-xl border border-purple-400/30 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Join the Future
          </CardTitle>
          <p className="text-gray-400 mt-2">Create your time tracking account</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/5 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/5 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-white/5 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-300">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-white/5 border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {passwordsMatch && (
                  <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-gray-400">Already have an account?</span>
            </div>
          </div>

          <Link to="/login">
            <Button
              variant="outline"
              className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
