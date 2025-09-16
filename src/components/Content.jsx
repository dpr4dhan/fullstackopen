import Part from "./Part.jsx";

const Content = ({parts}) => {
    return (
        <>
            {
                parts.map((part) => <Part part={part}/>)
            }
        </>
    )
}
export default Content;