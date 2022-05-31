import CardList from "../components/CardList";
import React, { useEffect } from "react";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../store/actions";
import { Header } from "../components/Header";

const mapStateToProps = (state) => ({
  searchField: state.searchRobotReducer.searchField,
  robots: state.requestRobotsReducer.robots,
  isPending: state.requestRobotsReducer.isPending,
  error: state.requestRobotsReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFieldValueChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots()),
});

function App(props) {
  const {
    searchField,
    onFieldValueChange,
    robots,
    isPending,
    onRequestRobots,
  } = props;
  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots]);
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  return isPending ? (
    <h1 className="tc">Loading</h1>
  ) : (
    <div className="tc">
      <Header />
      <SearchBox onFieldValueChange={onFieldValueChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
