import './App.css';
import NavBar from "./components/NavBar";

function App() {

  return (
    <div>
      <NavBar />
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
                  src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                  alt=""
                />
            <button>Send</button>
            </label>
            <input 
              type="file" 
              id="file"
              style={{display:"none"}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
