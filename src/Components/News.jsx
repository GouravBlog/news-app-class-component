import { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
      loading: true,
    };
    document.title = `News-App ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async componentDidMount() {
    try {
      this.props.setProgress(30);

      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&page=${this.state.page}&category=${this.props.category}&apiKey=46909b9c9c3d4259a3fe1101ac43150b`
      );
      this.props.setProgress(50);
      data = await data.json();
      console.log("data", data);
      this.props.setProgress(100);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
      console.log("TotalResults", this.state.totalResults);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error);
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchMoreData = async () => {
    try {
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&page=${
          this.state.page + 1
        }&category=${
          this.props.category
        }&apiKey=46909b9c9c3d4259a3fe1101ac43150b`
      );
      this.setState({
        page: this.state.page + 1,
      });
      data = await data.json();
      this.setState({
        articles: this.state.articles.concat(data.articles),
        // articles: [...this.state.articles, ...data.articles],
        totalResults: this.state.totalResults,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className=" text-secondary my-2">
        <h3 className="text-center text-danger fw-bold">
          News Top Headlines For{" "}
          {this.capitalizeFirstLetter(this.props.category)} Category
        </h3>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          {this.state.loading && <Spinner />}
          <div className="container">
            <div className="row d-flex">
              {this.state.articles.map((elm) => {
                return (
                  <NewsItem
                    title={elm.title}
                    description={elm.description}
                    img={elm.urlToImage}
                    url={elm.url}
                    source={elm.source.name}
                    author={elm.author}
                    time={elm.publishedAt}
                  />
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
