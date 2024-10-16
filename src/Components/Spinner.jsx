import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div
        className="text-center img"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <img src="./abc.svg" alt="" />
      </div>
    );
  }
}
