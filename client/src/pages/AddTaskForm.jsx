import { useRef, useState } from 'react'
import { ADD_TASK } from '../utils/mutations'
import { useMutation } from '@apollo/client'

function AddTaskForm() {
    // Keeping track of the form state
    const [formState, setFormState] = useState({ taskName: '' })
    // Mutation to add a task to the database
    const [addTask, { error, data }] = useMutation(ADD_TASK)

    // handler for when the user submits the form
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const mutationResponse = await addTask({
            variables: { taskName: formState.taskName },
        })
        console.log(mutationResponse)
    }

    // change handler so when the user inputs something into the form the formState is updated
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            taskName: value,
        })
    }

    return (
        <>
            <h1>Add A Task</h1>
            <div className="border border-black">
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="taskName" className="form-label">
                            New Task Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskName"
                            aria-describedby="taskName"
                            onChange={handleChange}
                        />
                        <div id="taskHelp" className="form-text">
                            Make the task so cool!
                        </div>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                        >
                            Check me out
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddTaskForm
