const MessageList = () => {
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
        <section className="self-center">
            <p className="text-white text-center text-2xl p-5">Inbox</p>
            <ul className="p-5">
                {listOfFriends.map(friend => {
                    return(<li className="text-white text-center text-lg p-3">{friend.username}</li>);
                })}
            </ul>
        </section>
    )
}

export default MessageList;
