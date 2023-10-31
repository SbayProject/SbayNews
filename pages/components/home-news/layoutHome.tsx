import React from "react";
import Header from "@/pages/components/layout-view/header";
import Footer from "@/pages/components/layout-view/footer";
import {Meta} from "@/pages/meta";
// @ts-ignore
export default function LayoutHome({children}) {
    return (
        <>
            <Meta/>
            <Header/>
               <main className="w-full h-full ">
              {children}
              </main>
            <Footer/>
        </>
    )
}