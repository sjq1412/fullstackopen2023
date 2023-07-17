import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    variant: null,
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const resetNotification = () => {
    setTimeout(() => {
      setNotification({ message: null, variant: null });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // check if name already exists
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) alert(`${newName} is already added to phonebook`);

    if (!personExists) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnedPerson) => {
        setNotification({
          message: `Added ${returnedPerson.name}`,
          variant: "success",
        });
        resetNotification();
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personsToDisplay = filter
    ? persons.filter((person) => {
        return person.name
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        variant={notification.variant}
      />
      <div>
        filter shown with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToDisplay.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
