import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'

const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

const initialState = {
  isLoading: false,
  results: [
    {
      title: 'Crona LLC',
      description: 'Front-line logistical system engine',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adamsxu/128.jpg',
      price: '$43.33',
    },
    {
      title: 'Leuschke, Barrows and Lubowitz',
      description: 'Customizable impactful moderator',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/finchjke/128.jpg',
      price: '$82.81',
    },
    {
      title: 'Haley, Fahey and Corkery',
      description: 'Universal optimizing parallelism',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/bradenhamm/128.jpg',
      price: '$80.30',
    },
    {
      title: 'Hegmann - Konopelski',
      description: 'Horizontal zero defect definition',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/krasnoukhov/128.jpg',
      price: '$22.48',
    },
    {
      title: 'Ferry Inc',
      description: 'Implemented demand-driven array',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mirfanqureshi/128.jpg',
      price: '$71.90',
    },
  ],
  value: '',
}

export default class SearchCity extends Component {
  state = initialState

  // handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      // const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.results, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
