import React from "react";
import './App.css'
import Header from './components/Header'
import loading from './images/loading.gif'
import $ from 'jquery';

class App extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
    imageDownload: null,
    imageUrl2: null,
    imageAlt2: null,
    imageDownload2: null
  }

  handleImageUpload = () => {
    
    let donwload_btns = document.getElementsByClassName("download-link");
    for(var i = 0; i < donwload_btns.length; i++) {
      donwload_btns[i].style.display = "initial";
    }    

    let donwload_btns2 = document.getElementsByClassName("download-link2");
    for(var j = 0; j < donwload_btns2.length; j++) {
      donwload_btns2[j].style.display = "initial";
    }

    $('.loading').show();
    $('.sketch-1').on('load', function() {
      $('.loading').hide();
    })

    const { files } = document.querySelector('input[type="file"]');
    console.log(files[0])
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'ml_default');
    const options = {
      method: 'POST',
      body: formData
    };
    return fetch('https://api.Cloudinary.com/v1_1/dmlnk1kus/image/upload', options)
    .then(res => res.json())
    .then(res => {
      var data = {
        "url": res.secure_url
      }
      var obj = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
      return fetch('https://av-photo-sketcher.herokuapp.com/addPhoto', obj)
      .then(response => response.json())
      .then(response => {
        this.setState({
          imageUrl: response.sketch_url,
          imageAlt: `A sketch of ${res.original_filename}`,
          imageDownload: response.download_url,
          imageUrl2: response.sketch2_url,
          imageAlt2: `A sketch of ${res.original_filename}`,
          imageDownload2: response.download_url2
        })
      })

    })
    .catch(err => console.log(err));

  }

  download = () => {
    window.location.href = this.state.imageDownload
  }

  download2 = () => {
    window.location.href = this.state.imageDownload2
  }

  openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dmlnk1kus',
        uploadPreset: 'ml_default'
      },
      (error, result) => {
        this.setState({
          imageUrl: result.info.secure_url,
          imageAlt: `An image of ${result.original_filename}`
        })
      },
    ).handleImageUpload();
  };

  render() {
    const { imageUrl, imageAlt, imageUrl2, imageAlt2 } = this.state;

    return (
      <main className="App">
        <Header />
        <section className="top">        
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>
            <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
            <button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Via Widget</button>
          </form>

        </section>
        <section className="bottom">
          <hr/>
          <p>The sketches will be displayed here:</p>
          <img src={loading} alt="" className="loading"></img>

          <div className="item">
            <img src={imageUrl} alt={imageAlt} className="sketch-1"/>
            <button onClick={this.download} className="download-link"><i className="fa fa-download"/>  Download</button>
          </div>

          
          <div className="item2">
            <img src={imageUrl2} alt={imageAlt2} className="sketch-2"/>
            <button onClick={this.download2} className="download-link2"><i className="fa fa-download"/>  Download</button>
          </div>  

          
          
        </section>
      </main>
    )
  }
}

export default App;