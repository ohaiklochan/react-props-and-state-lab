import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilterTypeChange = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event
      }
    })
  }

  findPets = () => {
    let url = '/api/pets'
    if(this.state.filters.type !== 'all') {
      url += `? type=${this.state.filters.type}`
    }

    fetch(url)
    .then(resp => resp.json())
    .then(petsArray => {
      this.setState({
        pets: petsArray
      },
      () => console.log(this.state.pets))
    })
  }

  handleAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.handleFilterTypeChange} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
