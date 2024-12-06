import { useInView } from "react-intersection-observer"

interface InfiniteScroolContainerProps extends React.PropsWithChildren {
    onBottomReached: () => void,
    className? : string
}

export default function InfiniteScrollContainer({
    children, onBottomReached, className
}: InfiniteScroolContainerProps){
    const { ref } = useInView({
        rootMargin: '200px',
        onChange(inView) {
            if (inView){
                onBottomReached();
            }
        }
    })

    return <div className={className}>
        {children}
        <div ref={ref} />
    </div>
}