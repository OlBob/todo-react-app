import React, { Component } from "react";

import './SearchPanel.css';

export default class SerchPanel extends Component {
  render() {
    return (
      <input type="text" 
        className="form-control search-input"
        placeholder="type to search" />
    );
  }
}