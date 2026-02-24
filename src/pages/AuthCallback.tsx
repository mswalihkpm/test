import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOAuth = async () => {
      const url = new URL(window.location.href);
      const errorDescription = url.searchParams.get("error_description");

      if (errorDescription) {
        toast.error(decodeURIComponent(errorDescription));
        navigate("/auth", { replace: true });
        return;
      }

      const { error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message);
        navigate("/auth", { replace: true });
        return;
      }

      toast.success("Signed in successfully");
      navigate("/", { replace: true });
    };

    completeOAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      Completing sign in...
    </div>
  );
};

export default AuthCallback;
