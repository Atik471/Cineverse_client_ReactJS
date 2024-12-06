import { TbMoodSadDizzy } from "react-icons/tb";

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center flex-col h-[100vh] gap-8">
            <p className="text-4xl text-red-600 font-bold">Something went wrong!</p>
            <TbMoodSadDizzy className="text-8xl text-red-600"></TbMoodSadDizzy>
        </div>
    );
};

export default ErrorPage;