import React from "react";

/*import Navbar from "components/Navbar/navbar";
import Modal from "components/Modals/modal";
import Login from "components/Login/login";*/

// -- 

import { ToastContainer } from "react-toastify";

import Link from "../components/Links/links";

export default function Home(){

   return(
     <div className="container p-4">
        <ToastContainer />
        <div className="row">      
         <Link />      
        </div>
     </div>
   )

}

/*
 <LinkForm />

 <Navbar />
 <Modal><Login /></Modal>
*/