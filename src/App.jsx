import {useEffect, useState} from 'react'
import personService from '/src/services/personService.js';
import Notification from "./components/Notification.jsx";

const Person = ({person, handleDeletion}) => {
    return (
        <>
            <p key={person.id}> {person.name} : {person.number}
                <button onClick={handleDeletion}>Delete</button>
            </p>

        </>
    )
}

const Filter = ({filter, onChangeHandler}) => {
    return (<div>
        Filter show with
        <input value={filter} onChange={onChangeHandler}/>
            </div>);
}

const PersonForm = ({name, onChangeNameHandler, number, onChangeNumberHandler, submissionHandler}) => {
    return (
        <form onSubmit={submissionHandler}>
            <div>
                Name: <input value={name} onChange={onChangeNameHandler}/>
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumberHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        personService.getAll()
            .then(fetchedPersons => setPersons(fetchedPersons))
            .catch(err => console.log("Failed", err));
    }, []);

    const nameChangeHandler = (e) => setNewName(e.target.value)
    const numberChangeHandler = (e) => setNewNumber(e.target.value)

    const handleSubmission =  (e) => {
        e.preventDefault();

        const alreadyExists = persons.filter((person) => person.name === newName);

        if(alreadyExists.length > 0){
            if(confirm(`${newName} is already in the phonebook, replace the old number with new one?`)){
                const updatedPerson = {
                    name: newName,
                    number: newNumber,
                    id: alreadyExists[0].id
                }
                personService.updatePerson(alreadyExists[0].id, updatedPerson)
                    .then(data =>  {
                        const newPersonList = persons.map((person) => {
                            console.log(person);
                            if(person.id === data.id){
                                person.number = data.number;
                            }
                            return person;
                        })
                        setPersons(newPersonList);
                        setNewName('');
                        setNewNumber('');
                        setErrorMessage('');
                        setSuccessMessage('Number Updated successfully');
                    })
                    .catch(err => setErrorMessage(`Record has already been deleted: ${err}`));

            }else{
                return false;
            }
            return false;
        }

        const newPerson = {name: newName, number: newNumber, id: persons.length + 1};
        personService.addNew(newPerson)
            .then(data => {
                setErrorMessage('');
                setSuccessMessage('New contact added successfully');
                return setPersons([
                         ...persons,
                        data
                ])
            })
            .catch(err => setErrorMessage(`Error occurred: ${err}`));
        setNewName('');
        setNewNumber('');
    }

    const handleDeletionOf= (id) => {
        const selectedPerson = persons.find((person) => person.id === id);
        console.log(selectedPerson);
        if(confirm(`Delete ${selectedPerson.name}`)){
            personService.deletePerson(id)
                .then(response => {
                    console.log(response);
                    const newPersonList = persons.filter((person) => person.id !== id);
                    setPersons(newPersonList);
                    setErrorMessage('');
                    setSuccessMessage('Contact record deleted successfully');
                }).catch(err => setErrorMessage(`Record has already been deleted: ${err}`));
        }

    }

    const filteredPersons = filter.length > 0 ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : '';


    return (
        <div>
            <h2>Phonebook</h2>
            { (successMessage.length >0) && <Notification message={successMessage} type="success"/>}
            { (errorMessage.length >0) && <Notification message={errorMessage} type="error"/>}
            <Filter filter={filter} onChangeHandler={(e) => setFilter(e.target.value)}/>

            <PersonForm
                name={newName}
                onChangeNameHandler={nameChangeHandler}
                number={newNumber}
                onChangeNumberHandler={numberChangeHandler}
                submissionHandler={handleSubmission}
            />

            <h2>Numbers</h2>
            {filter.length > 0
                ? filteredPersons.map((person) => <Person key={person.id} person={person} handleDeletion={() => handleDeletionOf(person.id)}/>)
                : persons.map((person) => <Person key={person.id} person={person} handleDeletion={() => handleDeletionOf(person.id)}/>)}

        </div>
    )
}

export default App