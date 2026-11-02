import type { Metadata } from "next";
import CreatePostingForm from "../components/create-posting/create-posting-form";
import Footer from "../components/browse-listings/footer";

export const metadata: Metadata = {
  title: "Create a listing | PolyHousing",
  description:
    "Make room for students. Share your off-campus rental with Cal Poly students."
};

export default function CreatePostingPage() {
  return (
    <main className="flex-1 bg-poly-green-light font-[Arial,sans-serif] text-signup-title-green">
      <CreatePostingForm />
      <Footer />
    </main>
  );
}
