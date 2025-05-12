interface AccountErrorProps {
    message: string
}

const ErrorMessage = ({ message }: AccountErrorProps) => {
    return (
        <section className="w-max m-auto lg:w-8/12 py-3">
            <p className="text-center text-red-700 bg-red-300 border-red-700 border-2 rounded-lg py-2">{ message }</p>
        </section>
    )
}

export default ErrorMessage;
