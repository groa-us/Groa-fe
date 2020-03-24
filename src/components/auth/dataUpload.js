import React, { useState } from "react";
// tools
import { connect } from "react-redux";
import { uploadAction } from "../../store/actions/index.js";
import { ifDev } from "../../utils/removeAttribute.js";
import letterboxdLogo from "../../img/letterboxd-logo.svg";
import imdbLogo from "../../img/imdb-logo.svg";
// children components
import Congratulations from "./Congratulations.js";
import LoadingScreen from "../layout/LoadingScreen.js";

const DataUpload = ({ userid, uploadAction, isUploading }) => {
  const [input] = useState({ file: "" });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const toggleInstructions = (window.onclick = function(event) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    const dropdowns2 = document.getElementsByClassName("dropdown-content-Empty");
    var i;
    
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    if (event.target.matches(".dropBtn")) {
      event.target.nextSibling.classList.toggle("show");
    
    } 
    for (i = 0; i < dropdowns2.length; i++) {
      let openDropdown2 = dropdowns2[i];
      if (openDropdown2.classList.contains("show2")) {
        openDropdown2.classList.remove("show2");
      }
    }
    if (event.target.matches(".dropBtn")) {
      event.target.nextSibling.classList.toggle("show2");
      event.target.nextSibling.nextSibling.classList.toggle("show2");
     
    } 
  });


  const handleChange = e => {
    let data = new FormData();
    data.append("movies", e.target.files[0], e.target.files[0].name);
    uploadAction(userid, data, setUploadSuccess);
    data = new FormData();
  };

  if (isUploading) return <LoadingScreen />;
  else if (uploadSuccess) return <Congratulations />;
  else
    return (
      <div className="DataUploadPage" data-test="DataUploadPage-test">
        <div>
          <div className="textholder1">
            <h1>Already rated movies elsewhere?</h1>
            <h3>
              Groa lets you easily upload your ratings from
            </h3>
            <h3>
            either LetterBoxd or IMDb:
            </h3>
           
          </div>

          <div className="DboxContainer">
          
            <div className="dropdown">
              
              <img  className="centerBtn" src={letterboxdLogo} alt="Letterboxd Logo" />
              <button
                onClick={toggleInstructions}
                data-test={ifDev("clickLetterBoxd")}
                className="dropBtn centerBtn"
                
              >
                Show Letterboxd Instructions
              </button>

              <div id="myDropdownL" className="dropdown-content">
                <div className="DboxLeft">
                    <div>
                      <p className="ptext">1. Log in to Letterboxd.</p>
                      <p className="ptext">
                        2. Click on your username and select Settings from the
                        dropdown menu.
                      </p>
                      <p className="ptext">
                        3. Navigate to the Import & Export tab and select
                        Export Your Data.
                      </p>
                      <p className="ptext">
                        4. Tap to browse and attach the .csv file below.
                      </p>
                    </div>
                </div>
                {/* END  DboxLeft*/}
              </div>
              {/* END dropdown-content*/}
          {/* EMPTY DIV - Postions Upload Box to bottom of screen */}
              <div className="dropdown-content-Empty"></div>
            </div>
            {/* END DROPDOWN */}

  {/* RIGHT SIDE DIV - IMDB UPLOAD */}
            {/* <div className="dropdown">
              <button
                onClick={toggleInstructions}
                data-test={ifDev("clickIMDb")}
                className="dropbtn"
              >
                IMDb Instructions 
              </button>
              <div id="myDropdownR" className="dropdown-content">
                <div className="DboxRight">
                  <img src={imdbLogo} alt="IMDb Logo" />
                  <div>
                    <p className="ptext">1.Log in to IMDb</p>
                    <p className="ptext">
                      2.Click on your username and select your ratings fromthe
                      dropdown menu.
                    </p>
                    <p className="ptext">
                      3.Click on the icon and select Export. Save the ratings.csv
                      file somwhere convenient like your desktop or downloads
                      folder.
                    </p>
                    <p className="ptext">
                    4.Click to browse or simply drop your .csv file below
                    </p>
                  </div>
                </div> */}
                {/* END DboxRight*/}
              {/* </div> */}
              {/* END dropdown-content*/}
            {/* </div> */}
            {/* END DROPDOWN */}
          </div>
          {/* END DboxContainer */}

          {/* ///////////////UPLOAD FILE //////////////////// */}
          <div className="UploadContainer">
            <div className="inputholder">
              <input
                className="uploadData"
                type="file"
                placeholder="letterbox csv file here"
                name="movies"
                value={input.movieName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="textholder2">
            <p>
              We value your privacy and strive to be transparent. Your data<p/>
              is kept strickly confidental: only you can view or acess it.
            </p>
          </div>
        </div>
      </div>
      // END DataUploadPage
    );
};
const mapStateToProps = state => {
  return {
    userid: state.login.userid,
    isUploading: state.upload.isUploading
  };
};

export default connect(mapStateToProps, { uploadAction })(DataUpload);
