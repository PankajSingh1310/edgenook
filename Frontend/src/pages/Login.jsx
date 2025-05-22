// src/pages/Login.jsx
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import userContext from "@/context/user.context";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, setToken } = useContext(userContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.email.trim() || !formData.password) {
      setError("Please enter both email and password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/user/login", formData);
      if (response.status === 200) {
        const { user, token } = response.data;
        setUserData(user);
        setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-blue-600">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-center text-sm text-destructive">{error}</p>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
