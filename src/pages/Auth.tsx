import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Apple } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import tarboLogo from "@/assets/tarbo-logo.png";

const Auth = () => {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  const { signInWithProvider, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleProviderSignIn = async (provider: "google" | "apple") => {
    setLoadingProvider(provider);

    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        toast.error(error.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 tarbo-shadow">
          <div className="flex flex-col items-center mb-8">
            <img src={tarboLogo} alt="TARBO STYLE" className="h-16 w-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              Sign in with Google or Apple to continue shopping
            </p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleProviderSignIn("google")}
              disabled={loadingProvider !== null}
              className="w-full h-12 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === "google" ? "Please wait..." : "Continue with Google"}
            </button>

            <button
              type="button"
              onClick={() => handleProviderSignIn("apple")}
              disabled={loadingProvider !== null}
              className="w-full h-12 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Apple className="h-5 w-5" />
              {loadingProvider === "apple" ? "Please wait..." : "Continue with Apple"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
