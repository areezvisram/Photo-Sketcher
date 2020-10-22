import React from "react";
import './App.css'
//import Home from './components/Home'

class App extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null
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
      // this.setState({
      //   imageUrl: res.secure_url,
      //   imageAlt: `An image of ${res.original_filename}`
      // })
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
          imageAlt: `A sketch of ${res.original_filename}`
        })
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
    const { imageUrl, imageAlt } = this.state;

    return (
      <main className="App">
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>
            <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
            <button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Via Widget</button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image" />
          )}
        </section>
      </main>
    )
  }
}

export default App;