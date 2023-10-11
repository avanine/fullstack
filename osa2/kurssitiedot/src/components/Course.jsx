import React from "react";

function Header(props) {
    return (
        <h2>{props.course.name}</h2>
    )
}

function Content(props) {
    return (
        <div>
            {props.course.parts.map(course => <p>{course.name} {course.exercises}</p>)}
        </div>
    )
}

function Total(props) {
    let total = props.course.parts.reduce((a, course) => a + course.exercises, 0);
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

function Course(props) {
    return (
        <div>
            <Header key={props.course.id} course={props.course} />
            <Content key={props.course.id} course={props.course} />
            <Total key={props.course.id} course={props.course} />
        </div>
    );
}

export default Course;