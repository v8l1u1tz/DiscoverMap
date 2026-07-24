import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Toggle from "../../../components/ui/Toggle";
import RegisterForm from "./partials/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <Card className="w-full max-w-sm">
        <Toggle
          className="mb-6"
          value="register"
          onChange={(val) => navigate(val === "register" ? "/register" : "/login")}
          options={[
            { label: "Log in", value: "login" },
            { label: "Sign up", value: "register" },
          ]}
        />

        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Create an account</h1>
        <p className="text-stone-500 text-sm mb-6">
          Sign up to start pinning your favorite spots.
        </p>

        <RegisterForm />
      </Card>
    </div>
  );
};

export default RegisterPage;