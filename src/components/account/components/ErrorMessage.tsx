interface ErrorData {
    ok: boolean | undefined,
    message: string
}
interface AccountErrorProps {
    data: ErrorData
}

const ErrorMessage = ({ data }: AccountErrorProps) => {
    return (
        <section className="w-max m-auto lg:w-8/12 py-3">
            <p className={`text-center ${data.ok ? "text-green-700 bg-green-300 border-green-700" : "text-red-700 bg-red-300 border-red-700"} border-2 rounded-lg py-2`}>{ data.message }</p>
        </section>
    )
}

export default ErrorMessage;
