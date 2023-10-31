'use client'
import React from 'react'
import ContentLoader from 'react-content-loader'

// @ts-ignore
export const LoadingEditors = props => {
        return (
            <>
                <ContentLoader className="container" viewBox="0 0 420 160" height={700} width={400} {...props}>
                    <rect x="200" y="40" rx="4" ry="4" width="270" height="10" />
                    <rect x="200" y="60" rx="4" ry="4" width="254" height="10" />
                    <rect x="200" y="80" rx="4" ry="4" width="254" height="10" />
                    <rect x="200" y="100" rx="3" ry="3" width="254" height="10" />
                    <rect x="200" y="120" rx="3" ry="3" width="254" height="10" />
                    <rect x="200" y="140" rx="3" ry="3" width="254" height="10" />
                    <rect x="200" y="180" rx="3" ry="3" width="254" height="10" />
                    <circle cx="100" cy="95" r="48"  />
                </ContentLoader>
            </>

        )
}
