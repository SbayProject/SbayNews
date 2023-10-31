
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/pages/components/home-news/layoutHome";
import {CounterContextProvider} from "@/pages/components/reactContext/context";
import {ToastContainer} from "react-toastify";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <CounterContextProvider>
                    <Layout><Component {...pageProps} />
                        <ToastContainer style={{marginTop:"3.96%"}}/>
                    </Layout>
            </CounterContextProvider>
        </>

    )
}
