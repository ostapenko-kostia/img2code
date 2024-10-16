"use client";

import { Container } from "@/components/shared/Container";
import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldValues } from "react-hook-form";

const AuthPage = () => {
  const handleLogin = (data: FieldValues) => console.log(data);
  const handleRegister = (data: FieldValues) => console.log(data);

  return (
    <section>
      <Container className="pt-12">
        <Tabs defaultValue="login" className="w-[400px] mx-auto text-center">
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
