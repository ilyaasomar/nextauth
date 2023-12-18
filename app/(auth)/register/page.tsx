"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    axios
      .post("/api/register", values)
      .then(() => toast.success("Account Created"));

    // signIn("credentials", {
    //   email: values.name,
    //   password: values.password,
    //   redirect: false,
    // })
    //   .then((callback) => {
    //     if (callback?.ok) {
    //       router.push("/");
    //       router.refresh();
    //       toast.success("Logged In");
    //     }
    //     if (callback?.error) {
    //       toast.error(callback.error);
    //     }
    //   })
    //   .catch(() => toast.error("Something went wrong"))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="w-full items-center justify-center py-2 flex gap-x-2 bg-white border-black border-2 rounded-sm cursor-pointer">
            <Github size={25} className="text-black " />
            <p className="text-black">Singup with Google</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full outline bg-black dark:bg-white"
                disabled={loading}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator />

        <div className="flex items-center justify-center gap-x-5 my-4">
          <button
            disabled={loading}
            className="cursor-pointer font-semibold text-sm"
            onClick={() => router.push("/login")}
          >
            Already have an account. Login
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
