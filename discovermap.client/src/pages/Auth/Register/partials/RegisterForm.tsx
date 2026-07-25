import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import PasswordInput from "../../../../components/ui/PasswordInput";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isPasswordStrong = (pw: string) =>
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim()) {
      setLocalError("Username is required.");
      return;
    }

    if (!isPasswordStrong(password)) {
      setLocalError("Password must be 8+ chars with upper, lower, number, and special character.");
      return;
    }

    const ok = await register({ username, email, password });
    if (ok) navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="lutz"
        autoComplete="username"
      />

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

      {(error || localError) && (
        <p className="text-sm text-red-500">{error ?? localError}</p>
      )}

      <Button type="submit" size="lg" className="w-full" ariaLabel="Sign up">
        {loading ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
}