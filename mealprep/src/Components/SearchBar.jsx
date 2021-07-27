import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import getFood from '../Models/GetFood.js'

import Search from '@material-ui/icons/Search';

import '../Stylings/SearchBarStylings.css'

class SearchBar extends React.Component{
    constructor(props){
      super(props)
      
      this.divRef = React.createRef()

      this.state = {
        search: ''
      }
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.handleSearchSubmit = this.props.handleSearchSubmit.bind(this);
    }
     
    handleInputChange = () => {
      if(this.search.value && this.search.value.length > 1){
        this.setState({
          search: this.search.value
        }, () => this.getData())
      }else{
        this.setState({
          search: this.search.value
        })
      }
    }

    handleSubmit = () => {
      this.props.handleSearchSubmit(this.state.search)      
    }

    getData = async e => {
        var url = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=" + String(this.state.search) + "&app_id=36b7b45f&app_key=cb6dd0831871febd1d0ce5077a364182";
        var returnedResults = await getFood(url);

        this.setState({
            results: returnedResults,
            dataReturned: true
        });
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside(event) {
      if (this.divRef && !this.divRef.current.contains(event.target)) {
          this.setState({
            search: ''
          })
      }
    }

    render() {
        return(
            <div className="searchWrapper">
            <form className="searchForm" onSubmit={this.handleSubmit}>
              <Search className="icon"/>
              <input
                placeholder="Look up food..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                className="searchBar"
              />
            <div ref={this.divRef} className="searchSuggestions">
            {(() => {
              if(this.state.results !== undefined && this.state.results.hints[0] !== undefined && this.state.search !== ''){
                  var options = this.state.results.hints.map(hint => (
                    <li className="result" key={hint.food.foodId}>
                      <Link to="/food" onClick={() => { this.props.getSearchQuery(hint.food) }}>
                      <img src={hint.food.image} className="suggestionImage" alt=""/>
                      {hint.food.label}
                      </Link>
                    </li>
                  ))
                  return <ul>{options}</ul>
              }else if(this.state.search === ""){
                return ("")
              }
            })()}
            </div>
            </form>
          </div>
        )
    }
}   

export default withRouter(SearchBar);