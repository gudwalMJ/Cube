import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./hooks/useWebcamCapture";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import stickers
import bravoSticker from "./Assets/stickers/bravo.png";
import confettiSticker from "./Assets/stickers/confetti.png";
import eyesSticker from "./Assets/stickers/eyes.png";
import fireSticker from "./Assets/stickers/fire.png";
import hornsSticker from "./Assets/stickers/horns.png";
import slapSticker from "./Assets/stickers/slap.png";
import crownSticker from "./Assets/stickers/crown.png";
import heartEyesSticker from "./Assets/stickers/heartEyes.png";
import confettiTwoSticker from "./Assets/stickers/confettiTwo.png";
// import icons
import deleteIcon from "./Assets/icons/delete.png";
import downloadIcon from "./Assets/icons/download.png";

const useStyles = createUseStyles((theme) => ({
  "@global": {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      background: theme.palette.background,
      color: theme.palette.text,
      fontFamily: "sans-serif",
    },
  },

  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(1.05)",
      opacity: 0.7,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
  },

  App: {
    padding: "0",
    background: theme.palette.primary,
    maxWidth: "100%",
    minHeight: "100vh",
    margin: "auto",
    "& a": {
      color: theme.palette.text,
    },
  },

  Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "ede8f5",
    color: "#000",
    padding: "1rem",
    marginTop: "-1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    "& h1": {
      marginLeft: "50px",
      fontSize: "3rem",
      cursor: "pointer",
      animation: "$pulse 2s infinite",
      transition: "color 0.5s, text-shadow 0.5s",
      "&:hover": {
        color: "white",
        textShadow: "0px 0px 10px rgba(134, 151, 196, 1)",
      },
    },
    "& nav": {
      "& ul": {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        gap: "20px",
        "& li": {
          "& a": {
            color: "#000",
            textDecoration: "none",
            position: "relative",
            fontWeight: "600",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "0",
              height: "2px",
              bottom: "0",
              left: "0",
              backgroundColor: "#000",
              transition: "width 0.3s ease-in-out",
            },
            "&:hover::after": {
              width: "100%",
            },
          },
        },
      },
    },
  },

  MainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",
    marginLeft: "50px",
  },

  DescriptiveText: {
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: theme.palette.text,
    margin: "0 auto",
    maxWidth: "380px",
    marginLeft: "15px",
    marginBottom: "2rem",
    "& p": {
      marginBottom: "-10px",
    },
  },

  DescriptiveTextBold: {
    fontWeight: "600",
  },

  CameraAndSticker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  CamSection: {
    padding: "20px",
    paddingBottom: "80px",
    margin: "0 auto",
    background: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    maxWidth: "900px",
    width: "100%",
    "&:after": {
      content: '""',
      display: "block",
      height: "20px",
    },
    "& canvas": {
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      margin: "20px",
      maxWidth: "800px",
      borderRadius: "4px",
    },
    "& video": {
      display: "none",
    },
  },

  Stickers: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    maxHeight: "calc(3.54rem * 6)",
    "& img": {
      height: "3rem",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
  },

  ImageName: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    width: "100%",
    "& input": {
      fontSize: "1rem",
      padding: "10px",
      width: "50%",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
      outline: "none",
      "&:focus": {
        borderColor: "#8697c4",
        boxShadow: "0 0 0 0.2rem rgba(134, 151, 196, .25)",
      },
      "&::placeholder": {
        color: "#999",
        opacity: 1,
      },
    },
    "& label": {
      fontSize: "1.1rem",
      color: theme.palette.text,
      marginBottom: "5px",
    },
  },

  Gallery: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  GalleryTitle: {
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",
  },

  GalleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    margin: "auto",
    marginBottom: "20px",
  },

  Picture: {
    background: "white",
    padding: "1rem",
    paddingBottom: "2rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "1rem",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "& img": {
      maxWidth: "100%",
      maxHeight: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    "& h3": {
      color: "black",
      textAlign: "center",
      fontSize: "0.9rem",
      wordBreak: "break-word",
    },
  },

  Actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    "& img": {
      height: "25px",
      width: "25px",
    },
  },

  ActionButton: {
    border: "1px solid #ccc",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.6,
    },
  },

  BackToTop: {
    textAlign: "center",
    marginBottom: "20px",
  },
  effectButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: theme.palette.text,
    backgroundColor: "#d1d1d1",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
    transition: "background-color 0.3s ease",
    "&:hover": { backgroundColor: "#e2e2e2" },
    "&:focus": {
      outline: "none",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  },
}));

// Stickers
const defaultStickers = [
  slapSticker,
  bravoSticker,
  confettiSticker,
  confettiTwoSticker,
  heartEyesSticker,
  fireSticker,
  hornsSticker,
  crownSticker,
  eyesSticker,
];

