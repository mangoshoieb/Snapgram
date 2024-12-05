import "./globals.css";
import { Route, Routes } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import Authlayout from "./_auth/Authlayout";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import Rootlayout from "./_root/Rootlayout";
import { Toaster } from "@/components/ui/toaster"
import { AllUsers, CreatePosts, EditPosts, Explore, PostsDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<Authlayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/all-users" element={<AllUsers/>}/>
          <Route path="/create-post" element={<CreatePosts/>}/>
          <Route path="/edit-post/:id" element={<EditPosts/>}/>
          <Route path="/posts/:id" element={<PostsDetails/>}/>
          <Route path="/profile/:id/*" element={<Profile/>}/>
          <Route path="update-profile/:id" element={<UpdateProfile/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
  );
};

export default App;
