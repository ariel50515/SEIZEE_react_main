import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style/ProductVideo.scss";

export default function ProductVideo(shopData
) {
  const videoEl = useRef(null);
  // const { shop_list_sid } = useParams;
  console.log(shopData);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);
// console.log(props.shopData.shop_video)
  return (
    <>
      {/* {shopData.map((v, i) => { */}
        {/* return ( */}
          <div className="a-video">
            <div className="a-productVideoWrapper">
              <video
                playsInline
                loop
                muted
                alt="All the devices"
                // src={`/04-product/video/${shopData.shopData.shop_video}`}
                src="/04-product/video/005.mp4"
                type="video/mp4"
                ref={videoEl}
              />
            </div>
          </div>
        {/* ); */}
      {/* })} */}
    </>
  );
}