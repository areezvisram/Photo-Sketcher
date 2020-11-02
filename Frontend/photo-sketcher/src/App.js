import React from "react";
import './App.css'

class App extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
    imageDownload: null
  }


  handleImageUpload = () => {
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
          imageDownload: response.download_url
        })
        // console.log(response.download_link)
        // var download = document.getElementById("download");
        // download.href = response.download_link
      })

    })
    .catch(err => console.log(err));

    
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
    ).open();
  };

  render() {
    const { imageUrl, imageAlt, imageDownload } = this.state;

    return (
      <main className="App">
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

          <div className="item">
            <img src={imageUrl} alt={imageAlt} className="sketch-1"/>
            <a href={imageDownload}>Download</a>
          </div>        
          
        </section>
      </main>
    )
  }
}

export default App;