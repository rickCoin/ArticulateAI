export function crossCut(image: HTMLImageElement): string[] {
    const { naturalWidth, naturalHeight } = image;
    const halfWidth = Math.floor(naturalWidth / 2);
    const halfHeight = Math.floor(naturalHeight / 2);

    const imageList: string[] = [];

    // Create four sub-images by dividing the original image into four quadrants
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            // Create a new canvas element
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Set the canvas dimensions
                canvas.width = halfWidth;
                canvas.height = halfHeight;

                // Draw the sub-image onto the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    image,
                    j * halfWidth,
                    i * halfHeight,
                    halfWidth,
                    halfHeight,
                    0,
                    0,
                    halfWidth,
                    halfHeight
                );

                // Add the sub-image to the image list
                imageList.push(canvas.toDataURL("image/png"));
            }
        }
    }

    return imageList;
}
