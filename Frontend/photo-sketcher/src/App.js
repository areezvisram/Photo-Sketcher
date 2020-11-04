import React from "react";
import './App.css'

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
    //window.location.href = this.state.imageDownload
    window.location.href = "https://res.cloudinary.com/dmlnk1kus/image/upload/fl_attachment:sketch2/v1604429010/cloudinary2_pumci8.png"
  }

  download2 = () => {
    //window.location.href = this.state.imageDownload2
    window.location.href = "https://res.cloudinary.com/dmlnk1kus/image/upload/fl_attachment:sketch2/v1604429010/cloudinary2_pumci8.png"
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
    const { imageUrl, imageAlt, imageDownload, imageUrl2, imageAlt2, imageDownload2 } = this.state;

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

          {/* <div className="item">
            <img src={imageUrl} alt={imageAlt} className="sketch-1"/>
            <a href={imageDownload}>Download</a>
          </div> */}

          
          {/* <div className="item2">
            <img src={imageUrl2} alt={imageAlt2} className="sketch-2"/>
            <a href={imageDownload2}>Download</a>
          </div>           */}

          <div className="item">
            <img src="https://res.cloudinary.com/dmlnk1kus/image/upload/v1604429010/cloudinary2_pumci8.png" alt={imageAlt} className="sketch-1"/>
            {/* <a href={imageDownload} className="download-link">Download</a> */}
            <button onClick={this.download} className="download-link"><i class="fa fa-download"/>  Download</button>
          </div>

          <div className="item2">
            <img src="https://res.cloudinary.com/dmlnk1kus/image/upload/v1604429010/cloudinary2_pumci8.png" alt={imageAlt2} className="sketch-2"/>
            {/* <a href={imageDownload2} className="download-link">Download</a> */}
            <button onClick={this.download2} className="download-link"><i class="fa fa-download"/>  Download</button>
          </div> 
          
        </section>
      </main>
    )
  }
}

export default App;