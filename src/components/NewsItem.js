import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem", marginBottom: "20px"}}>
        <img src={imgUrl} className="card-img-top" style={{height:"10em"}} alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {date}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
       </div>
      </div>
    )
  }
}

export default NewsItem