const stickers = defaultStickers.map((url) => {
  const img = new Image();
  img.src = url;
  return { img, url };
});

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState(stickers[0]);
  // title for the picture that will be captured
  const [title, setTitle] = useState();
  // Greyscale
  const [isGrayscale, setIsGrayscale] = useState(false);

  const filter = isGrayscale ? "grayscale(100%)" : "";
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
  };
  const location = useLocation();
  const isHome = location.pathname === "/";

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    pictures, // latest captured picture data object
    setPictures,
  ] = useWebcamCapture(sticker?.img, title, filter);

  // To download the image
  const handleDownload = (dataUri, title) => {
    if (!title || title.trim() === "") {
      alert("Please provide a name before downloading the image.");
      return;
    }
    const link = document.createElement("a");
    link.download = `${title.replace(/\s+/g, "_")}.png`;
    link.href = dataUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // To remove the picture from the gallery
  const removePicture = (indexToRemove) => {
    setPictures((currentPictures) =>
      currentPictures.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className={classes.App}>
      <header className={classes.Header} id="top">
        <h1>SlapSticker</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/readme">Readme</Link>
            </li>
            {isHome && (
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact>
          <main>
            <div className={classes.MainContainer}>
              <div>
                <div className={classes.DescriptiveText}>
                  <p>
                    Have you ever said something so dumb, you just wanted to
                    slap yourself?
                  </p>
                  <p className={classes.DescriptiveTextBold}>
                    Well now you can!
                  </p>
                  <p> But why stop there? Try the other stickers as well!</p>
                  <p>Start with naming you picture and selecting a sticker.</p>
                  <p>With just a click the picture is taken.</p>
                  <p>View your pictures in the gallery and download them.</p>
                </div>
              </div>
              <div className={classes.CamSection}>
                <div className={classes.CameraAndSticker}>
                  <section>
                    <video ref={handleVideoRef} />
                    <canvas
                      ref={handleCanvasRef}
                      width={2}
                      height={2}
                      onClick={handleCapture}
                    />
                  </section>
                  <section className={classes.Stickers}>
                    {stickers.map((stickerItem, index) => (
                      <button
                        key={index}
                        onClick={() => setSticker(stickerItem)}
                      >
                        <img src={stickerItem.url} alt={`Sticker ${index}`} />
                      </button>
                    ))}
                  </section>
                </div>
                <div>
                  <section className={classes.ImageName}>
                    <input
                      type="text"
                      value={title}
                      onChange={(ev) => setTitle(ev.target.value)}
                      placeholder="Name your picture"
                    />
                  </section>
                </div>
                <button
                  onClick={toggleGrayscale}
                  className={classes.effectButton}
                >
                  Grayscale
                </button>
              </div>
            </div>
            <section className={classes.Gallery} id="gallery">
              <h2 className={classes.GalleryTitle}>Your Gallery!</h2>
              <div className={classes.GalleryGrid}>
                {pictures.map((picture, index) => (
                  <div key={index} className={classes.Picture}>
                    <img
                      src={picture.dataUri}
                      alt={`Captured moment ${index}`}
                    />
                    <h3>{picture.title}</h3>
                    <div className={classes.Actions}>
                      <img
                        src={downloadIcon}
                        className={classes.ActionButton}
                        alt="Download"
                        onClick={() =>
                          handleDownload(picture.dataUri, picture.title)
                        }
                      />
                      <img
                        src={deleteIcon}
                        className={classes.ActionButton}
                        alt="Delete"
                        onClick={() => removePicture(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.BackToTop}>
                <a href="#top">Back to Top</a>
              </div>
            </section>
          </main>
        </Route>
        {/* Readme route */}
        <Route path="/readme">
          <main>
            <h2>Devtest Readme</h2>
            <p>
              Hello candidate, Welcome to our little dev test. The goal of this
              exercise, is to asses your general skill level, and give us
              something to talk about at our next appointment.
            </p>
            <section>
              <h3>What this app should do</h3>
              <p>
                SlapSticker is an app that lets users to slap stickers on their
                face, using their webcam. Functionality wise the app works, but
                the ui needs some love. We'd like for you to extend this
                prototype to make it look and feel it bit better.
              </p>
              <p>These are the basic requirements:</p>
              <ul>
                <li>User can pick a sticker</li>
                <li>User can give the captured image a title</li>
                <li>User can place the sticker over the webcam image</li>
                <li>User can capture the webcam image with sticker</li>
              </ul>
            </section>
            <section>
              <h3>What we want you to do</h3>
              <p>
                Off course we didn't expect you to build a full fledged app in
                such a short time frame. That's why the basic requirements are
                already implemented.
              </p>
              <p>
                However, we would like for you to show off your strengths as a
                developer by improving the app.
              </p>
              <p>Some ideas (no need to do all):</p>
              <ul>
                <li>Make it look really nice</li>
                <li>Let users pick from multiple (custom) stickers</li>
                <li>Improve the workflow and ux</li>
                <li>Show multiple captured images in a gallery</li>
                <li>Let users download or share the captured pics</li>
                <li>Add super cool effects to webcam feed</li>
                <li>Organize, document and test the code</li>
                <li>Integrate with zoom, teams, meet...</li>
              </ul>
            </section>
            <section>
              <h3> quickstart</h3>
              <ul>
                <li>You can clone this repo to get started </li>
                <li>run `$ npm install` to install deps</li>
                <li>run `$ npm run start` to start dev environment</li>
                <li>push it to github or gitlab to share it with us. </li>
              </ul>
            </section>
            <section>
              <p>
                P.s. We've already added some libraries to make your life easier
                (Create React App, Jss, React Router), but feel free to add
                more.
              </p>
            </section>
          </main>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
