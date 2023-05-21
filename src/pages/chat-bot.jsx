import React, { useRef } from 'react'
import { IoSend } from 'react-icons/io5'
import { useChats } from '../hooks/get-chats';
import { request } from '../helpers/axios-instance';

function ChatBotPage() {
    // also scroll to bottom when new message is added
    const { data, isLoading, refetch } = useChats();
    const [message, setMessage] = React.useState("");
    const [chats, setChats] = React.useState([]);
    const [showTyping, setShowTyping] = React.useState(false);
    React.useEffect(() => {
        if (data) {
            setChats(data);
        }
    }, [data])

    const sendMessage = async () => {


        setChats([
            ...chats,
            {
                temp: true,
                message: message,
                sender: "user"
            }
        ]);
        setShowTyping(true);

        const response = await request({
            method: 'POST',
            url: '/api/chat',
            data: {
                message: message
            }
        })
        if (response.status === 200) {
            console.log("Message sent successfully")
            setShowTyping(false);
            // remove the temp message and add the actual message
            setChats([
                ...chats.slice(0, chats.length - 1),
                {
                    ...response?.data?.data?.userChat,
                    temp: false
                }
            ]);
            setMessage("");
            refetch();
        }

    }

    const chatContainerRef = useRef(null);

    React.useEffect(() => {
        // Scroll to the last message when component updates
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const scrollOffset = 100; // Adjust this value as per your requirement
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + scrollOffset;
        }
    };
    window.scrollTo(0, document.body.scrollHeight);
    return (
        <div className=''>

            <div className="px-8 py-4 mb-[220px]" ref={chatContainerRef}>
                {
                    chats?.map((item, index) => (
                        <ChatBubble message={
                            item?.message
                        } isUser={item?.sender === "user" ? true : false} />
                    ))
                }
            </div>

            {showTyping && <ChatTypingDot />}
            {!showTyping && (<div className="fixed bottom-28 w-full p-3 flex justify-between items-center gap-3 bg-white">
                <input type="text" className='border-2 w-full border-gray-800 rounded-2xl px-4 py-3  focus:outline-none mt-1 ' placeholder="Type your message here" value={message} onChange={(e) => setMessage(e.target.value)}
                />
                <button className='' onClick={sendMessage}>
                    <IoSend className='text-3xl ml-2' />
                </button>
            </div>)}



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

const ChatTypingDot = () => {
    return (
        <div className="fixed bottom-28 w-full">
            <div className="flex items-center justify-center bg-gray-200 text-black rounded-3xl px-4 py-5 mx-3 mt-3 w-auto">
                <span className="h-2 w-2 bg-black rounded-full animate-bounce mr-1"></span>
                <span className="h-2 w-2 bg-black rounded-full animate-bounce mr-1"></span>
                <span className="h-2 w-2 bg-black rounded-full animate-bounce"></span>
            </div>
        </div>
    );
};


export { ChatBotPage }
