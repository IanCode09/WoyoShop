import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()  
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }


    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control 
                    type="text" 
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search Products..." 
                    className="mr-sm-2 mls-sm-5" 
                />
                <Button type='submit' variant="outline-info">
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default SearchBox
