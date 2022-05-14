import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'

import './Styles/Assessment.css'

function Assessment() {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [index, setIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const navigate = useNavigate()
    const aptitudeType = useSelector(state => state.aptitudeType.value)
    useEffect(() => {
        Api.post('/getAptitudeQuestions', { Type: aptitudeType }).then((response) => {
            setQuestions(response.data.Questions)
            setAnswers(response.data.Answers[0])
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            <Container maxWidth="md">
                <h2 className='AssessmentHeading'>{aptitudeType} Assessment</h2>
                <p className='question'>{index + 1}. {questions[index]}</p>
                <div>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name={index}
                            onChange={(e) => setSelectedAnswers({ ...selectedAnswers, [index]: e.target.value })}
                        >
                            <FormControlLabel value={answers.A} control={<Radio />} label={answers.A} />
                            <FormControlLabel value={answers.B} control={<Radio />} label={answers.B} />
                            <FormControlLabel value={answers.C} control={<Radio />} label={answers.C} />
                            <FormControlLabel value={answers.D} control={<Radio />} label={answers.D} />
                        </RadioGroup>
                    </FormControl>

                </div>


                <Button variant="contained" className='nextBtn' sx={{ mt: 3, mb: 3 }} style={{ backgroundColor: "#000000" }}
                    onClick={() => {
                        index < questions.length - 1 ? setIndex(index + 1) : navigate('/assessmentType')
                    }}>Next</Button>
            </Container>
        </div>
    )
}

export default Assessment
