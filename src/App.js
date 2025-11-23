import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles/navbar-align.css";
import ResponsiveNavbar from "./components/ResponsiveNavbar";
import VideoModal from "./components/VideoModal";
import ScrollToTop from "./components/ScrollToTop";
import HeroArea from "./components/HeroArea";
import LatestAlbums from "./components/LatestAlbums";
import Shows from "./components/Shows";
import Bio from "./components/Bio";
import Video from "./components/Video";
import AppFooter from "./components/AppFooter";

import albums from "./data/albums.json";

export default function App() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    // remove preloader if present
    const p = document.querySelector(".preloader");
    if (p) {
      p.style.transition = "opacity 300ms ease";
      p.style.opacity = "0";
      setTimeout(() => p.remove(), 350);
    }
  }, []);

  return (
    <div className="App">
      <ResponsiveNavbar />

      <HeroArea
        onWatchVideo={(src) => {
          setVideoSrc(src);
          setVideoOpen(true);
        }}
      />

      <LatestAlbums albumList={albums} />

      <Shows />

      <Video
        className="fullscreen-video-section"
        onWatchVideo={(src) => {
          setVideoSrc(src);
          setVideoOpen(true);
        }}
      />

      <Bio />

      {/* <BuyNowArea items={buyItems} />

      <FeaturedArtist />

      <ContactArea /> */}

      <AppFooter />

      <VideoModal
        show={videoOpen}
        onHide={() => setVideoOpen(false)}
        src={videoSrc}
      />
      <ScrollToTop />
    </div>
  );
}
