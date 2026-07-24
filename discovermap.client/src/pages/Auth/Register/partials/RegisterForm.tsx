import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim()) {
      setLocalError("Username is required.");
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

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        placeholder="••••••••"
        autoComplete="new-password"
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