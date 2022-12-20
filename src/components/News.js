import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }
  capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase()+string.slice(1);
    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
      this.props.setProgress(20);
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=b5d2d5b31691401a82b8340840d1d916&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      this.props.setProgress(50);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({articles : parsedData.articles,
                     totalResults: parsedData.totalResults,
                     loading: false
                    })
      this.props.setProgress(100);
    }
    async componentDidMount(){
      this.updateNews();
    }
    // handlePrevClick = async () =>{
    //   this.setState({page: this.state.page-1});
    //   this.updateNews();
    // }
    // handleNextClick = async () =>{
    //   this.setState({page: this.state.page+1});
    //   this.updateNews();
    // }
    fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=b5d2d5b31691401a82b8340840d1d916&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({ page: this.state.page + 1 })
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles : this.state.articles.concat(parsedData.articles),
                     totalResults: parsedData.totalResults,
                     loading : false
                    })
    };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: "90px 0 40px"}} >NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        <div className="text-center">{this.state.loading && <Spinner/>}</div>
        <div className="text-center">
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row my-3 mx-3">
          {this.state.articles.map((e) =>{
              return <div className="col-md-4" key={e.url}>
              <NewsItem title={e.title?e.title.slice(0,45):""} description = {e.description?e.description.slice(0,88):""} imgUrl = {e.urlToImage?e.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7HjpHNuzVssA9WGGtdCI0kC6gnLmjbMVuw&usqp=CAU"} newsUrl={e.url} author={e.author} date={e.publishedAt} />
            </div>
          } )}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-center">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary mx-2" onClick={this.handlePrevClick}>&#8592; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> */}
        </div>
        </>
    )
  }
}

export default News
