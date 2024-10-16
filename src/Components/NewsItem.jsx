import { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, img, url, source, author, time } = this.props;

    console.log(this.props.articles);
    return (
      <>
        <div
          className="card m-3"
          style={{
            width: "18rem",
            position: "relative",
            // height: "500px",
          }}
        >
          <span
            className="  badge rounded-pill bg-secondary"
            style={{ position: "absolute", top: -10, right: 0 }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              !img
                ? "https://ichef.bbci.co.uk/news/1024/branded_news/df8d/live/1209d000-84fd-11ef-a819-555f47c527fd.jpg"
                : img
            }
            className="card-img-top"
            alt="..."
            style={{ width: "100%", height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              Author{" "}
              <span className="text-danger">
                {!author ? "Rahul Gandhi" : author}
              </span>
            </p>
            <p className="card-text">
              Published {new Date(time).toGMTString()}
            </p>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-danger"
            >
              More News Info
            </a>
          </div>
        </div>
      </>
    );
  }
}
