'use client'
import React from 'react'
import ContentLoader from 'react-content-loader'

// @ts-ignore
export const LoadingPost = props => {
    return (
        <>
            <ContentLoader
                viewBox="" className="w-full" {...props}>
                <rect rx="0" ry="0" className="w-full" height="65"/>
            </ContentLoader>
            <ContentLoader viewBox="0 0 900 507" {...props}
                           style={{marginTop: "-9%", marginBottom: "-2%"}}>
                <rect x="30" y="60" rx="5" ry="5" width="200" height="120" className="rounded-t-lg"/>
                <rect x="30" y="189" rx="5" ry="5" width="200" height="15"/>
                <rect x="30" y="211" rx="5" ry="5" width="140" height="15"/>
                <rect x="243" y="60" rx="5" ry="5" width="200" height="120"/>
                <rect x="243" y="189" rx="5" ry="5" width="200" height="15"/>
                <rect x="243" y="211" rx="5" ry="5" width="140" height="15"/>
                <rect x="455" y="60" rx="5" ry="5" width="200" height="120"/>
                <rect x="455" y="189" rx="5" ry="5" width="200" height="15"/>
                <rect x="455" y="211" rx="5" ry="5" width="140" height="15"/>
                <rect x="667" y="60" rx="5" ry="5" width="200" height="120"/>
                <rect x="667" y="188" rx="5" ry="5" width="200" height="15"/>
                <rect x="667" y="209" rx="5" ry="5" width="140" height="15"/>
                <rect x="30" y="260" rx="5" ry="5" width="200" height="120"/>
                <rect x="30" y="390" rx="5" ry="5" width="200" height="15"/>
                <rect x="30" y="412" rx="5" ry="5" width="140" height="15"/>
                <rect x="243" y="260" rx="5" ry="5" width="200" height="120"/>
                <rect x="455" y="260" rx="5" ry="5" width="200" height="120"/>
                <rect x="667" y="260" rx="5" ry="5" width="200" height="120"/>
                <rect x="243" y="390" rx="5" ry="5" width="200" height="15"/>
                <rect x="455" y="390" rx="5" ry="5" width="200" height="15"/>
                <rect x="667" y="390" rx="5" ry="5" width="200" height="15"/>
                <rect x="243" y="412" rx="5" ry="5" width="140" height="15"/>
                <rect x="455" y="412" rx="5" ry="5" width="140" height="15"/>
                <rect x="667" y="412" rx="5" ry="5" width="140" height="15"/>
                <rect x="400" y="450" rx="5" ry="5" width="100" height="20"/>
            </ContentLoader>
        </>
    )
}