import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GuestList from './components/GuestList/GuestList';
import Guest from './components/Guest/Guest';
import CreateGuest from './components/Guest/CreateGuest';
import EditGuest from './components/Guest/EditGuest';
import './App.css';

class App extends React.Component {
  state = {
    guests: [],
    guest: null
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/guests')
    .then((response) => {
      this.setState({
        guests: response.data
      })
    })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })
  }

  viewGuest = (guest) => {
    console.log(`view ${guest.lName}, ${guest.fName}`);
    this.setState({
      guest: guest
    });
  }

  deleteGuest = guest => {
    axios
    .delete(`http://localhost:5000/api/guests/${guest.id}`)
    .then(response => {
      const newGuests = this.state.guests.filter(p => p.id !== guest.id);
      this.setState({
        guests: [...newGuests]
      });
    })
    .catch(error => {
      console.error(`Error deleting guest entry: ${error}`);
    });
  };

  editGuest = guest => {
    this.setState({
      guest: guest
    });
  };

  onGuestCreated = guest => {
    const newGuests = [...this.state.guests, guest];

    this.setState({
      guests: newGuests
    });
  };

  onGuestUpdated = guest => {
    console.log('updated guest: ', guest);
    const newGuests = [...this.state.guests];
    const index = newGuests.findIndex(p => p.id === guest.id);

    newGuests[index] = guest;
    
    this.setState({
      guests: newGuests
    });
  };

  render() {
    const { guests, guest } = this.state;

    return (
      <Router>
        <div className="App">
        <header className="App-header">Guestbook</header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new-guest">New Entry</Link>
        </nav>
        <main className="App-content">
          <Switch>
            <Route exact path="/">
              <GuestList 
                guests={guests} 
                clickGuest={this.viewGuest}
                deleteGuest={this.deleteGuest} 
                editGuest={this.editGuest}
              />
            </Route>
            <Route path="/guests/:guestId">
              <Guest guest={guest} />
            </Route>
            <Route path="/new-guest">
              <CreateGuest onGuestCreated={this.onGuestCreated} />
            </Route>
            <Route path="/edit-guest/:guestId">
              <EditGuest guest={guest} onGuestUpdated={this.onGuestUpdated} />
            </Route>
          </Switch>
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
