import {useState} from "react";
import Button from "./components/Button.jsx";


const StatisticsLine = ({text, value}) => {
    return <tr><td>{text}</td><td>{value}</td></tr>
}
const Statistics = ({good, neutral, bad}) => {

    if(good === 0 && neutral === 0 && bad === 0 ){
        return <div>No any feedbacks</div>
    }

    const total = good + neutral + bad;
    const avg = (good - bad) / (good + bad);

    const positive = ((good + neutral) / total ) * 100;

    return (
        <div>
            <table>
                <tbody>
                <StatisticsLine text="Good" value={good}/>
                <StatisticsLine text="Neutral" value={neutral}/>
                <StatisticsLine text="Bad" value={bad}/>
                <StatisticsLine text="Total" value={total}/>
                <StatisticsLine text="Average" value={avg}/>
                <StatisticsLine text="Positive" value={positive}/>
                </tbody>

            </table>
        </div>
    )
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(prev => prev + 1);
    }

    const handleNeutral = ()=>{
        setNeutral(prev => prev + 1);
    }

    const handleBad = () =>{
        setBad(prev => prev + 1);
    }

    return (
        <div>
            <Button text="Good" onClick={handleGood}/>
            <Button text="Neutral" onClick={handleNeutral}/>
            <Button text="Bad" onClick={handleBad}/>
            <br/>
            <h4>Statistics</h4>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App
