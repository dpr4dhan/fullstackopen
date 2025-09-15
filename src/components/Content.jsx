import Part from "./Part.jsx";

const Content = ({part1, part2, part3, exercise1, exercise2, exercise3}) => {
    return (
        <>
            <Part part={part1} exercise={exercise1}/>
            <Part part={part2} exercise={exercise2}/>
            <Part part={part3} exercise={exercise3}/>
        </>
    )
}
export default Content;