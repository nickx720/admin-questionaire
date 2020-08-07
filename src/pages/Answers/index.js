import React, { Fragment, useState, useEffect } from 'react'
import { ExampleWrapperSeamless, PageTitle } from 'layout-components'
import { Grid, Card, Divider, TextField, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getQuestion, postAnswer } from './services.js'
import { forEachObjIndexed } from 'ramda'
import useSignUpForm from 'helpers/FormHooks.js'
import { useSnackbar } from 'notistack'



export default function Answers() {
    const [questionInfo, SetQuestionInfo] = useState([])
    const [questionId, SetQuestionId] = useState(null);
    const [question, SetQuestion] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const initialFormState = {
        studentId: "",
        questionAnswerMetadataId: "",
        answer: ""
    }

    const camel2title = (camelCase) => camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase());

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestion();
                const { id, identifier, rawQuestion } = data;
                SetQuestionId(id);
                SetQuestion(rawQuestion);
                const setQuestions = [];
                const printNameValuePair = (value, name) => setQuestions.push({ name: camel2title(name), value });
                forEachObjIndexed(printNameValuePair, identifier)
                SetQuestionInfo(setQuestions)
            } catch (e) {
                alert(e)
            }
        }

        fetchQuestions()
    }, [])

    const submitAnswer = () => {
        let answer = { ...inputs, questionAnswerMetadataId: questionId };
        postAnswer(answer).then(() => enqueueSnackbar('Question successfully submitted', { variant: 'success' }))
            .catch(() => enqueueSnackbar('Question successfully submitted', { variant: 'success' }));
    }
    const { inputs, handleInputChange, handleSubmit } = useSignUpForm(submitAnswer, initialFormState);
    return (<Fragment>
        <PageTitle
            titleHeading="Questionaire"
            titleDescription="Please upload your answers here"
        />
        <form onSubmit={handleSubmit}>
            <ExampleWrapperSeamless sectionHeading="Answer Section">
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={12}>
                        <Card className="p-4 mb-4">
                            <div className="font-size-lg font-weight-bold">Question Paper Details</div>
                            <Divider className="my-4" />
                            <Grid container spacing={4}>
                                {questionInfo.length > 0 && questionInfo.map((x, id) => <Grid key={id} item xs={12} lg={2} style={{ "display": "flex", "justifyContent": "space-between" }}>
                                    <span className="font-weight-bold">{x.name}</span>
                                    <span className="text-black-50 d-block">{x.value}</span>
                                </Grid>)}

                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={12}>

                        <Card className="p-4 mb-4">
                            <div className="font-size-lg font-weight-bold">Answer Sheet</div>
                            <Divider className="my-4" />
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic1"
                                        label="Student Id"
                                        name="studentId"
                                        onChange={handleInputChange}
                                        value={inputs.studentId}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic2"
                                        name="classId"
                                        label="Class Id"
                                    /*  value={inputs.identifier.classId} */
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={12} style={{ "display": "flex", "justifyContent": "space-between" }}>
                                    <span className="font-weight-bold">Question :  {question}</span>

                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-multiline-static"
                                        label="Answer"
                                        multiline
                                        rows="4"
                                        name="answer"
                                        value={inputs.answer}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                            </Grid>
                        </Card>
                    </Grid>

                </Grid>
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" color="primary" className="m-2" type="submit">
                            <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={"check"} />
                            </span>
                            <span className="btn-wrapper--label">Submit</span>
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button variant="contained" color="default" className="m-2" >
                            <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={"undo"} />
                            </span>
                            <span className="btn-wrapper--label">Reset</span>
                        </Button>
                    </Grid>
                </Grid>
            </ExampleWrapperSeamless>
        </form>
    </Fragment>)
}