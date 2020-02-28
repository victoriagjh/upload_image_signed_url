import React, { Component } from 'react';
import './App.css';
import { API } from "./api";
import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    response.headers["aaaa"] = "custom header value";
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      public_url: null,
      isUploaded: false
    };
  }

  uploadFile = async e => {
    if (this.state.file !== null) {
      try {
        await API.get(`/get_signed_url`, {
          params: {
            file_name: this.state.file.name,
            content_type: this.state.file.type
          }
        }).then(async (res) => {
          console.log(res.data.signed_url)
          this.setState({
            public_url: res.data.public_url
          });
          let xhr = new XMLHttpRequest();
          xhr.open('PUT', res.data.signed_url);
          xhr.onload = () => {
            this.onUploadFinish(xhr);
          };
          xhr.upload.onprogress = this.onUploadProgress;
          xhr.onerror = this.onUploadError;
          xhr.setRequestHeader('Content-Type', this.state.file.type);
          xhr.send(this.state.file);

        }).catch(err => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  onUploadFinish = (xhr) => {
    this.setState({
      isUploaded: true
    });
    console.log("response: ", xhr);
  }

  onUploadError = (e) => {
    console.log("error: ", e);
  }

  onUploadProgress = (event) => {
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total;
      console.log(percentComplete);
    } else {
      // Unable to compute progress information since the total size is unknown
    }
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
        <br />
        {this.state.isUploaded ? <img src={this.state.public_url} alt="load_fail" /> : null}
      </div>
    );
  }

}

export default App;
