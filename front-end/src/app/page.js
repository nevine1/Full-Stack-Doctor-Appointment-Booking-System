"use client"
import Header from "@/components/homePage/Header";
import SpecialityMenu from "@/components/homePage/SpecialityMenu";
import TopDoctors from "@/components/homePage/TopDoctors";
import Banner from "@/components/homePage/Banner";
export default function Home() {
  return (
    <div className=" ">
      
      <Header />

      <SpecialityMenu />

      <TopDoctors />

      <Banner/>
    </div>
  );
}
