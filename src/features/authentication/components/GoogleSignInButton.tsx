"use client";

import { FC, ReactElement } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import { FormError } from "@/shared/ui/FormError";
import { getAxiosErrorMessage } from "@/shared/utils/error";
import { toast } from "react-toastify";

export const GoogleSignInButton: FC = (): ReactElement => {
  const { googleLogin, isGoogleLoggingIn, googleLoginError } = useAuth();

  const errorMessage = getAxiosErrorMessage(googleLoginError);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <FormError message={errorMessage} />
      <div
        className={`w-full flex justify-center items-center transition-all duration-200 ${
          isGoogleLoggingIn
            ? "opacity-60 pointer-events-none scale-[0.99]"
            : "hover:opacity-95"
        }`}
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              googleLogin(credentialResponse.credential);
            }
          }}
          onError={() => {
            toast.error("Google Login Failed");
          }}
          useOneTap={false}
          theme="outline"
          size="large"
          shape="rectangular"
          width="100%"
          text="continue_with"
          logo_alignment="center"
        />
      </div>
    </div>
  );
};
