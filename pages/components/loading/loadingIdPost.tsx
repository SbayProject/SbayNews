'use client'
import React from 'react'
import ContentLoader from 'react-content-loader'

// @ts-ignore
export const LoadingIdPost = props => {
    return (
        <>
            <ContentLoader
                viewBox="" className="w-full" {...props}>
                <rect rx="0" ry="0" className="w-full" height="65"/>
            </ContentLoader>
            <ContentLoader className="container mb-8 mt-[-5%] "
                height={900}
                width={1060}
                primaryColor="#d9d9d9"
                secondaryColor="#ecebeb"
                viewBox="0 0 1360 1000"
                {...props}
            >
                <rect x="10" y="40" rx="0" ry="0" width="350" height="500" />
                <rect x="400" y="40" rx="0" ry="0" width="1000" height="500" />

                <rect x="10" y="600" rx="0" ry="0" width="300" height="300" />
                <rect x="10" y="920" rx="0" ry="0" width="300" height="30" />
                <rect x="10" y="960" rx="0" ry="0" width="160" height="30" />
                <rect x="360" y="600" rx="0" ry="0" width="300" height="300" />
                <rect x="360" y="920" ry="0" rx="8" width="300" height="30" />
                <rect x="360" y="960" rx="0" ry="0" width="160" height="30" />
                <rect x="710" y="600" rx="0" ry="0" width="300" height="300" />
                <rect x="710" y="920" rx="0" ry="0" width="300" height="30" />
                <rect x="710" y="960" rx="0" ry="0" width="160" height="30" />
                <rect x="1060" y="600" rx="0" ry="0" width="300" height="300" />
                <rect x="1060" y="920" rx="0" ry="0" width="300" height="30" />
                <rect x="1060" y="960" rx="0" ry="0" width="160" height="30" />

            </ContentLoader>
        </>

    )
}
