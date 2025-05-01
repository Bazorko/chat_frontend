import { Suspense } from "react";
import LoadingComponent from "../utils/assets/LoadingComponent";

interface LazyLoadedPagesProps{
    children: JSX.Element
}

const LazyLoadedPages = ({ children }: LazyLoadedPagesProps) => {
  return (
    <Suspense fallback={
        <div className="absolute w-full h-screen flex justify-center items-center">
          <LoadingComponent />
        </div>
    }>
        { children }
    </Suspense>
  )
}

export default LazyLoadedPages;
