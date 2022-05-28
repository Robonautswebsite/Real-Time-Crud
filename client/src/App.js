import './App.css';
import CardComp from './components/CardComp';
import FormComp from './components/FormComp';

function App() {
  return (
    <div className="App">
      <FormComp />
      <div className='card-container'>
        <CardComp name="First Name Last Name" id="Employee ID" pos="Position" />
        <CardComp name="First Name Last Name" id="Employee ID" pos="Position" />
        <CardComp name="First Name Last Name" id="Employee ID" pos="Position" />
      </div>
    </div>
  );
}

export default App;
