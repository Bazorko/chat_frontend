interface ConnectionStateProps {
    isConnected: boolean
}

const ConnectionState = ({ isConnected }: ConnectionStateProps) => {
    return(
        <p>You are connected.</p>
    );
}

export default ConnectionState;