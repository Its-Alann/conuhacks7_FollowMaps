
const Genres = () => {
    state = {data: []}

    componentDidMount() = () =>{
        fetch('')
          .then(response => response.text())
          .then(data => Papa.parse(data, {
            complete: this.updateData
          }))
      }
    
    
    
}