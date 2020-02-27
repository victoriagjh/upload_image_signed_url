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
    let formData = new FormData();
    formData.append("file", this.state.file);
    try {
      API.get(`/get_signed_url`, {
        params: {
          file_name: this.state.file.name
        }
      }).then(res => {
        console.log(res.data.signed_url);
      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
    // File Upload시 파일 전송은 이렇게 하면 됨.
    // try {
    //   API.post(`/upload_file`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
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
