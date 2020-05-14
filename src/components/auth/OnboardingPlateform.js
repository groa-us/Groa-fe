import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../store/actions";
import { Link } from "react-router-dom";
//img
import OnboardingImg from "../../img/happy-running-person.png";
//material-ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: '0 auto',
    display: 'flex',
    background: '#505050',
    padding:'2%',
  },
  onboardingPlateformImg: {
    width: '50%',
    padding:'3%',
  },
  onboardingText: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '3%',
    color: 'white',
  },
  onboardingh1: {
    fontSize: '35px',
    padding: '2%',
  },
  onboardingp1: {
    color: '#00E6BC',
    padding: '2%',
    fontSize: '20px',
  },
  onboardingp2: {
    padding: '2%',
    fontSize: '20px',
  },
  onboardingLink: {
    textAlign: 'center',
    fontSize: '25px',
    padding: '2%',
  },
  onboardingBut: {
    backgroundColor: '#00E6BC',
    width: '100%',
    color: 'white',
    padding:'2%',
    borderRadius:'4px',
    '&:hover':{
      backgroundColor:'white',
      color:'#00E6BC',
    },
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      flexDirection: 'column',
    },
    onboardingPlateformImg: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: "60%",
    }
  },
}));

function OnboardingPlateform({ userid }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.onboardingPlateformImg} src={OnboardingImg} alt="onboarding girl jumping" />
      <div className={classes.onboardingText}>
        <h1 className={classes.onboardingh1}>You're Almost There.</h1>
        <p className={classes.onboardingp1}>
          Help Groa personalize your recommendations! Groa works better when you
          tell us what you like.
      </p>
        <p className={classes.onboardingp2}>
          Rate six movies on a scale from 1 to 5 and we’ll get you your
          personalized recommendations in no time! Train Groa to be your personal
          movie AI!
      </p>
        <Link className={classes.onboardingLink} to={`/${userid}/Onboarding`}>
          <button className={classes.onboardingBut}>Let's Start!</button>
        </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userid: state.login.userid,
    isFetching: state.movie.isFetching,
    movies: state.movie.movies,
    moviesError: state.movie.error,
    searchTerm: state.filter.searchTerm,
    watchlist: state.watchlist.movies,
    ratings: state.rating.movies,
  };
};
export default connect(mapStateToProps, {
  setFilter,
})(OnboardingPlateform);