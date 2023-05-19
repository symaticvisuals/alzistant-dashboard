import React from 'react'
import { IoSend } from 'react-icons/io5'

function ChatBotPage() {
    // also scroll to bottom when new message is added
    window.scrollTo(0, document.body.scrollHeight);
    return (
        <div className=''>
            {/* <div className="px-8 py-4 mb-24">
                {
                    Array(30).fill().map((_, index) => (
                        <ChatBubble key={index} message={
                            index % 2 === 0 ? 'Lorem ipsum dolor sit amet' : 'Expedita modi at labore fuga'
                        } isUser={index % 2 === 0} />
                    ))

                }
            </div>

            <div className="fixed bottom-20 w-full p-3 flex justify-between items-center gap-3 bg-white">
                <input type="text" className='border-2 w-full border-gray-800 rounded-2xl px-4 py-3  focus:outline-none mt-1 ' placeholder="Type your message here"
                />
                <button className=''>
                    <IoSend className='text-3xl ml-2' />
                </button>
            </div> */}
            <div style={{ height: "87vh", width: "auto", zIndex: "40", position: "sticky" }}>

                <iframe

                    src={`https://ora.ai/embed/6baff60c-45bd-4b98-82e9-0d89a45c8178`}

                    width="100%"

                    height="100%"

                    style={{ border: "0", borderRadius: "4px" }}

                />

            </div>

        </div>
    )
}

const ChatBubble = ({ message, isUser }) => {
    return (
        <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
            <div className={isUser ? 'bg-[#65C9E3] text-black rounded-3xl px-4 py-3 mt-3' : 'bg-gray-200 text-black rounded-3xl px-4 py-3 mt-3'}>
                {message}
            </div>
        </div>
    )
}


export { ChatBotPage }
