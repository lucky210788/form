import React, {Component, Fragment} from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import './FileInput.css'

export default class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      errorText: ''
    };
  }

  onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === ('image/jpeg')) {
        let tempFiles = this.state.files;
        tempFiles.push(file);
        this.setState({
          files: tempFiles,
          errorText: ''
        }, () => {
          this.props.handleSetFile(this.state.files);
        });
      }
      else if (file.type === ('image/png')) {
        let tempFiles = this.state.files;
        tempFiles.push(file);
        this.setState({
          files: tempFiles,
          errorText: ''
        }, () => {
          this.props.handleSetFile(this.state.files);
        });
      }
      else {
        this.setState({
          errorText: 'only jpg or png format'
        })
      }
    }
  };

  removeFile(fileDeleted) {
    this.setState({
      files: this.state.files.filter(file => file !== fileDeleted)
    }, () => {
      this.props.handleSetFile(this.state.files);
    });
  }

  render() {
    return (
      <Fragment>
        <div className="input-file-wrap">
          <label className="custom-file-upload">
            <input type="file"
                   onChange={this.onChange}/>
            <PhotoCameraIcon/>
            <p>upload photo only jpg or png *</p>
          </label>
          <p className="helper-text">{this.state.errorText}</p>
          <div className="files-list">
            {this.state.files.map((x, index) =>
              <div className="file-preview"
                   onClick={this.removeFile.bind(this, x)}
                   key={index}>{x.name}</div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}