import React from 'react';


export function withSuspenseComponent<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<div>...Loading</div>} >
            <WrappedComponent {...props}/>
        </React.Suspense>
    }

} 