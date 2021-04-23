import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics, getTransactionTypes } from '../actions/transactionActions';
import { signout } from '../actions/userActions';
import Chart from '../components/Chart';
import DropdownAnalytics from '../components/DropdownAnalytics';
import DropdownByPeriodAnalytics from '../components/DropdownByPeriodAnalytics';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AnalyticsScreen() {
  const dispatch = useDispatch();

  const [selectedPeriod, selectedPeriodSet] = useState({id: 0, name: 'Неделя'});
  const [selectedOperation, selectedOperationSet] = useState({id: 0, name: "Доход"});
  const [operation, setOperation] = useState({id: 0, name: "Доход"});
  const [startPeriod, setStartPeriod] = useState(getWeekDate());
  const [endPeriod, setEndPeriod] = useState(converStringDate(new Date()));

  const transactionTypesList = useSelector((state) => state.transactionTypesList);
  const { loadingTransactionTypes, errorTransactionTypes, transactionTypes } = transactionTypesList;
  const analyticsData = useSelector((state) => state.analyticsData);
  const { loading, error, analytics } = analyticsData;

  function converStringDate(date) {
    return date.getFullYear()+'-'+(+date.getMonth()+1)+'-'+date.getDate()
  }

  function getWeekDate() {
    let weekDate = new Date();
    let pastDate = weekDate.getDate() - 7;
    weekDate.setDate(pastDate);
    return converStringDate(weekDate);
  }

  useEffect(() => {
    if(error && error.indexOf("403") !== -1) {
      dispatch(signout());
    }
    dispatch(getAnalytics(operation.id, startPeriod, endPeriod));
  }, [operation, startPeriod, endPeriod]);

  useEffect(() => {
    if(errorTransactionTypes && errorTransactionTypes.indexOf("403") !== -1) {
      dispatch(signout());
    }
    dispatch(getTransactionTypes());
  }, []);

  return (
    <div className='analytics'>
      {
        loading || loadingTransactionTypes ? (
          <LoadingBox></LoadingBox>
        ) : error || errorTransactionTypes ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="analytics__content">
            <div className="analytics__top-block noselect">
                <DropdownByPeriodAnalytics
                  setStart={setStartPeriod}
                  setEnd={setEndPeriod}
                  selected={selectedPeriod}
                  selectedSet={selectedPeriodSet} />
                <DropdownAnalytics
                  items={transactionTypes}
                  setState={setOperation}
                  selected={selectedOperation}
                  selectedSet={selectedOperationSet} />
            </div>
            <div className="analytics__bottom-block">
              <Chart
                type="Doughnut"
                neobis={analytics[0].data.totalBalance}
                neolabs={analytics[1].data.totalBalance} />
              <Chart
                details={[...analytics[0].data.details, ...analytics[1].data.details]}
                detailsLenght={analytics[0].data.details.length}
                type="Bar" />
            </div>
          </div>
        )
      }
    </div>
  );
}