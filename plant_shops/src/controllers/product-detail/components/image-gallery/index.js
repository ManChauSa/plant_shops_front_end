import { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { host } from "../../../../api";

export const ImageGallery = ({ images, firstHalf }) => {
    const [imageSet, setImageSet] = useState([]);
    useEffect(() => {
        const size = parseInt(images.length / 2);
        if (firstHalf) {
            let temp = [];
            for (let index = 0; index <= size; index++) {
                temp.push(images[index]);
            }
            setImageSet(temp);
        } else {
            let temp = [];
            for (let index = size + 1; index < images.length; index++) {
                temp.push(images[index]);
            }
            setImageSet(temp);
        }
    }, [images, firstHalf]);

    return (
        <Col lg={6} className="mb-6 mb-lg-0" id={firstHalf ? "leftGallery" : "rightGalery"} >
            {imageSet.map(e => {
                return <Image key={e} src={host + "/api/images/"+ e} rounded className="w-100 shadow-1-strong mb-4" />
            })}
        </Col>
    )
}
