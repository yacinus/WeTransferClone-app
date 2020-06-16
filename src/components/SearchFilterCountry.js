import React, { Component } from 'react'

export default class SearchFilterCountry extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
       suggestions : [],
       text : ""
    }
  }

  onTextChanged = (e) => {
    const {items} = this.props;
    const value = e.target.value;
    let suggestions = [];

    if(value.length > 0){
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.sort().filter(v => regex.test(v));
    }
      this.setState(() => ({suggestions, text : value}));
  
  }

  suggestionSelected(value) {
    this.props.onChange(value);

    console.log('value : ', value);
    this.setState(() => ({
      text : value,
      suggestions : []
    }))
  }
  
  renderSuggestions = () => {

    const {suggestions} = this.state;
    if(suggestions.length === 0) {

      return null;

    }
    return (
      <ul>
        {suggestions.map((item, index) => <li key={index} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    )

  }

  render() {
    const  {text} = this.state;
    return (
      <div className="autocomplete-country">
       <input value={text} onChange={this.onTextChanged} placeholder="Select a Country" type="text" /> 
       {this.renderSuggestions()}
      </div>
    )
  }
}
