import React, { useState } from 'react';
import { Fragment } from 'react';
import { PageTitle, ExampleWrapperSeamless } from 'layout-components';
import { Divider, Grid, Card, TextField, IconButton, CardContent, Box, MenuItem, Select } from '@material-ui/core';
import { ifElse, isEmpty, complement, compose, trim, partial, map, either, remove, uniq } from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function AdminLanding() {

    const [annotations, setAnnotations] = useState(null);
    const [entries, setEntries] = useState([]);

    const handleSelect = () => {
        /* Beginning  of functions */
        const checkifGlobalSetisEmpty = () => entries.length > 0;
        const hasContent = x => ifElse(either(complement(isEmpty), checkifGlobalSetisEmpty), addingAnnotationBox, isNotSelected)(x)
        /*  const consoleMe = x => console.log(x)
         const consoleErr = x => console.error(x) */
        const isNotSelected = () => null;
        const listingPhrases = x => { setEntries([...entries, ...[trim(x)]]); return [...entries, ...[trim(x)]] }
        const removeDuplicates = x => { setEntries(uniq(x)); return uniq(x) }
        const annotationWithSpace = x => map(checkIfPhraseorWord, x);
        const checkForSpace = x => /^\S+$/gm.test(x)
        const createObject = (x, y) => Object.assign({}, { isPhrase: x, content: y, score: 0, search: "exact" })
        const addPhrase = partial(createObject, [true])
        const addWord = partial(createObject, [false])
        const checkIfPhraseorWord = x => ifElse(complement(checkForSpace), addPhrase, addWord)(x)
        const addingAnnotationBox = x => compose(annotationWithSpace, removeDuplicates, listingPhrases)(x)
        /* Ending of functions */
        let selectedContent = window.getSelection().toString();
        setAnnotations(hasContent(selectedContent))
        /* hasContent(selectedContent) */
    }
    const updateCriteria = id => {
        console.log(id);

    }
    const deleteFromAnnotation = id => {
        const removeFromList = (x) => remove(id, 1, x);
        setAnnotations(removeFromList(annotations));
        setEntries(removeFromList(entries));

    }
    return (
        <Fragment>
            <PageTitle
                titleHeading="Questionaire Upload"
                titleDescription="Please upload your questions here"
            />
            <ExampleWrapperSeamless sectionHeading="Please fill all the details">
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={12}>
                        <Card className="p-4 mb-4">
                            <div className="font-size-lg font-weight-bold">University Info</div>
                            <Divider className="my-4" />
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic1"
                                        label="Client Id"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic2"
                                        label="Class Id"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic3"
                                        label="Subject Id"
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </ExampleWrapperSeamless>
            <ExampleWrapperSeamless>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={12}>
                        <Card className="p-4 mb-4">
                            <div className="font-size-lg font-weight-bold">Question Details</div>
                            <Divider className="my-4" />
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-multiline-static"
                                        label="Expected Answer"
                                        multiline
                                        rows="4"
                                        onMouseUp={handleSelect}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic4"
                                        label="Total Marks"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic5"
                                        label="Max Marks"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-basic"
                                        label="Spelling Penalty"
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </ExampleWrapperSeamless>
            <Card className="card-box mb-4">
                <CardContent className="p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover text-nowrap mb-0">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{ width: '40%' }}>Selection</th>
                                    <th className="text-center">Keyword/Phrase</th>
                                    <th className="text-center">Match Criteria</th>
                                    <th className="text-center">Search Weight</th>
                                    <th className="text-center">Acceptable Alternatives</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Fragment>
                                    {annotations !== null && annotations.map((x, id) => <tr key={id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <a
                                                        href="#/"
                                                        onClick={e => e.preventDefault()}
                                                        className="font-weight-bold text-black"
                                                        title="...">{x.content}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td> <div className="d-flex align-items-center">
                                            <div>
                                                <span
                                                    onClick={e => e.preventDefault()}
                                                    className="font-weight-bold text-black"
                                                    title="...">{x.isPhrase ? "Phrase" : "Keyword"}</span>
                                            </div>
                                        </div></td>
                                        <td className="text-center">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={"Exact"}
                                                onChange={() => updateCriteria(id)}
                                            >
                                                <MenuItem value={"Exact"}>Exact</MenuItem>
                                                <MenuItem value={"Fuzzy"}>Fuzzy</MenuItem>
                                            </Select>
                                        </td>
                                        <td className="text-center">
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="text-center">
                                            <TextField
                                                fullWidth
                                                className="m-2"
                                                placeholder="ans1,ans2"
                                            />
                                        </td>
                                        <td className="text-center">
                                            <Box >
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    className="text-danger"
                                                    title="View details"
                                                    onClick={() => deleteFromAnnotation(id)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon="trash"
                                                        className="font-size-lg"
                                                    />
                                                </IconButton>
                                            </Box>
                                        </td>
                                    </tr>
                                    )}</Fragment>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

        </Fragment>
    );
}
