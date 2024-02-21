import React, { useState } from "react";
import "./esthetic.css";
import ImagesGallery from "../../components/image-gallery/ImagesGallery";
import { Col, Container, Row } from "reactstrap";
import { useEffect } from "react";
function Esthetic(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(loadingTimeout);
  }, []);
  return (
    <section className="gallery hidden">
      <h2 className="gallery__title">Interior design</h2>

      {loading ? (
        <div class="loaders">
          <span class="loader-texts">loading</span>
          <span class="loads"></span>
        </div>
      ) : (
        <div className="container__esthetic">
          <ImagesGallery />
        </div>
      )}
    </section>
  );
}

export default Esthetic;
