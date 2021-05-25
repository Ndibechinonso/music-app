import React, { useEffect, useState } from 'react'
import './Carousel.css'

const Carousel = (props) => {
    const {children, show} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState('')

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props

    useEffect(() => {
       if (children) {
    setLength(children.length)}
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
            console.log(currentIndex, 'next')
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
           console.log(currentIndex, 'prev')
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    } 


    return (
        
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">
                     <i class="fas slideArrow fa-arrow-left"></i>
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                         className={`carousel-content show-${show}`}
                             style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                          >
                        {children}
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex < (length - show) &&
                    <button onClick={next} className="right-arrow">
                        <i className="fas slideArrow fa-arrow-right"></i>
                    </button>
                }
            </div>
        </div>
    )
}

export default Carousel