import React, { Fragment } from 'react'
import { ExampleWrapperSeamless, PageTitle } from 'layout-components'
import { Grid, Card, Divider, TextField } from '@material-ui/core'



export default function Answers() {
    return (<Fragment>
        <PageTitle
            titleHeading="Questionaire"
            titleDescription="Please upload your answers here"
        />
        <form /* onSubmit={handleSubmit} */>
            <ExampleWrapperSeamless sectionHeading="Answer Sheet">
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={12}>
                        <Card className="p-4 mb-4">
                            <div className="font-size-lg font-weight-bold">Section</div>
                            <Divider className="my-4" />
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        className="m-2"
                                        id="standard-multiline-static"
                                        label="Answer"
                                        multiline
                                        rows="4"
                                    />
                                </Grid>

                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </ExampleWrapperSeamless>
        </form>
    </Fragment>)
}