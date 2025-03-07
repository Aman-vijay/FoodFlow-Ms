import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle2, Users } from 'lucide-react';



const Auth = () => {
  const isNewUser = true
  return (
    <>
     <div className="max-w-md mx-auto space-y-2 ">
        <div className="text-center space-y-2">
          <h1 className="text-4xl mt-6 font-bold bg-clip-text ">
            Welcome
          </h1>
          {isNewUser && (
            <p className="text-sm text-muted-foreground animate-fade-in">
              Let's get you started with your new account
            </p>
          )}
        </div>

      <Tabs
          defaultValue={isNewUser ? 'signup' : 'login'}
          className="w-full   bg-slate-200 backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-6"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:cursor-pointer"
            >
              <UserCircle2 className="w-4 h-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground  hover:cursor-pointer"
            >
              <Users className="w-4 h-4 mr-2" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <div className="relative">
            <TabsContent
              value="login"
              className="data-[state=active]:animate-fade-in-up"
            >
              <Login />
            </TabsContent>
            <TabsContent
              value="signup"
              className="data-[state=active]:animate-fade-in-up"
            >
              <Signup />
            </TabsContent>
          </div>
        </Tabs>

      </div>
    </>
  )
}

export default Auth