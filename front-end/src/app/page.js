"use client"
import Header from "@/components/homePage/Header";
import SpecialityMenu from "@/components/homePage/SpecialityMenu";
import TopDoctors from "@/components/homePage/TopDoctors";
export default function Home() {
  return (
    <div className=" ">
      
      <Header />

      <SpecialityMenu />

      <TopDoctors />
    </div>
  );
}
