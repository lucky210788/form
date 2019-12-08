import React, {Component, Fragment} from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import './FileInput.css'

export default class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }

    onChange = (e) => {
        const files = e.target.files;
        let filesArr = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.match(/image\/(jpeg|jpg|png)/)) {
                    filesArr.push(files[i]);
                }
            }
        }
        this.setState({files: [...this.state.files, ...filesArr]}, () => {
            this.props.handleSetFile(this.state.files);
        });
    };

    removeFile(f) {
        this.setState({files: this.state.files.filter(x => x !== f)}, () => {
            this.props.handleSetFile(this.state.files);
        });
    }

    render() {
        return (
            <Fragment>
                <div className="input-file-wrap">
                    <label className="custom-file-upload">
                        <input type="file"
                               multiple
                               onChange={this.onChange}/>
                        <PhotoCameraIcon/>
                        <p>upload photo only jpg or png *</p>
                    </label>
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

