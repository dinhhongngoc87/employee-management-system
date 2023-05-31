import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import enMessages from '../en.json';
import viMessages from '../vi.json';

function getMessages(locale: string): any {
  if (locale.startsWith('vi')) {
    return viMessages;
  }
  return enMessages;
}

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
