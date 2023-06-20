/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import { crossCut } from "@/utils/imageUtils";
import {
    faArrowLeft,
    faArrowRight,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faChevronRight,
    faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";

function ImageCut() {
    const [image, setImage] = useState<string | null>(null);
    const [subImages, setSubImages] = useState<string[]>([]);
    const [currentSubImage, setCurrentSubImage] = useState<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;

            for (let i = 0; items && i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const blob = items[i].getAsFile();

                    if (blob) {
                        const reader = new FileReader();

                        reader.onload = function (event) {
                            setImage(event.target?.result as string);
                        };

                        reader.readAsDataURL(blob);
                    }

                    break;
                }
            }
        };

        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, []);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        const url = event.dataTransfer.getData("text");
        console.log("image url: ", url);
        // Handle dropping of a file
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const imageDataURL = reader.result as string;
                setImage(imageDataURL);
            };

            reader.readAsDataURL(file);
        } else if (url) {
            // Handle dropping of a URL
            fetch(url)
                .then((response) => response.blob())
                .then((blob) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        const imageDataURL = reader.result as string;
                        setImage(imageDataURL);
                    };

                    reader.readAsDataURL(blob);
                })
                .catch((error) => console.error("Error:", error));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleCrossCut = () => {
        if (!imageRef.current) {
            return;
        }
        const imageList = crossCut(imageRef.current);
        setSubImages(imageList);
    };
    const handleNextSubImage = () => {
        setCurrentSubImage((prevIndex) => (prevIndex + 1) % subImages.length);
    };

    const handlePreviousSubImage = () => {
        setCurrentSubImage((prevIndex) =>
            prevIndex === 0 ? subImages.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="flex flex-col h-screen overflow-y-scroll w-full bg-gradient-radial from-blue-dark to-blue-light">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div
                    className="w-96 h-96 p-4 border-2 border-dashed border-white rounded-lg flex items-center justify-center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {image ? (
                        <img
                            ref={imageRef}
                            src={image}
                            alt="Dragged Image"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ) : (
                        <p>Drag and drop an image here</p>
                    )}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-transparent hover:bg-slate-600 text-white rounded  text-3xl"
                    onClick={handleCrossCut}
                >
                    <FontAwesomeIcon icon={faScissors} />
                </button>
                <div
                    className="mt-4 px-4 py-4 gap-4"
                    style={{ maxWidth: "30%" }}
                >
                    {subImages.length > 0 && (
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className="bg-transparent text-white rounded-full text-3xl hover:bg-slate-600"
                                onClick={handlePreviousSubImage}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <img
                                src={subImages[currentSubImage]}
                                alt={`Sub-Image ${currentSubImage + 1}`}
                                className="max-w-50p max-h-50p"
                            />
                            <button
                                className="-transparent text-white rounded-full text-3xl hover:bg-slate-600"
                                onClick={handleNextSubImage}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageCut;
