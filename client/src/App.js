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
    let signed_url = null;
    try {
      await API.get(`/get_signed_url`, {
        params: {
          file_name: this.state.file.name,
          content_type: this.state.file.type
        }
      }).then(res => {
        console.log(res.data.signed_url);
        signed_url = res.data.signed_url;
      }).then({

      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("text", signed_url);

    API.post(`/upload_file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  handleFileInput = async e => {
    console.log(e.target.files[0]);
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
