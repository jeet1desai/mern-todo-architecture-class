import React, { Component, Fragment } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper, Grid } from "@material-ui/core";

import AddTodoForm from './components/AddTodoForm';
import List from './components/List';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <div className="container my-5">
          <Fragment>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Paper className="div-paper">
                  <AddTodoForm />
                </Paper>
              </Grid>
              <Grid item xs={12} className="div-paper">
                <List/>
              </Grid>
            </Grid>
          </Fragment>
        </div>
      </>
    )
  }
}
export default App;
