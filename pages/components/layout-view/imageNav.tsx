
import React from "react";
export default function ImageNav() {
   return(
       <>
           <div
           className="relative overflow-hidden mt-16 bg-cover bg-no-repeat"
           style={{
           backgroundPosition: "50%",
           backgroundImage: 'url("https://tecdn.b-cdn.net/img/new/slides/146.webp")',
           height: 350
       }}
       >
       <div
           className="absolute bottom-0 left-0 right-0 top-0  h-full w-full overflow-hidden bg-fixed"
           style={{backgroundColor: "rgba(0, 0, 0, 0.75)"}}
       >
           <div className="flex h-full items-center justify-center">
               <div className="px-6 text-center text-white md:px-12">
                   <h5 className="mb-8 text-3xl font-bold">Sbay</h5>
               </div>
           </div>
       </div>
       </div>
       </>
   )
}