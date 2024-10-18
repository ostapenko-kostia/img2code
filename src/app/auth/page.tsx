"use client";

import { Container } from "@/components/shared/Container";
import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const AuthPage = () => {
  const { login, register } = useAuthStore();
  const { push } = useRouter();

  const handleLogin = (data: FieldValues) => {
    toast.promise(login({ email: data.email, password: data.password }), {
      loading: "Logging in...",
      success: () => {
        push("/");
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

  return (
    <section>
      <Container className="pt-12">
        <Tabs
          defaultValue="login"
          className="w-[400px] mx-auto text-center max-xs:w-full"
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
        </Tabs>
      </Container>
    </section>
  );
};

export default AuthPage;
