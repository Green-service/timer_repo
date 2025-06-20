
import { useState } from 'react';
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-black/40 backdrop-blur-xl border border-cyan-400/30 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <p className="text-gray-400 mt-2">Access your time tracking dashboard</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-300">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-300">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-gray-400">Don't have an account?</span>
            </div>
          </div>

          <Link to="/signup">
            <Button
              variant="outline"
              className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
            >
              Create Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
