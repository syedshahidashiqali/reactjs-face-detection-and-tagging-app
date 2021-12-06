import { useState, useEffect } from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import NewPost from "./components/NewPost";

// import icons
import addImageIcon from "./icons/add-image-icon.png"
import mapIcon from "./icons/map-icon.jpg"
import calenderIcon from "./icons/calender-icon.svg"

function App() {

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {

        setImage({
          url: img.src,
          width: img.width,
          height: img.height
        });
      };
    };
    file && getImage();
    // create fake url of file
    // file && console.log(URL.createObjectURL(file))
  }, [file]);

  // console.log(image)

  return (
    <div>
      <NavBar />
      {image ? (<NewPost image={image} />) : (
        <div className="newPostCard">
          <div className="addPost">
            <img 
              className="avatar"
              src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
              alt="" 
            />
            <div className="postForm">
              <input 
                className="postInput"
                type="text" 
                placeholder="What's on your mind?"
              />
              <label htmlFor="file">
                  <img
                    className="addImg"
                    src={addImageIcon}
                    alt=""
                  />
                  <img
                    className="addImg"
                    src={mapIcon}
                    alt=""
                  />
                  <img
                    className="addImg"
                    src={calenderIcon}
                    alt=""
                  />
              <button>Send</button>
              </label>
              <input 
                type="file" 
                id="file"
                style={{display:"none"}}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
