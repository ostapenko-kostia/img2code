"use client";

import { Container } from "@/components/shared/Container";
import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";
import { Button } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/store/authStore";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const AuthPage = () => {
  const { login, register, googleRegister } = useAuthStore();

  const handleLogin = (data: FieldValues) => {
    toast.promise(login({ email: data.email, password: data.password }), {
      loading: "Logging in...",
      success: () => {
        setTimeout(() => window.location.reload(), 500);
        return "Logged in successfully!";
      },
      error: (err) => err.message,
    });
  };

  const handleRegister = (data: FieldValues) => {
    toast.promise(
      register({
        email: data.email,
        password: data.password,
      }),
      {
        loading: "Loading...",
        success: "Registered successfully, please log in",
        error: (err) => err.message,
      }
    );
  };

  const handleGoogleRegister = (response: CredentialResponse) => {
    console.log('credential\n_______________\n\n\n', response.credential)
    // toast.promise(googleRegister({ credentials: response.credential ?? "" }), {
    //   loading: "Loading...",
    //   success: () => {
    //     return "Registered in successfully!";
    //   },
    //   error: (err) => err.message,
    // });
  };

  return (
    <section>
      <Container className="pt-12">
        <Tabs
          defaultValue="login"
          className="w-[400px] mx-auto text-center max-xs:w-full bg-neutral-100 pb-5 dark:bg-neutral-900"
        >
          <TabsList className="bg-neutral-200 w-full dark:bg-neutral-900">
            <TabsTrigger className="w-full" value="login">
              Log in
            </TabsTrigger>
            <TabsTrigger className="w-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm handleLogin={handleLogin} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm handleRegister={handleRegister} />
          </TabsContent>
          <div className="w-full flex flex-col gap-4 items-center justify-center mt-4 bg-neutral-100 dark:bg-neutral-900">
            <div className="relative w-full mb-4 bg-neutral-100 dark:bg-neutral-900">
              <hr className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-900" />
              <p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-100 px-5 text-lg font-medium dark:bg-neutral-900">
                or
              </p>
            </div>
            <div className="flex w-full gap-5 items-center justify-center">
              <div className="overflow-hidden w-[38px] aspect-square rounded-full flex items-center justify-center">
                <GoogleLogin
                  containerProps={{ className: "[]:bg-transparent" }}
                  shape="circle"
                  type="icon"
                  onSuccess={handleGoogleRegister}
                  onError={() => toast.error("error")}
                />
              </div>
              <a
                href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${
                  process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? ""
                }`}
              >
                <Button
                  variant="outline"
                  className="aspect-square rounded-full w-[38px] p-0 dark:bg-white"
                >
                  <Image
                    src="/static/images/github.png"
                    alt="Github"
                    width={18}
                    height={18}
                  />
                </Button>
              </a>
            </div>
          </div>
        </Tabs>
      </Container>
    </section>
  );
};

export default AuthPage;
