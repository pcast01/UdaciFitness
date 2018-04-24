import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, GetDailyReminderValue } from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextprops) {
    return nextprops.metrics !== null && !nextprops.metrics.today;
  }

  render() {
    const { metrics } = this.props;

    return (
      <View>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          RESET
        </TextButton>

        <Text>EntryDetail - {this.props.navigation.state.params.entryId}</Text>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    remove: () =>
      dispatch(addEntry({
        [entryId]: timeToString() === entryId ? GetDailyReminderValue : null,
      })),
    goback: () => navigation.goback(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
