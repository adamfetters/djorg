import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

const notesClient = axios.create({
	baseURL: 'http://localhost:8000/api/notes',
	timeout: 5000,
});

class App extends Component {
	state = {
		notes: [],
		error: '',
	};

	componentDidMount() {
		notesClient
			.get('/')
			.then(response => {
				const notes = response.data;
				this.setState({ notes });
			})
			.catch(err => {
				console.warn(err);
				this.setState({ error: err.message });
			});
	}

	render() {
		return (
			<div>
				<ul>
					{this.state.notes.map(note => <li key={note.id}>{note.title}</li>)}
				</ul>
				{this.state.error ? <h2>{this.state.error}</h2> : ''}
			</div>
		);
	}
}

export default App;
