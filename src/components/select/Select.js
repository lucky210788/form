import React, {Component} from 'react';

import './Select.css';

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onChange(e) {
        if (e.target.value) {
            this.setState({
                value: e.target.value
            }, () => {
                this.props.handleChangeRegion(this.state.value);
            })
        }
    }

    render() {
        return (
            <div className="form-group">
                <label>Select region *</label>
                <select value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        className="form-control"
                        required
                        name="region">
                    <option disabled></option>
                    <option value="Austria">Austria</option>
                    <option value="Angola">Angola</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                </select>
            </div>
        )
    }
}
