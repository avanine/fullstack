import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import './App.css'

function Numbers(props) {

  if (props.filter.length > 0) {
    const filteredArray = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    return (
      <div>
        {filteredArray.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton handleDelete={() => props.handleDelete(person.id, person.name)} /></p>)}
      </div>
    )
  }

  return (
    <div>
      {props.persons.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton handleDelete={() => props.handleDelete(person.id, person.name)} /></p>)}
    </div>
  )
}

function DeleteButton(props) {
  return <button onClick={props.handleDelete}>delete</button>
}

function Filter(props) {
  return (
    <div>
      filter numbers <input value={props.filter} onChange={props.handleChange} />
    </div>
  )
}

function PersonForm(props) {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function Notification({ message, classname }) {
  if (message === null) {
    return null
  }

  return (
    <div className={classname}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [classname, setClassname] = useState('error');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.some(person => person.name === newName)) {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
        })
      setNotificationMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setClassname('success')

    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personService
          .update(persons.find((person) => person.name === newName).id, personObject)
        personService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `The number for ${newName} has been updated`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setClassname('success')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .catch(error => {
          setNotificationMessage(
            `Information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setClassname('error')
          setPersons(persons.filter(p => p.id !== id))
        });
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
      setNotificationMessage(
        `Deleted ${name}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setClassname('success')
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} classname={classname} />
      <Filter filter={searchFilter} handleChange={handleFilterChange} />
      <h3>Add a new number</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={searchFilter} handleDelete={handleDelete} />
    </div>
  )

}

export default App