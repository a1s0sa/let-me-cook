/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'

type CarouselProps = {
    children: React.ReactNode
    autoSlideInterval?: number
    showControls?: boolean
    showIndicators?: boolean
    height?: string
    initialSlide?: number
}
function Carousel({
    children,
    autoSlideInterval = 0,
    showControls = true,
    showIndicators = true,
    height = 'auto',
    initialSlide = 0,
}: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(initialSlide)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const carouselRef = useRef(null)

    const childrenArray = React.Children.toArray(children)
    const slideCount = childrenArray.length

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount)
    }

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount)
    }

    const goToSlide = (index: number) => {
        setActiveIndex(index)
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swipe left
            nextSlide()
        } else if (touchStart - touchEnd < -75) {
            // Swipe right
            prevSlide()
        }
        setTouchStart(0)
        setTouchEnd(0)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (autoSlideInterval > 0) {
            interval = setInterval(nextSlide, autoSlideInterval)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [autoSlideInterval])

    return (
        <div className="relative w-full" style={{ height }}>
            <div
                ref={carouselRef}
                className="overflow-hidden h-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {childrenArray.map((child, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {showControls && slideCount > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                        aria-label="Previous slide"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                        aria-label="Next slide"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </>
            )}

            {showIndicators && slideCount > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {childrenArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                                index === activeIndex
                                    ? 'bg-blue-600'
                                    : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carousel
