import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation} from "@/lib/validations";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast"
import { useSigninAccount } from "@/components/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { ToastAction } from "@/components/ui/toast";

const SigninForm = () => {
const {checkAuthUser,isLoading:isUserLoading}=useUserContext()
const navigate=useNavigate();
  const {mutateAsync:signInAccount,isPending:issigningIn}=useSigninAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { toast } = useToast()
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session =await signInAccount({email:values.email,password:values.password})

    if(!session){
      return toast({
        variant: "destructive",
        title: "Sign in falid, Please try again....",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset()
      navigate('/')
    }else{
      return toast({
        variant: "destructive",
        title: "Sign up falid, Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  return (
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420">
        <img alt="logo" src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-meduim md:base-regular mt-2">
          Welcome back,Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center">Don't have an account?
          <Link to="/sign-up" className="text-small-semibold text-primary-500 ml-1">sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
