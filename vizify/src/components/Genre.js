import React from 'react'

const Genre = () => {
  state = {data: []}

  componentDidMount() = () => {
    fetch('./top50_Spotify_final_data')
      .then(response => response.text())
      .then(data => Papa.parse(data, {
        complete: this.updateData
      }))
  }

  updateData = (result) => {
    this.setState({ data: result.data })
  }

  let hmap = new Map();
  
    return (
      <div>
        {console.log(state.data)}
      </div>
    )

}

export default Genre 

