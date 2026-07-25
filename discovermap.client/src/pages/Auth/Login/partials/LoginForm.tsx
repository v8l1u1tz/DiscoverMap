import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import PasswordInput from "../../../../components/ui/PasswordInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await login({ email, password });
    if (ok) navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
        autoComplete="email"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        placeholder="••••••••"
        autoComplete="current-password"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" className="w-full" ariaLabel="Log in">
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}