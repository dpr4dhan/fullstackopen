import Part from "./Part.jsx";

const Content = ({parts}) => {
    console.log('parts',parts);
    const total = parts.reduce((sum, part) =>  sum + part.exercises, 0);
    return (
        <>
            {
                parts.map((part) => <Part part={part} key={part.id}/>)
            }
            <b>Total of {total} exercises.</b>
        </>
    )
}
export default Content;