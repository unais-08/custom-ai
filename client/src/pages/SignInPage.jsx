import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
