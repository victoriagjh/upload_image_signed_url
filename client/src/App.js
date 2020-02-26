import React, { Component } from 'react';
import './App.css';
import { API } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  uploadFile = async e => {

    // let formData = new FormData();
    // formData.append("image", this.state.file);

    try {
      API.get(`/dictionary`, {
        headers: {

        }
      }).then(res => {

      }).catch(err => {
      });


    } catch (err) {
    }
  }
  handleFileInput = async e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  render() {
    return (
      <div className="App">
        <h1> 파일 업로드 </h1>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={e => this.handleFileInput(e)}
        />
        <button onClick={e => this.uploadFile(e)}> 업로드 </button>
      </div>
    );
  }

}

export default App;
