interface MessageListProps{
    messageListMenu: (bool: boolean) => void 
}

const MessageList = ({ messageListMenu }: MessageListProps) => {
    const listOfFriends = [
        {
            username: "Uco"
        },
        {
            username: "Hagi"
        },
        {
            username: "Nannies"
        },
        {
            username: "Travbert"
        },
        {
            username: "Grandpappy"
        },
    ];
    return (
        <aside className="absolute h-screen w-screen bg-black flex flex-col p-8">
            <section>
                <button className="text-white text-4xl" onClick={() => messageListMenu(false)}>&times;</button>
            </section>
            <section className="self-center">
                <p className="text-white text-center text-2xl p-5">Inbox</p>
                <ul className="p-5">
                    {listOfFriends.map(friend => {
                        return(<li className="text-white text-center text-lg p-3">{friend.username}</li>);
                    })}
                </ul>
            </section>
        </aside>
    )
}

export default MessageList;
