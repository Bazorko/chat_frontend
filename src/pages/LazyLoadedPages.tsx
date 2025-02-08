import { Suspense } from "react";
import LoadingComponent from "../components/utils/assets/LoadingComponent";

interface LazyLoadedPagesProps{
    children: JSX.Element
}

const LazyLoadedPages = ({ children }: LazyLoadedPagesProps) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
        { children }
    </Suspense>
  )
}

export default LazyLoadedPages;
