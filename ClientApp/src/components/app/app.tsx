import React, { Component } from "react"
import withItplusService from "../../hoc/withItplusService";
import compose from "../../utils/utils";
import { connect } from "react-redux";
import Header from "../header/header";
import { getData } from "../../actions";
import Table from "../data-table/data-table";
import { changeData } from "../../actions";
import ChartsPage from "../pages/chartsPage";
import { BrowserRouter as Router, Navigate} from "react-router-dom";
import { Routes, Route } from "react-router";
export class App extends Component {

  componentDidMount() {
    this.props.getData();         
  }
 

  render () {
   const {data, housesArr, plantsArr, mainChartArr, names} = this.props.mainState;
   const {changeData} = this.props;

    return ( 
        <div className="App">
          <Router> 
            <Header />
            <Routes>           
                <Route path="/*" element={<Table data={data} names={names} changeData={changeData}/>} />
                <Route path="/charts" element={<ChartsPage housesArr={housesArr} plantsArr={plantsArr} data={data} mainChartArr={mainChartArr} names={names}/>} />
                <Route path="*"  element={<Navigate to="/" />}    />
            </Routes>  
          </Router>        
        </div>
      )
  }
}

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps =(dispatch, ownProps) => {
    const {itplusService} = ownProps
    return {
      getData: () => dispatch(getData(itplusService)()),
      changeData: (item) => dispatch(changeData(item))
    }
}

export default compose(
  withItplusService(),
  connect(mapStateToProps, mapDispatchToProps))(App)

