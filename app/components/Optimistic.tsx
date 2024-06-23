'use client'

import React, { useOptimistic, useRef, useState } from 'react'

type Message = {
    text: string
    sending: boolean
    key: number
}

const deliverMessage = async (message: string) => {
    await new Promise((res) => setTimeout(res, 1500))
    return message
}

const Optimistic = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Hello World', sending: false, key: 1 }
    ])
    const [optimisticMessages, addOptimisticMessages] = useOptimistic<Message[], any>(
        messages,
        (state: Message[], newMessage: string) => [
                ...state,
                {
                    text: newMessage,
                    sending: true,
                    key: state.length + 1
                }
            ]
    )
    const formAction = async (formData: any) => {
        console.log(formData.get('message'))
        addOptimisticMessages(formData.get('message'))
        await sendMessage(formData)
        formRef.current?.reset()
    }
    const sendMessage = async(formData: any) => {
        const sentMessage = await deliverMessage(formData.get('message')) as string
        setMessages((messages) => [
            ...messages,
            {
                text: sentMessage,
                sending: false,
                key: messages.length + 1
            }
        ])
    }
    return (
        <div>
            {optimisticMessages.map((message: Message, index: number) => (
                <div key={index}>{message.text}{!!message.sending && <small>(Sendding ...)</small>}</div>
            ))}
            <form action={formAction} ref={formRef}>
                <input type="text" name="message" id="message" placeholder='' className="border-2 px-2 py-2 rounded-md" />
                <button type="submit" className="ml-2 border-2 px-2 py-2 rounded-md">送信</button>
            </form>
        </div>
    )
}

export default Optimistic