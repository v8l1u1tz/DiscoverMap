import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Toggle from "../../../components/ui/Toggle";
import LoginForm from "./partials/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <Card className="w-full max-w-sm">
        <Toggle
          className="mb-6"
          value="login"
          onChange={(val) => navigate(val === "register" ? "/register" : "/login")}
          options={[
            { label: "Log in", value: "login" },
            { label: "Sign up", value: "register" },
          ]}
        />

        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Welcome back</h1>
        <p className="text-stone-500 text-sm mb-6">
          Log in to DiscoverMap to manage your pins.
        </p>

        <LoginForm />
      </Card>
    </div>
  );
}