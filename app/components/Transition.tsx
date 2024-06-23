"use client"
import React, { ReactNode, useState, useTransition } from 'react'

const TabButton = ({
    children,
    isActive,
    onClick
}: {
    children: ReactNode
    isActive: boolean
    onClick: () => void
}) => {
    const [isPending, startTransition] = useTransition()
    if (isActive) {
        return (
            <button className="bg-orange-100 px-2 py-2 rounded-md border-2">
                {children}
            </button>
        )
    }
    if(isPending) {
        return <div>Loading...</div>
    }
    return (
        <button
            onClick={() => {
                startTransition(() => {
                    onClick()
                })
            }}
            className="border-2 px-2 py-2 rounded-md"
        >
            {children}
        </button>
    )
}

const PostsTab = () => {
    const items = []
    for(let i = 0; i < 100; i++) {
        items.push(<SlowPost key={i} index={i} />)
    }
    return <ul className="items">{items}</ul>
}

function SlowPost({index}: {index: number}) {
    const startTime = performance.now()
    while (performance.now() - startTime < 6) {

    }
    return <li className='item'>Post #{index + 1}</li>
}

const ContactTab = () => {
    return (
        <>
            <p>You can find me online here:</p>            
            <ul>
                <li>admin@mysite.com</li>
                <li>+123456789</li>
            </ul>
        </>
    )
}

const AboutTab = () => {
    return <div>About Page</div>
}

const Transition = () => {
    const [tab, setTab] = useState("about")

    function selectTab(nextTab: string) {
        setTab(nextTab)
    }

    return (
        <div>
            <div className="flex gap-4">
                <TabButton
                    isActive={tab==="about"}
                    onClick={()=>selectTab("about")}
                >
                    About
                </TabButton>
                <TabButton
                isActive={tab === "posts"}
                onClick={() => selectTab("posts")}
                >
                    Posts (slow)
                </TabButton>
                <TabButton
                    isActive={tab==="contact"}
                    onClick={() => selectTab("contact")}
                >
                    contact
                </TabButton>
            </div>
            <hr className="mt-4"/>
            <div className="mt-4">
                {tab === "about" && <AboutTab />}
                {tab === "posts" && <PostsTab />}
                {tab === "contact" && <ContactTab />}
            </div>
        </div>
    )
}

export default Transition 